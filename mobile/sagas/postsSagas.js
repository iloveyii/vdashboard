import { call, put } from 'redux-saga/effects';
import api from '../api/posts';
import { postsReadSuccessAction, postsReadFailAction } from "../actions/PostsAction";

export function* postsReadSaga(action) {
    try {
        const resp = yield call(api.feed.read, action.payload);
        console.log('Inside postsReadSaga', action);

        if((resp)) {
            console.log('Inside postsReadSaga isArray', action, resp);
            yield put(postsReadSuccessAction(resp));
        } else {
            yield put(postsReadFailAction(resp));
        }
    } catch (err) {
        yield put(postsReadFailAction(err));
    }
}
