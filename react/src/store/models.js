// name, server, form, forceUpdate
import Show from "../Models/Show";
import Episode from "../Models/Episode";


const models = {
    shows: new Show('shows'),
    users: new Show('users'),
    login: new Show('login'),
    episodes: new Episode('episodes')
};

export default models;
