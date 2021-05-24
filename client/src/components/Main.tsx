import { Component } from 'react';
import store from '../data/store';
import ChatArea from '../pages/ChatArea';
import Contacts from '../pages/Contacts';
import ComingSoon from '../pages/ComingSoon';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';

export default class Main extends Component {
    render() {
        switch (store.getState().globalState.currentPage) {
            case 0:
                return <MainWrapper><Home /></MainWrapper>;
            case 1:
                return <MainWrapper><SignIn /></MainWrapper>;
            case 2:
                return <MainWrapper><Contacts  /></MainWrapper>;
            case 3:
                return <MainWrapper><ChatArea /></MainWrapper>;
            case 6:
                return <MainWrapper><Profile /></MainWrapper>;
            default:
                return <MainWrapper><ComingSoon /></MainWrapper>;
        }
    }
}

function MainWrapper(props: { children?: React.ReactNode }) {
    return (
        <main>
            <div className="contaner">
                {props.children}
            </div>
        </main>
    )
}

