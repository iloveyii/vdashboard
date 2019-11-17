import { POSTS_READ, POSTS_READ_SUCCESS, POSTS_READ_FAIL } from '../types/Posts';

export const postsReadAction = () => {
    console.log('Inside postsReadAction');
    return {
        type: POSTS_READ,
        payload: {

        }
    }
};

export const postsReadSuccessAction = (science) => {
    return {
        type: POSTS_READ_SUCCESS,
        payload: {
            science
        }
    }
};

export const postsReadFailAction = (err) => {
    console.log(err);
    return {
        type: POSTS_READ_FAIL,
        payload: {err}
    }
};
