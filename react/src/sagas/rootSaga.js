import {takeLatest, takeEvery} from 'redux-saga/effects';

import {VIDEO_ADD, VIDEO_READ, VIDEO_DELETE, VIDEO_UPDATE} from "../types/Video";
import {LOGIN} from "../types/Login";
import {USER_ADD, USER_DELETE, USER_UPDATE, USER_READ} from "../types/User";

import {videoAddSaga, videoReadSaga, videoDeleteSaga, videoUpdateSaga} from "./videoSagas";
import {loginSaga} from "./loginSagas";
import {userAddSaga, userDeleteSaga, userUpdateSaga, userReadSaga} from "./userSagas";
import {showReadSaga} from "./showSagas";

import Model from '../Models/Model';
const show = new Model('show');


export default function* rootSaga() {
    /*yield takeLatest(USER_ADD, userAddSaga);
    yield takeLatest(USER_DELETE, userDeleteSaga);
    yield takeLatest(USER_UPDATE, userUpdateSaga);
    // yield takeLatest(USER_READ, userReadSaga);

    yield takeLatest(LOGIN, loginSaga);

    yield takeLatest(VIDEO_ADD, videoAddSaga);
    yield takeLatest(VIDEO_READ, videoReadSaga);
    yield takeLatest(VIDEO_DELETE, videoDeleteSaga);
    yield takeLatest(VIDEO_UPDATE, videoUpdateSaga); */

    // console.log('Inside saga of: '+ show.actions.read, show.sagas.read())
    yield takeLatest(show.types.read, show.sagas.read);
    // inside saga of show
    // inside show actions
    // inside show default



}
