import { SHOW_FIND_SUCCESS, SHOW_POPULARIZE_SUCCESS } from '../types/Show';

const initState = [];

const ShowReducer = (state = initState, action = {}) => {
    // console.log('Inside SongsReducer: action, state: ', action, state);
    switch (action.type) {
        case SHOW_FIND_SUCCESS:
            // console.log('Inside SongsReducer', action.payload);
            return action.payload.shows;

        default:
            return state;
    }
};

export default ShowReducer;
