import { SONGS_READ_SUCCESS } from '../types/Songs';
import { SHOW_POPULARIZE_SUCCESS } from '../types/Show';

const initState = {
    list: [],
    form: {},
    actions: {
        type: null, ok: false
    }
};

const SongsReducer = (state = initState, action = {}) => {
    // console.log('Inside SongsReducer: action, state: ', action, state);
    let latest, popular, _id, shows;
    switch (action.type) {
        case SONGS_READ_SUCCESS:
            // console.log('Inside SongsReducer', action.payload);
            let {list, form, actions} = action.payload.data;
            console.log('SONGS_READ_SUCCESS', list)
            return {...state, ...{list, form, actions}};
            /*latest = JSON.parse(JSON.stringify(action.payload.data));
            popular = JSON.parse(JSON.stringify(latest));
            popular.sort((a, b) => Number(b.popular) - Number(a.popular));

            return {latest, popular};*/

        case SHOW_POPULARIZE_SUCCESS:
            popular = JSON.parse(JSON.stringify(state.popular));
            latest = JSON.parse(JSON.stringify(state.latest));
            const popularOfStoreIndex = popular.findIndex(p => p._id === action.payload.shows.value._id);
            popular[popularOfStoreIndex].popular = action.payload.shows.value.popular;
            popular.sort((a, b) => Number(b.popular) - Number(a.popular));

            return {latest, popular};
        default:
            return state;
    }
};

export default SongsReducer;
