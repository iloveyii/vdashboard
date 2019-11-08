import {takeLatest, takeEvery} from 'redux-saga/effects';

import {VIDEO_ADD, VIDEO_READ, VIDEO_DELETE, VIDEO_UPDATE} from "../types/Video";
import {LOGIN} from "../types/Login";
import {USER_ADD, USER_DELETE, USER_UPDATE, USER_READ} from "../types/User";

import {videoAddSaga, videoReadSaga, videoDeleteSaga, videoUpdateSaga} from "./videoSagas";
import {loginSaga} from "./loginSagas";
import {userAddSaga, userDeleteSaga, userUpdateSaga, userReadSaga} from "./userSagas";
import {showReadSaga} from "./showSagas";

import Show from '../Models/Show';
import {apiServer} from '../common/constants';
import models from "../store/models";

const endPoint = '/api/v1/shows';
const api = apiServer + endPoint;
//     constructor(name, server, form, forceUpdate) {
const show = new Show('show', api, [], null);

const user = new Show('u' , apiServer + '/api/v1/users', [],  null);


export default function* rootSaga() {
    yield takeLatest(USER_ADD, userAddSaga);
    yield takeLatest(USER_DELETE, userDeleteSaga);
    yield takeLatest(USER_UPDATE, userUpdateSaga);
    yield takeLatest(USER_READ, userReadSaga);

    yield takeLatest(LOGIN, loginSaga);

    yield takeLatest(VIDEO_ADD, videoAddSaga);
    yield takeLatest(VIDEO_READ, videoReadSaga);
    yield takeLatest(VIDEO_DELETE, videoDeleteSaga);
    yield takeLatest(VIDEO_UPDATE, videoUpdateSaga);

    // yield takeLatest(show.types.read, show.sagas.read);
    //yield takeLatest(user.types.read, user.sagas.read);
    for(let i=0; i < Object.keys(models).length; i++) {
        const model = models[Object.keys(models)[i]];
        // CRUD Listeners
        yield takeLatest(model.types.create, model.sagas.create);
        yield takeLatest(model.types.read, model.sagas.read);
        yield takeLatest(model.types.update, model.sagas.update);
        yield takeLatest(model.types.delete, model.sagas.deleted);
    }
}



