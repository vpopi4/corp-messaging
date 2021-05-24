import { configureStore } from '@reduxjs/toolkit';
import state from './state';

const store = configureStore({
    reducer: {
        globalState: state
    },
})

export default store;