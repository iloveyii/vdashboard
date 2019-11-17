import {POSTS_READ} from "../types/Posts";
import {SONGS_POPULARIZE, SONGS_READ} from "../types/Songs";
import {SHOW_FIND} from "../types/Show";
import { takeLatest} from 'redux-saga/effects';
import { postsReadSaga } from "./postsSagas";
import { songsReadSaga } from "./songsSagas";
import { showFindSaga } from "./showSagas";
import { songsPopularizeSaga } from "./songsSagas";


export default function* rootSaga() {
    yield takeLatest(POSTS_READ, postsReadSaga);
    yield takeLatest(SONGS_READ, songsReadSaga);
    yield takeLatest(SONGS_POPULARIZE, songsPopularizeSaga);
    yield takeLatest(SHOW_FIND, showFindSaga);
}
