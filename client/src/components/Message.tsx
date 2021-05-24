import classNames from 'classnames';
import { Component } from 'react';
import ChatImage from './ChatImage';

export default class Message extends Component<{
    userName: string,
    text: string,
    time: string,
    picSrc?: string,
    showInfo?: boolean,
    self?: boolean
}> {
    render() {
        const condInfo = this.props.showInfo === undefined || this.props.showInfo;

        return (
            <article className={classNames({
                message: true,
                self: this.props.self
            })}>
                {condInfo ? <ChatImage hideOnlineIcon={true} picSrc={this.props.picSrc || undefined} /> : <></>}
                <div className="message-box">
                    {condInfo ? <div className="name">{this.props.userName}</div> : <></>}
                    <div className="text">{this.props.text}</div>
                    <div className="time">{this.props.time}</div>
                </div>
            </article>
        )

    }
}
