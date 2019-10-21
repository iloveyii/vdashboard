import {VIDEO_ADD_SUCCESS, VIDEO_READ_SUCCESS} from '../types/Video';

const initState = {
    list: [],
    form: {}
};

const VideoReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case VIDEO_READ_SUCCESS:
            console.log('Inside VideoReducer', action.payload);
            const list = action.payload.slice();
            var newState = {...state, ...{list}};
            return newState;

        case VIDEO_ADD_SUCCESS:
            console.log('Inside VideoReducer', action.payload);
            const form = Object.assign({}, state.form);
            form.result = action.payload.result;
            var newState = {...state, ...{form}};
            return newState;

        default:
            return state;
    }
};

export default VideoReducer;
