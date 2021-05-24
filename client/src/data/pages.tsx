
const pages = new Map<number, {
    id: number,
    name: string,
    view?: string,
    icon?: JSX.Element
}>()

pages.set(0, {
    id: 0,
    name: 'home',
});

pages.set(1, {
    id: 1,
    name: 'sign-in',
    view: 'Sign in',
    icon: <i className="fas fa-sign-in-alt icon"></i>
});

pages.set(2, {
    id: 2,
    name: 'contacts',
    view: 'Contacts',
    icon: <span className="material-icons icon">group</span>
});

pages.set(3, {
    id: 3,
    name: 'chat',
    view: 'Messages',
    icon: <span className="fas fa-comments icon"></span>,
});

pages.set(6, {
    id: 6,
    name: 'Profile',
    view: 'Profile',
    icon: <span className="material-icons icon">account_box</span>
});

pages.set(4, {
    id: 4,
    name: 'groups',
});

pages.set(5, {
    id: 5,
    name: 'feed',
    view: 'Feed',
    icon: <span className="material-icons icon">article</span>,
});

export default pages;
