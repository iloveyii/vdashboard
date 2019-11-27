import { FACEBOOK_LOGIN, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from '../types/Login';

export const facebookLoginAction = () => {
    console.log('Inside facebookLoginAction');
    return {
        type: FACEBOOK_LOGIN,
        payload: {}
    }
};

export const facebookLoginSuccessAction = (login) => {
    // console.log('Inside facebookLoginSuccessAction: shows', shows);
    return {
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: {
            login
        }
    }
};

export const facebookLoginFailAction = (err) => {
    console.log(err);
    return {
        type: FACEBOOK_LOGIN_FAIL,
        payload: {err}
    }
};
