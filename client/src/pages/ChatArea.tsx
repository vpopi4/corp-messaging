import React from 'react';
import Message from '../components/Message';
import useChat from '../hooks/useChat';
import ChatProfile from '../components/ChatProfile';

export default function ChatArea() {
    let roomId: string = '0000';

    const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

    const handleNewMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
    };

    return (
        <div className="page chat-area">
            <ChatProfile
                name="room 0000"
                info=""
            />
            <section className="chat-output">
                {messages.map((message) => (
                    <Message
                        userName={message.name || "Somebody"}
                        text={message.text}
                        time={new Date().toTimeString().substring(0, 5)}
                        picSrc={message.picSrc}
                        showInfo={true}
                        self={message.ownedByCurrentUser}
                    />
                ))}
            </section>
            <section className="chat-input">
                <article className="input">
                    <div className="input-contaner chat-input">
                        <button>
                            <span className="material-icons">attach_file</span>
                        </button>
                        <textarea
                            value={newMessage}
                            onChange={handleNewMessageChange}
                            placeholder="Enter your message"
                            onKeyUp={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                                if (event.keyCode === 13) {
                                    handleSendMessage()
                                }
                            }}
                        />
                        <button
                            onClick={handleSendMessage}
                        >
                            <span className="material-icons">send</span>
                        </button>
                    </div>
                </article>
            </section>
        </div>
    )
}
