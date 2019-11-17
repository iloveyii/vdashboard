import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

// # 01
/**
 * A reducer is a function that operates on the state object and then returns it
 * Please note that this function is also called during initialization of store - so any code
 * without if stmt will be executed multiple times - internal operation of store !
 * @param state - this is a misleading name - here it is not the full state but just corresponding key value
 * @param action
 * @returns {Array} - every return value is assigned to the corresponding key in allReducers
 */
import rootSaga from './sagas/rootSaga';
import PostsReducer from "./reducers/PostsReducer";
import SongsReducer from "./reducers/SongsReducer";
import {songsReadAction} from "./actions/SongsAction";
import {showFindAction} from "./actions/ShowAction";
import ShowReducer from "./reducers/ShowReducer";
import LoginReducer from "./reducers/Login";
import PlayerReducer from "./reducers/PlayerReducer";

const allReducers = combineReducers({
    shows: SongsReducer,
    //shows: ShowReducer, // Search
    login: LoginReducer,
    player: PlayerReducer,
});

// # 02
/**
 * Sagas to connect to external world - async api calls
 */
const sagaMiddleware = createSagaMiddleware({});

// # 03
/**
 * Store enhancers, devToolsExtensions
 */
// Fixing error : TypeError: t is undefined
// Only chrome can handle the redux dev tool
// Redux compose cannot handle a null or undefined middleware
const allStoreEnhancers = applyMiddleware(sagaMiddleware);

// # 04
/**
 * Create store with allReducers which are all called one by one when there is dispatch
 * Second param is initial state of store
 * Last param is for redux debug in chrome extension
 * @type {Store<S&StateExt>&Ext}
 */
const store = createStore(
    allReducers,
    {},
    allStoreEnhancers
);
sagaMiddleware.run(rootSaga);

// # 05
/**
 * You can see the status of store - but only data and not reducers
 */
// console.log(store.getState());

// # 06
/**
 * Action is an object with format of type and payload
 * @type {{type: string, payload: {newState: string}}}
 * Dispatch action to store
 */
console.log('Dispatching actions in store.js');
store.dispatch(songsReadAction());
store.dispatch(showFindAction('label'));


export default store;
