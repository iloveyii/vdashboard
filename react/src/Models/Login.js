import ActiveRecord from './ActiveRecord';
import axios from "axios";

class Login extends ActiveRecord {
    constructor(name) {
        super(name);
        this.form = {
            username: 'root',
            password: 'root',
            authenticated: false
        };
    }

    newApiRead = (user) => console.log('Inside api', user) ||
        axios.get(this.server, {
            auth: {
                username: user.data.username,
                password: user.data.password
            },
            headers: {
                username: user.data.username,
                password: user.data.password
            }
        }).then(res => res.data).catch(error => {
            throw new Error(error);
            console.dir(error);
        });

    get api() {
        const newApi = super.api;
        newApi.read = this.newApiRead;
        return newApi;
    }

}

export default Login;
