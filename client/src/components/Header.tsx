import { Component } from 'react';
import Nav from './Nav';
import store from '../data/store';
import { togglePage } from '../data/state';

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="contaner">
                    <div onClick={onClick} className="title">
                        <h1>Corporate messaging</h1>
                    </div>
                    <Nav />
                </div>
            </header>
        )
    }
}

function onClick() {
    if (!store.getState().globalState.isAuthorized) {
        store.dispatch(togglePage(0));
    }
}
