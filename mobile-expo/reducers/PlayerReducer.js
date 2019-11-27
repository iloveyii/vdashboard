import {
    MUTE,
    MUTE_SUCCESS,
    ADD_PLAY_LIST,
    ADD_PLAY_LIST_SUCCESS,
    ADD_PLAYING_NOW,
    ADD_PLAYING_NOW_SUCCESS,

    PLAY_NEXT, PLAY_NEXT_SUCCESS,
    PLAY_PREVIOUS, PLAY_PREVIOUS_SUCCESS,
    PLAY_FORWARD, PLAY_FORWARD_SUCCESS,
    PLAY_BACKWARD, PLAY_BACKWARD_SUCCESS,
    PLAY_PAUSE, PLAY_PAUSE_SUCCESS,
    PLAY_POSITION

} from '../types/Player';

const initState = {
    mute: false,
    playList: [],
    playingNow: {},
    playNext: {
        skip: 0
    },
    pause: false,
    forward: {time: 0, timestamp: Date.now()},
    backward: {time: 0, timestamp: Date.now()},
    position: {time: 0, duration: 0, timestamp: Date.now()},
};

function setPlayingNow(skipNextPrevious, playList, playingNow) {

    const LENGTH = playList ? (playList.length - 1) : false;
    if (LENGTH) { // if 0 length we cannot do anything with it just return it
        if (!playingNow) {
            playingNow = playList[0];
        }

        const playingIndex = playList.findIndex(video => video._id === playingNow._id);
        if (playingIndex !== -1) { // finds something
            // DIRECTION
            if (skipNextPrevious > 0) { // playNextButton Clicked
                if (playingIndex < LENGTH) {
                    playingNow = playList[playingIndex + 1];
                }
                if (playingIndex == LENGTH) {
                    playingNow = playList[0];
                }
            } else { // playPreviousButton Clicked
                if (playingIndex > 0) {
                    playingNow = playList[playingIndex - 1];
                }
                if (playingIndex == 0) {
                    playingNow = playList[LENGTH];
                }
            }
        }
    }

    return playingNow;
}

const PlayerReducer = (state = initState, action = {}) => {
    // console.log('Inside SongsReducer: action, state: ', action, state);
    switch (action.type) {
        case MUTE:
            const newStateMute = {...state};
            newStateMute.mute = action.payload.mute;
            return newStateMute;

        case ADD_PLAY_LIST:
            const newStateAddPlayerList = {...state};
            newStateAddPlayerList.playList = action.payload.playList;
            return newStateAddPlayerList;

        case ADD_PLAYING_NOW:
            const newStateAddPlayingNow = {...state};
            newStateAddPlayingNow.playingNow = action.payload.playingNow;
            console.log('ADD_PLAYING_NOW', action)
            return newStateAddPlayingNow;

        case PLAY_NEXT:
            var {playList, playingNow} = state;
            const newStatePlayNext = {...state};
            newStatePlayNext.playingNow = setPlayingNow(1, playList, playingNow);
            return newStatePlayNext;

        case PLAY_NEXT_SUCCESS:
            const newStatePlayNextSuccess = {...state};
            newStatePlayNextSuccess.playNext = {skip: 0};
            console.log('PLAY_NEXT', action);
            return newStatePlayNextSuccess;

        case PLAY_PREVIOUS:
            var {playList, playingNow} = state;
            console.log('PLAY_PREVIOUS', playingNow);
            const newStatePlayPrevious = {...state};
            newStatePlayPrevious.playingNow = setPlayingNow(-1, playList, playingNow);
            return newStatePlayPrevious;

        case PLAY_PAUSE:
            const {pause} = state;
            console.log('PLAY_PAUSE', pause);
            const newStatePlayPause = {...state};
            newStatePlayPause.pause = !state.pause;
            return newStatePlayPause;

        case PLAY_FORWARD:
            const {forward} = state;
            console.log('PLAY_FORWARD', forward, action);
            const newStatePlayForward = {...state};
            newStatePlayForward.forward.time = action.payload.time ? action.payload.time : 0;
            newStatePlayForward.forward.timestamp = Date.now();
            return newStatePlayForward;

        case PLAY_BACKWARD:
            const {backward} = state;
            console.log('PLAY_BACKWARD', backward, action);
            const newStatePlayBackward = {...state};
            newStatePlayBackward.backward.time = action.payload.time ? action.payload.time : 0;
            newStatePlayBackward.backward.timestamp = Date.now();
            return newStatePlayBackward;

        case PLAY_POSITION:
            const {position} = state;
            console.log('PLAY_POSITION', position);
            const newStatePlayPosition = {...state};
            newStatePlayPosition.position.time = action.payload.time ? action.payload.time : 0;
            newStatePlayPosition.position.duration = action.payload.duration ? action.payload.duration : 0;
            newStatePlayPosition.position.timestamp = Date.now();
            return newStatePlayPosition;

        default:
            return state;
    }
};

export default PlayerReducer;
