import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
// import { auth } from "../data/firebase";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:5000";

type TMessage = {
    text: string,
    name?: string,
    picSrc?: string,
    senderId: string,
    ownedByCurrentUser?: boolean
}

const useChat = (roomId: string) => {
    const [messages, setMessages] = useState<TMessage[]>([]); // Sent and received messages
    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

    useEffect(() => {

        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            
            query: { roomId },
            secure: true,
        });

        // Listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: TMessage) => {
            const incomingMessage: TMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current?.id,
            };
            setMessages((messages: TMessage[]) => [...messages, incomingMessage]);
        });

        // Destroys the socket reference when the connection is closed
        return () => {
            socketRef.current?.disconnect();
        };
    }, [roomId]);

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (messageBody: string) => {
        if (messageBody.trim() !== '')
            socketRef.current?.emit(NEW_CHAT_MESSAGE_EVENT, {
                text: messageBody,
                // name: auth.currentUser?.displayName || "Somebody",
                // picSrc: auth.currentUser?.photoURL,
                senderId: socketRef.current.id,
            });
    };

    return { messages, sendMessage };
};

export default useChat;