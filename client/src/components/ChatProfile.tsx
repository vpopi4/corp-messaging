import React from 'react';
import ChatImage from './ChatImage';

export default function ChatProfile(props: {
    picSrc?: string,
    name: string,
    info: string
}) {
    return (
        <section className="chat-profile"><article>
            <button className="back">
                <i className="fas fa-arrow-left"></i>
            </button>
            <ChatImage hideOnlineIcon={true} picSrc={props.picSrc} />
            <div className="title">
                <div className="name">{props.name}</div>
                <div className="info">{props.info}</div>
            </div>
            <button className="more">
                <i className="fas fa-ellipsis-v"></i>
            </button>
        </article></section>
    )
}
