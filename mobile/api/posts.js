import axios from 'axios';
import * as settings from "../constants/settings";
const server = settings.apiServer + '/api/v1/posts';

export default {
    feed: {
        read: () => {
            console.log('Reading posts from ' + server);
            axios.get(server).then(res => res.data).catch(error => {
                console.log('Some error occurred in posts axios get');
                console.log(error);
            })
        }
    }
}
