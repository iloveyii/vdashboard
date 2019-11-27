import { SONGS_READ, SONGS_READ_SUCCESS, SONGS_READ_FAIL } from '../types/Songs';
import {SONGS_POPULARIZE, SONGS_POPULARIZE_FAIL, SONGS_POPULARIZE_SUCCESS} from "../types/Songs";

export const songsReadAction = () => {
    console.log('Inside songsReadAction');
    return {
        type: SONGS_READ,
        payload: {}
    }
};

export const songsReadSuccessAction = (data) => {
    console.log('Inside songsReadSuccessAction: data', data);
    return {
        type: SONGS_READ_SUCCESS,
        payload: {
            data
        }
    }
};

export const songsReadFailAction = (err) => {
    console.log(err);
    return {
        type: SONGS_READ_FAIL,
        payload: {err}
    }
};

export const songsPopularizeAction = (id) => {
    console.log('Inside songsPopularizeAction', id);
    return {
        type: SONGS_POPULARIZE,
        payload: {
            id,
        }
    }
};

export const songsPopularizeSuccessAction = (data) => {
    // console.log('Inside songsReadSuccessAction: shows', shows);
    return {
        type: SONGS_POPULARIZE_SUCCESS,
        payload: {
            data
        }
    }
};

export const songsPopularizeFailAction = (err) => {
    console.log(err);
    return {
        type: SONGS_POPULARIZE_FAIL,
        payload: {err}
    }
};
