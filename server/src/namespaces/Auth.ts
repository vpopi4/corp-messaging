import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import jwt from 'jsonwebtoken';
import { getDate } from '../utils';
import { db, secret } from '..';

function Auth(io: Server<DefaultEventsMap, DefaultEventsMap>) {

    io.of('/auth').use((socket: Socket<DefaultEventsMap, DefaultEventsMap>, next) => {
        socket.use((event, next) => {
            const eventName: string = event[0];
            const data: Object = event[1];
            const data1 = event[1];

            if (eventName === "auth: sign-in") {
                if (data.hasOwnProperty('username') && data.hasOwnProperty('password')) {
                    if (typeof data1.username === 'string' && typeof data1.password === 'string') {
                        next();
                    } else {
                        next(new Error('Wrong sign-in data types'));
                    }
                } else {
                    next(new Error('Wrong sign-in data'));
                }
            } else {
                next();
            }
        });

        next();
    });

    io.of('/auth').on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
        console.log('%s: user [%s] connected to /auth', getDate().all, socket.id);

        socket.on('auth: sign-in', async (data: { username: string, password: string }) => {
            const { username, password } = data;
            try {
                const result = await db.auth(username, password);
                socket.emit('auth: sign-in', {
                    status: 200,
                    msg: 'Access allowed',
                    token: jwt.sign({ id: result._id }, secret, { expiresIn: 24 * 60 * 60 })
                });
            } catch (error) {
                console.log(error);
                
                socket.emit('auth: sign-in', { status: 500, msg: error.message });
            }
        });

        socket.on('auth: check-token', (data: { token: string }) => {
            jwt.verify(data.token, secret, err => {
                if (err) {
                    socket.emit('auth: check-token', { status: 400, msg: 'not valid' })
                } else {
                    socket.emit('auth: check-token', { status: 200, msg: 'token is valid' })
                }
            })
        })

        socket.on('disconnect', () => {
            console.log('%s: user [%s] disconnected from /auth', getDate().all, socket.id);
        });
    });

}

export default Auth;