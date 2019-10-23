import {VIDEO_ADD_SUCCESS, VIDEO_EDIT, VIDEO_READ_SUCCESS} from '../types/Video';

const initState = {
    list: [],
    form: {}
};

const VideoReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case VIDEO_READ_SUCCESS:
            console.log('Inside VideoReducer', action.payload);
            const list = action.payload.slice();
            const newStateSuccess = {...state, ...{list}};
            return newStateSuccess;

        case VIDEO_ADD_SUCCESS:
            console.log('Inside VideoReducer', action.payload);
            const form = Object.assign({}, state.form);
            form.result = action.payload.result;
            const newStateAdd = {...state, ...{form}};
            return newStateAdd;

        case VIDEO_EDIT:
            console.log('Inside VideoReducer VIDEO_EDIT', action.payload);
            const newStateEdit = {...state, ...{form: action.payload.video}};
            console.log('Inside VideoReducer newState', newStateEdit);

            return newStateEdit;


        default:
            return state;
    }
};

export default VideoReducer;
