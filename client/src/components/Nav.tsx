import { Component } from 'react';
import classNames from 'classnames';
import store from '../data/store';
import { togglePage } from '../data/state';
import pages from '../data/pages';

const pageIds = [[1], [2, 3, 6]];

export default class Nav extends Component {
    render() {
        const state = store.getState().globalState;
        return (
            <nav>
                <ul className="zero">
                    {
                        pageIds[state.isAuthorized ? 1 : 0].map(pageId => {
                            const page = pages.get(pageId);
                            const clickHandler = () => store.dispatch(togglePage(pageId))
                            const className = classNames({ current: pageId === state.currentPage })
                            return (
                                <li key={page?.name} >
                                    <button className={className} onClick={clickHandler}>
                                        {page?.icon || ''}
                                        <span className="text">{page?.view}</span>
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav >
        );
    }
}
