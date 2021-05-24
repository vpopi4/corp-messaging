import React from 'react'

export default function ChatInput(/* props: {

} */) {
    return (
        <section className="chat-input">
            <article className="input">
                <div className="input-contaner chat-input">
                    <button>
                        <span className="material-icons">attach_file</span>
                    </button>
                    <textarea
                        placeholder="Enter your message"
                    />
                    <button>
                        <span className="material-icons">send</span>
                    </button>
                </div>
            </article>
        </section>
    )
}


/*

<{
    newMessage: string,
    handleNewMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleSendMessage: () => void
}>

<ChatInput newMessage={newMessage} handleNewMessageChange={handleNewMessageChange} handleSendMessage={handleSendMessage} />

*/