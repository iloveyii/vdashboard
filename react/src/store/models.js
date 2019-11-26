// name, server, form, forceUpdate
import Show from "../Models/Show";
import Episode from "../Models/Episode";
import Login from "../Models/Login";


const models = {
    shows: new Show('shows'),
    logins: new Login('logins'),
    episodes: new Episode('episodes')
};

export default models;
