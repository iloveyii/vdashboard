import axios from 'axios';
import {apiServer} from '../common/constants';

const endPoint = '/api/v1/users';
const server = apiServer + endPoint;

export default {
    user: {
        add: (item) =>
            axios.post(server, item, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),
        delete: (id) =>
            axios.delete(server + '/' + id, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),

        update: (item) =>
            axios.put(server + '/' + item.id, item, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),
        read: () => console.log('Inside api to ' + server) ||
            axios.get(server).then(res => { console.log('api',res.data); return res.data;}).catch(error => {
                throw new Error(error);
                console.dir(error);
            })
    }
}
