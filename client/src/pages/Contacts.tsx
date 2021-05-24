import { Component } from 'react';
import { getContactsList, searchUser } from '../data/Connection';
import store from '../data/store';
import ContactInfo from '../components/ContactInfo';

export default class Contacts extends Component<{}, {
    searchValue: string
}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchValue: ''
        }
        this.onChange = this.onChange.bind(this);
        getContactsList();
    }

    // componentDidMount() {
    //     getChatList();
    // }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const searchValue = e.target.value;
        this.setState({ searchValue });
        if (searchValue === '') {
            getContactsList();
        } else {
            searchUser(searchValue);
        }
    }

    render() {
        const contactList = store.getState().globalState.contactList;
        return (
            <div className="page chat-list">
                <section className="search">
                    <article>
                        <div className="input-contaner">
                            <span className="material-icons icon">search</span>
                            <input type="text" placeholder="Search..." onChange={this.onChange} />
                        </div>
                    </article>
                </section>
                <section className="chat-list">
                    {contactList?.map(data => <ContactInfo
                        username={data.username}
                        online={data.online}
                        name={data.name}
                        picSrc={data.picSrc}                       
                    />)}
                </section>
            </div>
        )
    }
}
