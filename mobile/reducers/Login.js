import {FACEBOOK_LOGIN, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL} from '../types/Login';

const initState = {
    login: {
        facebook: false,
        google: false,
        user: {}
    }
};

const LoginReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case FACEBOOK_LOGIN_SUCCESS:
            console.log('Inside LoginReducer', action.payload);
            const login = JSON.parse(JSON.stringify(action.payload.login));
            return login;

        default:
            return state;
    }
};

export default LoginReducer;
