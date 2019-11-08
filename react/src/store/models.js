
// name, server, form, forceUpdate
import Show from "../Models/Show";
import {apiServer} from "../common/constants";
const endPoint = '/api/v1/shows';


const models = {
    shows: new Show('show', apiServer+endPoint, [], null),
    user : new Show('u' , apiServer + '/api/v1/users', [],  null)

};

export default models;
