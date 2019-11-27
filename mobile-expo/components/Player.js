import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Video} from 'expo-av';
import {theme} from "../constants";
import {connect} from "react-redux";
import {apiServer} from "../constants/settings";
import SliderControl from './SliderControl';
import {showFindAction} from '../actions/ShowAction';
import PlayerControls from "./PlayerControls";
import {
    playPositionAction,
} from "../actions/PlayerAction";

const HIDE_CONTROLS_TIMEOUT = 7000; // milliseconds


class Player extends React.Component {
    state = {
        mute: false,
        shouldPlay: true,
        currentIndex: 0,
        showControls: false,
        sliderValue: 0,
        sliderValueMax: 0,
        player: {},
    };

    constructor(props) {
        super(props);
        this.videoRef = null;
        this.sliderValue = 0;
        this.currentIndex = 0;
        this.showControls = this.showControls.bind(this);
        this.handleFullScreen = this.handleFullScreen.bind(this);
        this.handleVolume = this.handleVolume.bind(this);
        this.setSlideControlUpdate = this.setSlideControlUpdate.bind(this);
        this.setPositionAsync = this.setPositionAsync.bind(this);
    }

    handleFullScreen() {
        this.videoRef.presentFullscreenPlayer();
    }

    handleVolume = () => {
        this.setState(prevState => ({
            mute: !prevState.mute,
        }));
        this.resetShowControlsTimeout();
    };

    componentDidMount() {
        const {player} = this.props;
        this.setState({player});
    }

    setSlideControlUpdate(method) {
        this.sliderControlUpdate = method;
    }

    handleVideoRef = component => {
        this.videoRef = component;
    };

    setPositionAsync(player) {
        console.log('setPositionAsync');
        if (player.forward.time != 0 && ((Date.now() - player.forward.timestamp) < 1000)) {
            console.log('Setting forward' + this.sliderValue + player.backward.time);
            this.videoRef.setPositionAsync(this.sliderValue + player.forward.time);
        }
        if (player.backward.time != 0 && ((Date.now() - player.backward.timestamp) < 1000)) {
            console.log('Setting backward' + this.sliderValue + player.backward.time);
            this.videoRef.setPositionAsync((this.sliderValue - player.backward.time) > 0 ? (this.sliderValue - player.backward.time) : 0);
        }
    }

    handlePlaybackStatusUpdate = playbackStatus => {

        this.playbackStatus = playbackStatus;
        if (Math.abs(this.sliderValue - Number(playbackStatus.positionMillis)) < 2000) return false;
        const sliderValueMax = playbackStatus.durationMillis ? playbackStatus.durationMillis : 0;
        const sliderValue = playbackStatus.positionMillis ? playbackStatus.positionMillis : 0;
        // this.setState({sliderValueMax, sliderValue});
        this.sliderValue = sliderValue;
        this.sliderValueMax = sliderValueMax;
        const {playPositionAction} = this.props;
        playPositionAction(sliderValue, playbackStatus.durationMillis);
        // this.forceUpdate();
        // console.log(' ==> Play Back Status, duration , position : ', playbackStatus.durationMillis, playbackStatus.positionMillis);
        // console.log('State duration, position : ' + this.sliderValueMax + ' , ' + this.sliderValue);
    };

    renderControls = () => <PlayerControls shouldPlay={this.state.shouldPlay}/>


    componentWillReceiveProps(nextProps, nextContext) {
        const {player} = nextProps;
        if (player && Object.keys(player).length > 0 && player.playingNow) {
            const oldPlayer = this.state.player;
            if (oldPlayer.playingNow._id !== player.playingNow._id) {
                this.setState({player});
            }
            this.setPositionAsync(player);
        }
    }


    showControls() {
        this.setState({showControls: true});
        this.resetShowControlsTimeout();
    }

    resetShowControlsTimeout() {
        clearTimeout(this.showControlsTimeout);
        this.showControlsTimeout = setTimeout(() => {
            this.setState({showControls: false});
        }, HIDE_CONTROLS_TIMEOUT, this);
    }

    render() {
        const {player} = this.state;
        if (!(player && player.playingNow && player.playingNow)) return <View><Text>Loading...</Text></View>;
        const url = player.playingNow.video;

        return (
            <View style={styles.container}>
                <View style={styles.video}>
                    <Video
                        key={url}
                        source={{uri: url}}
                        shouldPlay={!this.props.player.pause}
                        resizeMode={Video.RESIZE_MODE_COVER}
                        usePoster={true}
                        style={{width: '100%', height: '100%'}}
                        isMuted={player.mute}
                        posterSource={theme.icons.play}
                        ref={this.handleVideoRef}
                        onPlaybackStatusUpdate={this.handlePlaybackStatusUpdate}
                        progressUpdateIntervalMillis={5000}
                        onFullscreenUpdate={() => console.log('Full screened')}
                        staysActiveInBackground={true}
                    />
                </View>

                {this.state.showControls && this.renderControls()}

                <TouchableOpacity
                    onPress={this.showControls}

                    style={
                        {
                            position: 'absolute',
                            top: 0,
                            selfAlign: 'top',
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            borderWidth: 0,
                            borderColor: 'blue',
                            backgroundColor: 'transparent'
                        }
                    }
                >
                </TouchableOpacity>

                <SliderControl mute={this.state.mute}
                               setSlideControlUpdate={this.setSlideControlUpdate}
                               handleVolume={this.handleVolume}
                               handleFullScreen={this.handleFullScreen}
                               setPositionAsync={this.setPositionAsync}
                />
            </View>
        );
    }
}

Player.defaultProps = {
    url: 'http://softhem.se/vids/eliman.mp4'
};

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    shows: state.shows,
    latest: state.shows.list,
    popular: state.shows.list,
    player: state.player
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = ({
    showFindAction,
    playPositionAction
});

export default connect(mapStateToProps, mapActionsToProps)(Player);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: theme.colors.darkGrey,
        shadowOffset: {width: 0, height: 10,},
        shadowColor: theme.colors.lightGrey,
        shadowOpacity: 0.5,
    },
    controls: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexShrink: 0,
        width: '100%',
        zIndex: 2
    },
    video: {
        borderWidth: 0,
        borderColor: 'black',
        flex: 1,
        width: '100%',
        marginBottom: 0
    }
});

