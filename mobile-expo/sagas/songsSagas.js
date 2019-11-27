import { call, put } from 'redux-saga/effects';
import api from '../api/songs';
import {songsReadSuccessAction, songsReadFailAction, songsPopularizeFailAction} from "../actions/SongsAction";

export function* songsReadSaga(action) {
    try {
        console.log('Inside songsReadSaga ', action);
        const resp = yield call(api.shows.read, action.payload);
        if((resp)) {
            console.log('Inside songsReadSaga isArray', resp);
            yield put(songsReadSuccessAction(resp));
        } else {
            yield put(songsReadFailAction(resp));
        }
    } catch (err) {
        yield put(songsReadFailAction(err));
    }
}


export function* songsPopularizeSaga(action) {
    try {
        const resp = yield call(api.songs.popularize, action.payload.id);
        console.log('Inside songsPopularizeAction showPopularizeSaga resp: ', resp);
        if((resp)) {
            yield put(songsPopularizeSaga(resp));
            console.log('Inside showPopularizeSaga calling  showPopularizeSuccessAction');
            action.payload.cb && action.payload.cb(resp);
        }
    } catch (err) {
        yield put(songsPopularizeFailAction(err));
    }
}

