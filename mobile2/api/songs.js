import axios from 'axios';
import * as settings from "../constants/settings";

const server = settings.apiServer + '/api/v1/shows';

export default {
    shows: {
        read: () => axios.get(server).then(res => {
            console.log('Inside songs.read api.', server, res.data);
            return res.data;
        }).catch(error => console.log(error)),
        find: (show) => {
            console.log('making request to ', server + '/' + show);
            return axios.get(server + '/' + show).then(res => res.data).catch(error => console.log(error))
        }, // finds exact for episodes
    },
    songs: {
        popularize: (id) => axios.put(settings.apiServer + '/api/v1/popularize/'+id, {id}).then(res => res.data).catch(error => console.log(error)),
    }
}
