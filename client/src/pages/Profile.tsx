import { Component } from 'react';
import { signOut } from '../data/Connection';

export default class Profile extends Component {
    render() {
        return (
            <div className="page profile">
                <section className="header">
                    <article>

                    </article>
                </section>
                <section className="info">
                    <article>

                    </article>
                </section>
                <section className="actions">
                    <article>
                        <button onClick={signOut}>Sign out</button>
                    </article>
                </section>
            </div>
        )
    }
}
