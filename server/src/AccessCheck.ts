import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import jwt from 'jsonwebtoken';
import { secret } from '.';

function AccessCheck(
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    next: (err?: ExtendedError | undefined) => void
) {
    const token: string = socket.handshake.auth.token || '';
    jwt.verify(token, secret, err => {       
        if (err) {
            socket.emit('auth: status', { status: 400, msg: 'not authorized' })
            return next(new Error('not authorized'));;
        }
        next();
    })
}

export default AccessCheck;