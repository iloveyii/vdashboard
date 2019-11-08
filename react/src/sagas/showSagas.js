import {call, put} from "redux-saga/effects";
import api from "../api/video";
import Model from "../Models/Model";


export function* showReadSaga (action) {
    const show = new Model('show');

    try {
        const data = yield call(api.video.read, action.payload);

        if ( true || Array.isArray(data)) {
            yield put( show.actions.read_success(data) );
        } else {
            yield put(show.actions.read_fail(data));
        }
    } catch (err) {
        yield put(show.actions.read_fail(err));
    }
}
