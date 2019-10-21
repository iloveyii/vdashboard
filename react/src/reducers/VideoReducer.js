import { VIDEO_READ_SUCCESS } from '../types/Video';

const initState = [];

const VideoReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case VIDEO_READ_SUCCESS:
            console.log('Inside VideoReducer', action.payload);
            return action.payload;

        default:
            return state;
    }
};

export default VideoReducer;
