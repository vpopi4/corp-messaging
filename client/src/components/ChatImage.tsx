import { Component } from 'react';
import defaultUserPic from '../assets/user.png';
import classNames from 'classnames';

export default class ChatImage extends Component<{
    picSrc?: string,
    online?: boolean,
    hideOnlineIcon?: boolean
}> {
    render() {
        return (
            <div className="chat-image">
                <img src={this.props.picSrc || defaultUserPic} alt="user" />
                {
                    this.props.hideOnlineIcon ?
                        <></> :
                        <OnlineIndicator online={this.props.online || false} />
                }
            </div>
        )
    }
}

function OnlineIndicator(props: { online: boolean }) {
    return (
        <div className="online-indicator">
            <div className={classNames({
                online: props.online,
                offline: !props.online
            })} />
        </div >
    )
}
