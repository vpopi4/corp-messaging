import { createSlice } from '@reduxjs/toolkit';
import { TContact, TGlobalState } from '../propTypes';

const initialState: TGlobalState = {
    isAuthorized: false,
    currentPage: parseInt(localStorage.getItem('currentPage') || '0'),
}

const state = createSlice({
    name: 'state',
    initialState,
    reducers: {
        togglePage(store, action: { payload: number, type: string }) {
            store.currentPage = action.payload;
            localStorage.setItem('currentPage', store.currentPage.toString());
        },
        changeAuthState(store, action: { payload: boolean, type: string }) {
            store.isAuthorized = action.payload;
        },
        setContactList(store, action: { payload: TContact[], type: string }) {
            store.contactList = action.payload;
        }
    }
})

export default state.reducer;
export const { togglePage, changeAuthState, setContactList } = state.actions;
