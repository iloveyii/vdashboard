import { POSTS_READ_SUCCESS } from '../types/Posts';

const initState = [];

const PostsReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case POSTS_READ_SUCCESS:
            console.log('Inside PostsReducer', action.payload);
            return action.payload.science;
        default:
            return state;
    }
};

export default PostsReducer;
