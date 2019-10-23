import {takeLatest, takeEvery} from 'redux-saga/effects';

import {VIDEO_ADD, VIDEO_READ, VIDEO_DELETE} from "../types/Video";
import {LOGIN} from "../types/Login";
import {USER_ADD, USER_DELETE, USER_UPDATE, USER_READ} from "../types/User";

import {videoAddSaga, videoReadSaga, videoDeleteSaga} from "./videoSagas";
import {loginSaga} from "./loginSagas";
import {userAddSaga, userDeleteSaga, userUpdateSaga, userReadSaga} from "./userSagas";


export default function* rootSaga() {
    yield takeLatest(USER_ADD, userAddSaga);
    yield takeLatest(USER_DELETE, userDeleteSaga);
    yield takeLatest(USER_UPDATE, userUpdateSaga);
    yield takeLatest(VIDEO_DELETE, videoDeleteSaga);

    yield takeLatest(LOGIN, loginSaga);

    yield takeLatest(VIDEO_ADD, videoAddSaga);
    yield takeLatest(VIDEO_READ, videoReadSaga);

    yield takeLatest(USER_READ, userReadSaga);
}
