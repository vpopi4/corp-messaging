
export type TGlobalState = {
    isAuthorized: boolean,
    currentPage: number,
    contactList?: TContact[]
}

export type TContact = {
    username: string,
    name?: string,
    online: boolean,
    picSrc?: string
}







export type TChatContent = {
    userPicSrc?: string;
    chatName: string;
    countNewMessages: number;
    online: boolean;
    lastMessage: {
        date: string;
        text: string;
    };
}

export type TPage = {
    id: number,
    name: string,
    view?: string,
    icon?: JSX.Element,
    accessAllowed: boolean,

}

export type TUser = {
    name: string,
    picSrc?: string,
    online?: boolean
}

export type PTNav = {
    id: number,
    onClick: () => void
}

export type userPublic = {
    _id: string,
    username: string,
    accessRight: string,
    name?: string,
    picSrc?: string,
    registeredAt?: string,
    isOnline?: string,
    wasOnlineAt?: string,
}


/* 
[
    [
        {
            id: 3,
            onClick: () => {

            }
        },
        {
            id: 4,
            onClick: () => {

            }
        },
        {
            id: 5,
            onClick: () => {

            }
        },
        {
            id: 6,
            onClick: () => {

            }
        },
    ],
    [
        {
            id: 1,
            onClick: () => {

            }
        },
        {
            id: 2,
            onClick: () => {

            }
        }
    ]
]; */