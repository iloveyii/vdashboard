import {
    MUTE,
    ADD_PLAY_LIST,
    ADD_PLAYING_NOW,
    PLAY_NEXT, PLAY_NEXT_SUCCESS,
    PLAY_PREVIOUS, PLAY_PREVIOUS_SUCCESS,
    PLAY_FORWARD, PLAY_FORWARD_SUCCESS,
    PLAY_BACKWARD, PLAY_BACKWARD_SUCCESS,
    PLAY_PAUSE, PLAY_PAUSE_SUCCESS,
    PLAY_POSITION
} from '../types/Player';

export const muteAction = (mute) => {
    console.log('Inside muteAction');
    return {
        type: MUTE,
        payload: {mute}
    }
};
export const muteSuccessAction = (mute) => {
    // console.log('Inside songsReadSuccessAction: shows', shows);
    return {
        type: MUTE_SUCCESS,
        payload: {
            mute
        }
    }
};

export const addPlayListAction = (playList) => {
    console.log('addPlayerListAction', playList);
    return {
        type: ADD_PLAY_LIST,
        payload: {playList}
    }
};

export const addPlayerListSuccessAction = (playingList) => {
    console.log(playingList);
    return {
        type: ADD_PLAYER_LIST_SUCCESS,
        payload: {playingList}
    }
};

export const addPlayingNowAction = (playingNow) => {
    console.log(playingNow);
    return {
        type: ADD_PLAYING_NOW,
        payload: {playingNow}
    }
};

export const addPlayingNowSuccessAction = (video) => {
    console.log(video);
    return {
        type: ADD_PLAYING_NOW_SUCCESS,
        payload: {video}
    }
};

export const playNextAction = (skip) => {
    console.log('playNextAction');
    return {
        type: PLAY_NEXT,
        payload: {skip}
    }
};

export const playNextSuccessAction = (result) => {
    console.log('playNextSuccessAction');
    return {
        type: PLAY_NEXT_SUCCESS,
        payload: {result}
    }
};

export const playPreviousAction = (skip) => {
    console.dir('Inside playPreviousAction', skip);
    return {
        type: PLAY_PREVIOUS,
        payload: {skip}
    }
};
export const playPreviousSuccessAction = (result) => {
    console.log('Inside playPreviousSuccessAction');
    return {
        type: PLAY_PREVIOUS_SUCCESS,
        payload: {result}
    }
};
export const playForwardAction = (time) => {
    console.log('Inside playForwardAction', time);
    return {
        type: PLAY_FORWARD,
        payload: {time}
    }
};
export const playForwardSuccessAction = (result) => {
    console.log('Inside playForwardSuccessAction');
    return {
        type: PLAY_FORWARD_SUCCESS,
        payload: {result}
    }
};
export const playBackwardAction = (time) => {
    console.log('Inside playBackwardAction', time);
    return {
        type: PLAY_BACKWARD,
        payload: {time}
    }
};
export const playBackwardSuccessAction = (result) => {
    console.log('Inside export const playBackwardSuccessAction = (time) => {\n');
    return {
        type: PLAY_BACKWARD_SUCCESS,
        payload: {result}
    }
};
export const playPauseAction = () => {
    console.log('Inside playPauseAction');
    return {
        type: PLAY_PAUSE,
        payload: {}
    }
};
export const playPauseSuccessAction = (result) => {
    console.log('Inside playPauseSuccessAction');
    return {
        type: PLAY_PAUSE_SUCCESS,
        payload: {result}
    }
};
export const playPositionAction = (time, duration) => {
    console.log('Inside playPositionAction', time, duration);
    return {
        type: PLAY_POSITION,
        payload: {time, duration}
    }
};
