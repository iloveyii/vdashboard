import { call, put } from 'redux-saga/effects';
import api from '../api/songs';
import {
    showFindSuccessAction, showFindFailAction,
    showPopularizeSuccessAction, showPopularizeFailAction
} from "../actions/ShowAction";

export function* showFindSaga(action) {
    try {
        const resp = yield call(api.shows.find, action.payload.show);
        console.log('Inside showFindSaga ', action);
        if((resp)) {
            // console.log('Inside songsReadSaga isArray', action, resp);
            yield put(showFindSuccessAction(resp));
            console.log('Inside showFindSaga calling showFindSuccessAction', action);
            action.payload.cb && action.payload.cb(resp);
        }
    } catch (err) {
        yield put(showFindFailAction(err));
    }
}

