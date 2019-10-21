import {call, put} from 'redux-saga/effects';
import api from '../api/video';
import {
    videoReadAction, videoReadSuccessAction, videoReadFailAction,
    videoAddSuccessAction, videoAddFailAction,
    videoDeleteSuccessAction, videoDeleteFailAction,
    videoUpdateSuccessAction, videoUpdateFailAction, videoAddAction
} from "../actions/VideoAction";

export function* videoReadSaga(action) {
    try {
        const resp = yield call(api.video.read, action.payload);

        if (Array.isArray(resp)) {
            console.log('Inside interestingReadSaga', action, resp);
            yield put(videoReadSuccessAction(resp));
        } else {
            yield put(videoReadFailAction(resp));
        }
    } catch (err) {
        yield put(videoReadFailAction(err));
    }
}

export function* videoAddSaga(action) {
    console.log('Inside videoAddSaga ', action);
    try {
        const resp = yield call(api.video.add, { video : action.payload.video, action: (d) => action.payload.action(d) });

        if (resp && Array.isArray(Object.keys(resp))) {
            console.log('Inside videoAddSaga isArray', action, resp);
            yield put(videoAddSuccessAction(resp));
            yield put(videoReadAction());
        } else {
            yield put(videoAddFailAction(resp));
        }
    } catch (err) {
        yield put(videoAddFailAction(err));
    }
}


export function* videoDeleteSaga(action) {
    console.log('Inside videoDeleteSaga ', action);
    try {
        const resp = yield call(api.video.delete, action.payload.show);

        if (Array.isArray(Object.keys(resp))) {
            console.log('Inside videoAddSaga isArray', action, resp);
            yield put(videoDeleteSuccessAction(resp));
            yield put(videoReadAction());
        } else {
            yield put(videoDeleteFailAction(resp));
        }
    } catch (err) {
        yield put(videoDeleteFailAction(err));
    }
}

export function* videoUpdateSaga(action) {
    console.log('Inside videoUpdateSaga ', action);
    try {
        const resp = yield call(api.video.update, action.payload.show);
        console.log('Resp', resp);

        if (resp && Array.isArray(Object.keys(resp))) {
            console.log('Inside videoUpdateSaga isArray', action, resp);
            yield put(videoUpdateSuccessAction(resp));
            yield put(videoReadAction());
        } else {
            // yield put(videoUpdateFailAction(resp));
        }
    } catch (err) {
        console.log(err);
        yield put(videoUpdateFailAction(err));
    }
}
