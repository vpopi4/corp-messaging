import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { getDate, resolveToken } from '../utils';
import AccessCheck from '../AccessCheck';
import { db } from '..';

function User(io: Server<DefaultEventsMap, DefaultEventsMap>) {
    io.of('/user').use(AccessCheck);
    io.of('/user').on('connection', async (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
        let userID = resolveToken(socket.handshake.auth.token).id;
        console.log('%s: user [%s]_[%s] connected to /user', getDate().all, socket.id, userID);
        try {
            await db.setOnline(userID, true);         
            
            socket.on('user: change-username', async (newUsername: string) => {
                try {
                    const result = await db.changeUsername(userID, newUsername)
                    if (result === 'success') {
                        socket.emit('user: change-username', { status: 200, msg: result });
                    } else if (result === 'username is taken') {
                        socket.emit('user: change-username', { status: 400, msg: result });
                    } else {
                        socket.emit('user: change-username', { status: 500, msg: 'no changes' });
                    }
                } catch (error) {
                    socket.emit('user: change-username', { status: 500, msg: 'no changes' });
                }
            });

            socket.on('user: change-name', async (newName: string) => {
                try {
                    const result = await db.changeName(userID, newName)
                    if (result) {
                        socket.emit('user: change-name', { status: 200, msg: result });
                    } else {
                        socket.emit('user: change-name', { status: 500, msg: 'no changes' });
                    }
                } catch (error) {
                    socket.emit('user: change-name', { status: 500, msg: 'no changes' });
                }
            });
            
            // socket.on('user: search-user', async (data: { particalUsername: string }) => {
            //     try {
            //         const result = await db.getUsersByUsername(data.particalUsername);
            //         if (result) {
            //             socket.emit('user: search-user', { status: 200, msg: 'success', data: result });
            //         } else {
            //             socket.emit('user: search-user', { status: 400, msg: 'not found', data: result });
            //         }
            //     } catch (error) {
            //         socket.emit('user: search-user', { status: 500, msg: error.stack });
            //     }
            // });

            // socket.on('user: contact-list', () => {

            // });

            socket.on('disconnect', async () => {
                await db.setOnline(userID, false);
                console.log('%s: user [%s]_[%s] disconnected from /user', getDate().all, socket.id, userID);
            });
        } catch (error) {
            console.log(new Error(error));
            socket.disconnect();
        }
    });
}

export default User;