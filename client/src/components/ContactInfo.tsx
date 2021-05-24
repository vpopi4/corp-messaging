import ChatImage from './ChatImage';
import { TContact } from '../propTypes';

export default function ContactInfo(props: TContact) {
    return (
        <article className="contact-info">
            <ChatImage online={props.online} picSrc={props.picSrc} />
            <div className="preview">
                <div className="name">{props.name || ''}</div>
                <div className="username">{props.username}</div>
            </div>
        </article>
    )
}
