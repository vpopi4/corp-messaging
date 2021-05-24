import moment from 'moment';
import App from './App';
import Database from './Database';
import Auth from './namespaces/Auth';
import User from './namespaces/User';

export const port = process.env.PORT || 5000;
export const secret = '9e20745b-e987-4c04-94f7-2ecfe6b1de9a';
export const db = new Database();
export const app = new App();

(async function () {
    await db.connect();
    app.listen();
    app.setNamespace(Auth);
    app.setNamespace(User);
    
    // const user = await db.get_UserByUsername('hitachi790')
    // console.log(user.wasOnlineAt, moment(user.wasOnlineAt, 'DD.MM.YYYY HH:mm:ss:SS').format('DD/MM/YY HH:mm'));
    
})();
