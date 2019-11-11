// name, server, form, forceUpdate
import Show from "../Models/Show";
import Episode from "../Models/Episode";
import Login from "../Models/Login";


const models = {
    shows: new Show('shows'),
    users: new Show('users'),
    logins: new Login('logins'),
    episodes: new Episode('episodes')
};

export default models;
