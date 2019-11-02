import {call, put} from 'redux-saga/effects';
import api from '../api/user';
import {
    userDeleteSuccessAction,
    userDeleteFailAction,
    userAddSuccessAction,
    userAddFailAction,
    userUpdateSuccessAction,
    userUpdateFailAction,
    userReadAction,
    userReadSuccessAction,
    userReadFailAction
} from "../actions/UserAction";

export function* userAddSaga(action) {
    try {
        const resp = yield call(api.user.add, action.payload);
        console.log('userAddSaga', resp);

        if (Array.isArray(Object.keys(resp))) {
            console.log('Inside userAddSaga', action, resp);
            yield put(userAddSuccessAction(resp));
        } else {
            yield put(userAddFailAction(resp));
        }
    } catch (err) {
        yield put(userAddFailAction(err));
    }
}

export function* userDeleteSaga(action) {
    try {
        const resp = yield call(api.user.delete, action.payload.id);
        console.log('userDeleteSaga', action);

        if (Array.isArray(Object.keys(resp))) {
            console.log('Inside userDeleteSaga', action, resp);
            yield put(userDeleteSuccessAction({status : resp.status, id : action.payload.id}));
            // yield put(usersReadSuccessAction(resp));
        } else {
            yield put(userDeleteFailAction(resp));
        }
    } catch (err) {
        yield put(userDeleteFailAction(err));
    }
}

export function* userUpdateSaga(action) {
    try {
        const resp = yield call(api.user.update, action.payload.user);
        console.log('userUpdateSaga', action);

        if (Array.isArray(Object.keys(resp))) {
            console.log('Inside userUpdateSaga', action, resp);
            yield put(userUpdateSuccessAction(resp));
            yield put(userReadAction());
        } else {
            yield put(userUpdateFailAction(resp));
        }
    } catch (err) {
        yield put(userUpdateFailAction(err));
    }
}

export function* userReadSaga(action) {
    try {
        console.log('Inside userReadSaga');
        const resp = yield call(api.user.read, action.payload);
        console.log('userReadSaga', resp);

        if (Array.isArray(Object.keys(resp))) {
            console.log('Inside usersReadSaga', action, resp);
            yield put(userReadSuccessAction(resp));
        } else {
            yield put(userReadFailAction(resp));
        }
    } catch (err) {
        yield put(userReadFailAction(err));
    }
}
