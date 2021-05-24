import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { getDate, resolveToken } from '../utils';
import AccessCheck from '../AccessCheck';
import { db } from '..';

function Private(io: Server<DefaultEventsMap, DefaultEventsMap>) {
    io.of('/private').use(AccessCheck);
    io.of('/private').on('connection', async (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
        let userID = resolveToken(socket.handshake.auth.token).id;
        let chat_id = socket.handshake.query.chat_id as string;
        console.log('%s: user [%s]_[%s] connected to /private', getDate().all, socket.id, userID);
        try {
            const users = await db.getUserIDsByChatID(chat_id) || [];
            let receiverID = '';

            if (users.length !== 2) {
                socket.disconnect(true);
            }

            if (users[0] === userID) {
                receiverID = users[1]
            } else if (users[1] === userID) {
                receiverID = users[0]
            } else {
                socket.disconnect(true);
            }

            socket.on('private: send-message', (text: string) => {
                db.sendMessage(userID, receiverID, chat_id, text);
            });

            socket.on('private: get-messages', async () => {
                try {
                    const result = await db.getPM(chat_id) || [];
                    socket.emit('private: get-messages', { status: 200, msg: '', data: result });
                } catch (error) {
                    socket.emit('private: get-messages', { status: 500, msg: error });
                }
            });

            socket.on('private: contact-list', () => {

            });

            socket.on('disconnect', async () => {
                await db.setOnline(userID, false);
                console.log('%s: user [%s]_[%s] disconnected from /private', getDate().all, socket.id, userID);
            });
        } catch (error) {
            console.log(new Error(error));
            socket.disconnect();
        }
    });
}

export default Private;