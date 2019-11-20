import {
    SHOW_FIND, SHOW_FIND_SUCCESS, SHOW_FIND_FAIL,
    SHOW_POPULARIZE, SHOW_POPULARIZE_SUCCESS, SHOW_POPULARIZE_FAIL
} from '../types/Show';

export const showFindAction = (show, cb) => {
    console.log('Inside showFindAction', show, cb);
    return {
        type: SHOW_FIND,
        payload: {
            show,
            cb
        }
    }
};

export const showFindSuccessAction = (shows) => {
    // console.log('Inside songsReadSuccessAction: shows', shows);
    return {
        type: SHOW_FIND_SUCCESS,
        payload: {
            shows
        }
    }
};

export const showFindFailAction = (err) => {
    console.log(err);
    return {
        type: SHOW_FIND_FAIL,
        payload: {err}
    }
};


export const showPopularizeAction = (show_id) => {
    console.log('Inside showPopularizeAction', show_id);
    return {
        type: SHOW_POPULARIZE,
        payload: {
            show_id,
        }
    }
};

export const showPopularizeSuccessAction = (shows) => {
    // console.log('Inside songsReadSuccessAction: shows', shows);
    return {
        type: SHOW_POPULARIZE_SUCCESS,
        payload: {
            shows
        }
    }
};

export const showPopularizeFailAction = (err) => {
    console.log(err);
    return {
        type: SHOW_POPULARIZE_FAIL,
        payload: {err}
    }
};
