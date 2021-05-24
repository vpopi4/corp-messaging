import fs from 'fs';
import moment from 'moment';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';

export const userDataPath = process.env.APPDATA || (
    process.platform === 'darwin' ?
        process.env.HOME + '/Library/Preferences' :
        process.env.HOME + "/.local/share"
);

export function makeDirctory(path: string) {
    if (!fs.existsSync(path)) {
        console.log(getDate().all + ': making directiory at ' + path);
        fs.mkdirSync(path);
    }
}

export function getDate() {
    const now = moment();
    return {
        day: now.format('YYYY-MM-DD'),
        time: now.format('HH:mm:ss.SSS'),
        all: now.format('YYYY-MM-DD HH:mm:ss.SSS'),
        noSeparator: now.format('YYYYMMDDHHmmssSSS'),
    }
}

export function generateID() {
    return v4();
}

export function resolveToken(token: string = '') {
    return jwt.decode(token) as { id: string };
}
