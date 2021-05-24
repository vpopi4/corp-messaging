export type TUser_All = {
    _id: string,
    username: string,
    accessRight: string,
    name?: string,
    picSrc?: string,
    registeredAt?: string,
    isOnline?: boolean,
    wasOnlineAt?: string,
}

export const SUser_All = `
    _id,
    username,
    accessRight,
    name,
    picSrc,
    registeredAt,
    isOnline,
    wasOnlineAt
`;

export type TUser_Public = {
    username: string,
    name?: string,
    picSrc?: string,
    isOnline?: boolean
}

export const SUser_Public = `
    username,
    name,
    picSrc,
    isOnline
`;

export type TChat_Profile = {
    chat_id: string,
    membersIDs: string[],
    picSrc?: string,
    name?: string,
    online?: boolean
}