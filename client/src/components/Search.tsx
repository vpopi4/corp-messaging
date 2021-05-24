import { Component } from 'react'

export default class ChatInput extends Component {
    render() {
        return (
            <div className="input-contaner">
                <i className="fas fa-search icon"></i>
                <input type="text" placeholder="Search..." />
            </div>
        )
    }
}
