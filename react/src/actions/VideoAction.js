import {
    VIDEO_READ, VIDEO_READ_SUCCESS,VIDEO_READ_FAIL,
    VIDEO_ADD,VIDEO_ADD_SUCCESS,VIDEO_ADD_FAIL,
    VIDEO_DELETE,VIDEO_DELETE_SUCCESS,VIDEO_DELETE_FAIL,
    VIDEO_UPDATE,VIDEO_UPDATE_SUCCESS,VIDEO_UPDATE_FAIL,
    VIDEO_SEARCH, VIDEO_SEARCH_SUCCESS, VIDEO_SEARCH_FAIL,
    VIDEO_EDIT, VIDEO_EDIT_SUCCESS,VIDEO_EDIT_FAIL
} from '../types/Video';

export const videoReadAction = () => {
    console.log('Inside videoReadAction');
    return {
        type: VIDEO_READ,
        payload: {}
    }
};

export const videoReadSuccessAction = (videos) => {
    return {
        type: VIDEO_READ_SUCCESS,
        payload: videos
    }
};

export const videoReadFailAction = (err) => {
    console.log(err);
    return {
        type: VIDEO_READ_FAIL,
        payload: {err}
    }
};


export const videoAddAction = (video, action) => {
    console.log('Inside videoAddAction', video, action);
    return {
        type: VIDEO_ADD,
        payload: {
            video,
            action
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



export const videoDeleteAction = (video) => {
    console.log('Inside videoDeleteAction', video);
    return {
        type: VIDEO_DELETE,
        payload: {
            video
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


export const videoUpdateAction = (formData, action) => {
    console.log('Inside videoUpdateAction', formData, action);
    return {
        type: VIDEO_UPDATE,
        payload: {
            formData, action
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

export const videoEditAction = (video) => {
    console.log('Inside videoEditAction', video);
    return {
        type: VIDEO_EDIT,
        payload: {
            video,
        }
    }
};

export const videoEditSuccessAction = (result) => {
    return {
        type: VIDEO_EDIT_SUCCESS,
        payload: {
            result
        }
    }
};

