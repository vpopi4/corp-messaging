import { Component } from 'react';
import { signIn } from '../data/Connection';

export default class SignIn extends Component<{}, {
    username: string,
    password: string
}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <div className="page sign-in">
                <section>
                    <article>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={(event) => this.setState({username: event.target.value})}
                            />
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(event) => this.setState({password: event.target.value})}
                            />
                        </div>
                        <button onClick={() => {
                            signIn(this.state.username, this.state.password)
                        }}>Sign in</button>
                    </article>
                </section>
            </div>
        )
    }
}
