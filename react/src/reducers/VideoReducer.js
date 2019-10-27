import {VIDEO_ADD_SUCCESS, VIDEO_EDIT, VIDEO_READ_SUCCESS, VIDEO_UPDATE_SUCCESS} from '../types/Video';
import Video from '../Models/Video';

const initState = {
    list: [],
    form: {}
};

const VideoReducer = (state = initState, action = {}) => {
    let form = {};
    switch (action.type) {
        case VIDEO_READ_SUCCESS:
            console.log('Inside VideoReducer', action.payload);
            const data = action.payload;
            const list = [];
            data.forEach(video => list.push(new Video(video)));

            const newStateSuccess = {...state, ...{list}};
            return newStateSuccess;

        case VIDEO_ADD_SUCCESS:
            console.log('Inside VideoReducer', action.payload);
            form = Object.assign({}, state.form);
            form.result = action.payload.result;
            const newStateAdd = {...state, ...{form}};
            return newStateAdd;

        case VIDEO_EDIT:
            console.log('Inside VideoReducer VIDEO_EDIT', action.payload);
            const newStateEdit = {...state, ...{form: action.payload.video}};
            console.log('Inside VideoReducer newState', newStateEdit);

            return newStateEdit;

        case VIDEO_UPDATE_SUCCESS:
            console.log('Inside VideoReducer', action.payload);
            form = Object.assign({}, state.form);
            form.result = action.payload.result;
            const newStateUpdate = {...state, ...{form}};

            return newStateUpdate;

        default:
            return state;
    }
};

export default VideoReducer;
