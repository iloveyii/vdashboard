import axios from 'axios';
import {apiServer} from '../common/constants';

const endPoint = '/api/v1/login';
const server = apiServer + endPoint;

export default {
    user: {
        login: (user) => console.log('Inside api', user) ||
            axios.get(server, {
                auth: {
                    username: user.username,
                    password: user.password
                },
                headers: {
                    username: user.username,
                    password: user.password
                }
            }).then(res => res.data).catch(error => {
                throw new Error(error);
                console.dir(error);
            }),

        signup: (user) => console.log(user)
    }
}
