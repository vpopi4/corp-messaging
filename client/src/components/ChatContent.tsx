import classNames from 'classnames';
import { Component } from 'react';
import ChatImage from './ChatImage';

export default class ChatContent extends Component<{
    picSrc?: string;
    name: string;
    online: boolean;
    // countNewMessages: number;
    // lastMessage: {
    //     date: string;
    //     text: string;
    // };
}> {
    render() {
        return (
            <article className="chat-content" >
                <ChatImage online={this.props.online} picSrc={this.props.picSrc} />
                <div className="preview">
                    <div>
                        {/* <div className="date">{this.props.lastMessage.date}</div> */}
                        <div className="name">{this.props.name}</div>
                    </div>
                    {/* <div>
                        <div className={classNames({
                            'count-new-messages': true,
                            'visible': this.props.countNewMessages > 0
                        })}>
                            <div>{this.props.countNewMessages > 99 ? '99+' : this.props.countNewMessages}</div>
                        </div>
                        <p className="last-message">{this.props.lastMessage.text.trim().substring(0, 150)}</p>
                    </div> */}
                </div>
            </article>
        )
    }
}