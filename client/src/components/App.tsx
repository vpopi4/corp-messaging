import { Component } from 'react';
import { checkToken } from '../data/Connection';
import store from '../data/store';
import Header from './Header';
import Main from './Main';

export default class App extends Component<{}, { version: number }> {
    constructor(props: {}) {
        super(props);
        this.state = { version: 0 }
        this.rerender = this.rerender.bind(this);
    }

    unscribe() {}

    rerender() {
        this.setState({ version: this.state.version + 1 })
    }

    componentDidMount() {
        this.unscribe = store.subscribe(this.rerender);
        checkToken();       
    }

    componentWillUnmount() {
        this.unscribe();
    }

    componentDidUpdate() {        
        // console.log(store.getState().globalState.currentPage);
    }

    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        )
    }
}
