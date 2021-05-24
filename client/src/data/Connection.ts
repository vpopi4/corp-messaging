import { io } from "socket.io-client";
import { TContact, userPublic } from "../propTypes";
import { changeAuthState, setContactList, togglePage } from "./state";
import store from "./store";

const SOCKET_SERVER_URL = 'http://localhost:5000';
const AUTH_URL = '/auth';
const USER_URL = '/user';
const modCond = process.env.NODE_ENV === 'production';
const options = {
    transports: ['websocket'],
    secure: true,
    autoConnect: false,
}

const authSocket = io(modCond ? AUTH_URL : SOCKET_SERVER_URL + AUTH_URL, options);
const userSocket = io(modCond ? USER_URL : SOCKET_SERVER_URL + USER_URL, options);

authSocket.connect();

authSocket.on('connect_error', (err) => {
    console.log('authSocket:', err.message);
});

userSocket.on('connect_error', (err) => {
    console.log('userSocket:', err.message);
});

authSocket.on('auth: sign-in', (data: { status: number, msg: string, token: string }) => {
    if (data.status === 200) {
        authorization(data.token);
        store.dispatch(togglePage(6));
    } else {
        alert(data.msg);
    }
})

authSocket.on('auth: check-token', (data: { status: number, msg: string }) => {
    if (data.status === 200) {
        authorization(localStorage.getItem('yoga'));
    } else {
        console.log('authSocket:', data.msg);
        authorization(null);
    }
})

export const signIn = (username: string, password: string) => {
    authSocket.emit('auth: sign-in', { username, password });
}

export const checkToken = () => {
    const token = localStorage.getItem('yoga');
    if (token) {
        authSocket.emit('auth: check-token', { token });
    }
}

export const signOut = () => {
    authorization(null);
    store.dispatch(togglePage(0));
}

export const authorization = (token?: string | null) => {
    if (token) {
        localStorage.setItem('yoga', token);
        store.dispatch(changeAuthState(true));
        userSocket.auth = { token };
        userSocket.connect();
    } else {
        localStorage.removeItem('yoga');
        store.dispatch(changeAuthState(false));
        userSocket.disconnect();
    }
}


userSocket.on('user: search-user', async (data: {
    status: number, msg: string, data?: TContact[] 
}) => {
    if (data.status === 200) {
        store.dispatch(setContactList(data.data || []));
    } else if (data.status === 400) {
        store.dispatch(setContactList([]));
    } else {
        console.log(data.msg);        
    }
});

userSocket.on('user: contact-list', async (data: {
    status: number, msg: string, data?: TContact[]
}) => {
    if (data.status === 200) {
        store.dispatch(setContactList(data.data || []));
    } else if (data.status === 400) {
        store.dispatch(setContactList([]));
    } else {
        console.log(data.msg);        
    }
});

export const searchUser = (particalUsername: string) => {
    userSocket.emit('user: search-user', { particalUsername });
}

export const getContactsList = () => {
    userSocket.emit('user: contact-list');
}

userSocket.on('test', () => console.log('test'));