import { Database as driver, Statement } from 'sqlite3';
import path from 'path';
import { generateID, getDate, makeDirctory, userDataPath } from './utils';
import { open, Database as sqliteDB, ISqlite } from 'sqlite';
import { SUser_All, SUser_Public, TChat_Profile, TUser_All, TUser_Public } from './Types';

const dbPath = userDataPath + '/corp-messaging/';
const filename = dbPath + 'db.db';

export default class Database {
    protected db?: sqliteDB<driver, Statement>;

    constructor() {
        makeDirctory(dbPath);
    }

    serialize(cb: () => void) {
        this.db?.db.serialize(cb)
    }

    async connect() {
        try {
            this.db = await open({ filename, driver });
            console.log('%s: database was connected succsesfully', getDate().all);
        } catch (error) {
            console.log('%s: %s', getDate().all, error.stack);
        }
    }

    async getUsersByUsername(particalUsername: string): Promise<TUser_Public[] | undefined> {
        const query = `
            SELECT
                ${SUser_Public}
            FROM
                users
            WHERE
                username LIKE ?
            ORDER BY wasOnlineAt
            limit 20
        `;
        try {
            return await this.db?.all<TUser_Public[]>(query, '%' + particalUsername + '%');
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByUsername(username: string): Promise<TUser_All | undefined> {
        const query = `SELECT ${SUser_All} FROM users WHERE username = ?`;
        try {
            return await this.db?.get<TUser_All>(query, username);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByID(id: string): Promise<TUser_All | undefined> {
        const query = `SELECT ${SUser_All} FROM users WHERE _id = ?`;
        try {
            return await this.db?.get<TUser_All>(query, id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async auth(username: string, password: string): Promise<{ _id: string }> {
        try {
            if (await this.getUserByUsername(username)) {
                const signInResult = await this._signIn(username, password);
                if (signInResult)
                    return signInResult;
                else
                    throw new Error('wrong password');
            } else {
                const signUpResult = await this.signUp(username, password);
                if (signUpResult) {
                    return signUpResult;
                } else {
                    throw new Error('dberr: no changes');
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    protected async _signIn(username: string, password: string): Promise<{ _id: string } | undefined> {
        const query = 'SELECT _id FROM users WHERE username = ? AND password = ?;';
        try {
            return await this.db?.get<{ _id: string }>(query, [username, password]);
        } catch (error) {
            throw new Error(error);
        }
    }

    protected async signUp(username: string, password: string): Promise<{ _id: string } | undefined> {
        const query = 'INSERT INTO users(_id, username, password, accessRight, registeredAt) VALUES(?, ?, ?, ?, ?);';
        try {


            if (!(await this.getUserByUsername(username))) {
                const _id = await this.getUniqueUserID();
                const result = await this.db?.run(query, [
                    _id, username, password, '0', getDate().all
                ])
                return result?.changes || 0 > 0 ? { _id } : undefined;
            } else {
                throw new Error('username is taken');
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async changeUsername(id: string, newUsername: string): Promise<string | undefined> {
        const query = "UPDATE users SET username = ? WHERE _id = ?";
        try {
            if (await this.getUserByUsername(newUsername)) {
                const result = await this.db?.run(query, [newUsername, id]);
                return result?.changes || 0 > 0 ? 'success' : undefined;
            } else {
                return 'name is taken';
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async changeName(id: string, newName: string): Promise<string | undefined> {
        const query = "UPDATE users SET name = ? WHERE _id = ?";
        try {
            const result = await this.db?.run(query, [newName, id]);
            return result?.changes || 0 > 0 ? 'success' : undefined;
        } catch (error) {
            throw new Error(error);
        }
    }

    async changePassword(
        id: string, oldPassword: string, newPassword: string
    ): Promise<string | undefined> {
        const query = "UPDATE users SET password = ? WHERE _id = ? AND password = ?";
        try {
            const result = await this.db?.run(query, [newPassword, id, oldPassword])
            return result?.changes || 0 > 0 ? 'success' : undefined;
        } catch (error) {
            throw new Error(error);
        }
    }


    async setOnline(id: string, value: boolean): Promise<string | undefined> {
        const query1 = "UPDATE users SET isOnline = ? WHERE _id = ?";
        const query2 = "UPDATE users SET wasOnlineAt = ? WHERE _id = ?";
        try {
            if (await this.db?.run(query1, [value.toString(), id]))
                return await this.db?.run(query2, [getDate().all, id]) ? '' : undefined;
            else
                return undefined;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUniqueUserID() {
        let id = '';
        while (true) {
            id = generateID();
            if (!await this.getUserByID(id)) return id;
        }
    }

    async getUniqueChatID() {
        let id = '';
        while (true) {
            id = generateID();
            if (!await this.db?.get('SELECT * FROM chats WHERE _id = ?', id)) {
                return id;
            }
        }
    }

    async createChatPM(userID1: string, userID2: string): Promise<string> {
        const query1 = 'INSERT INTO chats(_id, isPrivateMessages) VALUES(?, ?);';
        const query2 = 'INSERT INTO chatMembers(chat_id, user_id) VALUES(?, ?);';

        try {
            if (await this.getUserByID(userID1) && await this.getUserByID(userID2)) {
                const chat_id = await this.getUniqueChatID();
                const createResult = await this.db?.run(query1, [chat_id, true])
                if (createResult?.changes || 0 > 0) {
                    const addUser1 = await this.db?.run(query2, chat_id, userID1);
                    const addUser2 = await this.db?.run(query2, chat_id, userID2);
                    if (addUser1?.changes || 0 > 0 && addUser2?.changes || 0 > 0) {
                        return chat_id;
                    } else {
                        throw new Error('adding members to chat: no changes');
                    }
                } else {
                    throw new Error('create chat: no changes');
                }
            } else {
                throw new Error('not valid users');
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getChatIDsByUserID(userID: string): Promise<{
        _id: string,
        lastChange: string,
        isPrivateMessages: string
    }[]> {
        const query = `
            SELECT
                chats._id, chats.lastChange, chats.isPrivateMessages
            FROM
                chats, chatMembers
            WHERE
                chatMembers.chat_id = chats._id AND 
                chatMembers.user_id = ?
            ORDER BY chats.lastChange DESC
        `;
        try {
            return await this.db?.all<{
                _id: string,
                lastChange: string,
                isPrivateMessages: string
            }[]>(query, userID) || [];
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPMIDsByUserID(userID: string): Promise<{
        _id: string,
        lastChange: string
    }[]> {
        const query = `
            SELECT
                chats._id, chats.lastChange
            FROM
                chats, chatMembers
            WHERE
                chats.isPrivateMessages = "true" AND
                chatMembers.chat_id = chats._id AND
                chatMembers.user_id = ?
            ORDER BY chats.lastChange DESC
        `;
        try {
            return await this.db?.all<{
                _id: string, lastChange: string
            }[]>(query, userID) || [];
        } catch (error) {
            throw new Error(error);
        }
    }

    async getChat(chat_id: string, user_id: string): Promise<TChat_Profile> {
        const query = 'SELECT user_id FROM chatMembers WHERE chat_id = ?';
        try {
            const members = (await this.db?.all<{ user_id: string }[]>(query, chat_id)) || [];
            switch (members.length) {
                case 0:
                    throw new Error('no members in the chat');
                case 1:
                    const result = await this.getUserByID(members[0].user_id);
                    return {
                        chat_id,
                        membersIDs: members.map(v => v.user_id),
                        name: result?.name || result?.username,
                        picSrc: result?.picSrc,
                        online: result?.isOnline
                    }
                case 2: {
                    const interlocutor = members[0].user_id === user_id ? members[1].user_id : members[0].user_id;
                    const result = await this.getUserByID(interlocutor);
                    return {
                        chat_id,
                        membersIDs: members.map(v => v.user_id),
                        name: result?.name || result?.username,
                        picSrc: result?.picSrc,
                        online: result?.isOnline
                    }
                }
                default: {
                    const query2 = 'SELECT name, picSrc FROM chats WHERE _id = ?';
                    const result = await this.db?.get<{
                        name?: string, picSrc?: string
                    }>(query2, chat_id);
                    return { chat_id, membersIDs: members.map(v => v.user_id), ...result }
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async sendMessage(sender: string, receiver: string, chat_id: string, text: string) {
        const fields = 'chat_id, sender_id, receiver_id, text, date';
        const query = 'INSERT INTO privateMessages(' + fields + ') VALUES(?, ?, ?, ?, ?)';
        try {
            const result = await this.db?.run(query, [
                chat_id, sender, receiver, text, getDate().all
            ])
            return result?.changes || 0 > 0 ? 'succses' : undefined;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getPM(chat_id: string) {
        const query = `
            SELECT
                sender_id, receiver_id, text, date
            FROM
                privateMessages
            WHERE
                chat_id = ?
            ORDER BY date DESC
            limit 1000
        `;
        try {
            return await this.db?.all<{
                sender_id: string, receiver_id: string, text: string, date: string
            }[]>(query, chat_id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserIDsByChatID(chat_id: string) {
        const query = 'SELECT user_id WHERE chat_id = ?';
        try {
            const result = await this.db?.all<{ user_id: string }[]>(query, chat_id);
            return result?.map(v => v.user_id);
        } catch (error) {
            throw new Error(error);
        }
    }
}
