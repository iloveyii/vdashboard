import {
    VIDEO_READ,
    VIDEO_READ_SUCCESS,
    VIDEO_READ_FAIL,
    VIDEO_ADD,
    VIDEO_ADD_SUCCESS,
    VIDEO_ADD_FAIL,
    VIDEO_DELETE,
    VIDEO_DELETE_SUCCESS,
    VIDEO_DELETE_FAIL,
    VIDEO_UPDATE,
    VIDEO_UPDATE_SUCCESS,
    VIDEO_UPDATE_FAIL,
    VIDEO_SEARCH, VIDEO_SEARCH_SUCCESS, VIDEO_SEARCH_FAIL
} from '../types/Video';

export const videoReadAction = () => {
    console.log('Inside videoReadAction');
    return {
        type: VIDEO_READ,
        payload: {}
    }
};

export const videoReadSuccessAction = (shows) => {
    return {
        type: VIDEO_READ_SUCCESS,
        payload: shows
    }
};

export const videoReadFailAction = (err) => {
    console.log(err);
    return {
        type: VIDEO_READ_FAIL,
        payload: {err}
    }
};


export const videoAddAction = (show) => {
    console.log('Inside videoAddAction', show);
    return {
        type: VIDEO_ADD,
        payload: {
            show
        }
    }
};

export const videoAddSuccessAction = (result) => {
    return {
        type: VIDEO_ADD_SUCCESS,
        payload: {
            result
        }
    }
};

export const videoAddFailAction = (err) => {
    console.log(err);
    return {
        type: VIDEO_ADD_FAIL,
        payload: {err}
    }
};



export const videoDeleteAction = (show) => {
    console.log('Inside videoDeleteAction', show);
    return {
        type: VIDEO_DELETE,
        payload: {
            show
        }
    }
};

export const videoDeleteSuccessAction = (result) => {
    return {
        type: VIDEO_DELETE_SUCCESS,
        payload: {
            result
        }
    }
};

export const videoDeleteFailAction = (err) => {
    console.log(err);
    return {
        type: VIDEO_DELETE_FAIL,
        payload: {err}
    }
};


export const videoUpdateAction = (show) => {
    console.log('Inside videoUpdateAction', show);
    return {
        type: VIDEO_UPDATE,
        payload: {
            show
        }
    }
};

export const videoUpdateSuccessAction = (result) => {
    return {
        type: VIDEO_UPDATE_SUCCESS,
        payload: {
            result
        }
    }
};

export const videoUpdateFailAction = (err) => {
    console.log(err);
    return {
        type: VIDEO_UPDATE_FAIL,
        payload: {err}
    }
};


export const videoSearchAction = (str) => {
    console.log('Inside videoUpdateAction', str);
    return {
        type: VIDEO_SEARCH,
        payload: {
            str
        }
    }
};

export const videoSearchSuccessAction = (result) => {
    return {
        type: VIDEO_SEARCH_SUCCESS,
        payload: {
            result
        }
    }
};

export const videoSearchFailAction = (err) => {
    console.log(err);
    return {
        type: VIDEO_SEARCH_FAIL,
        payload: {err}
    }
};
