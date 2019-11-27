import React from 'react';
import {connect} from "react-redux";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {
    playNextAction,
    playPreviousAction,
    playForwardAction,
    playBackwardAction,
    playPauseAction
} from "../actions/PlayerAction";

const FORWARD_TIME_PERIOD = 10 * 1000; // ms

class PlayerControls extends React.Component {

    constructor(props) {
        super(props);
    }

    handlePlayPrevious = () => {
        const {playPreviousAction} = this.props;
        playPreviousAction(1);
    };

    handlePlayNext = () => {
        const {playNextAction} = this.props;
        playNextAction(1);
    };

    handleBackward = () => {
        const {playBackwardAction} = this.props;
        console.log('Inside handleBackward', FORWARD_TIME_PERIOD);
        playBackwardAction(FORWARD_TIME_PERIOD);
        /*
        const {positionMillis} = this.playbackStatus;
        let newPosition = positionMillis - (15 * 1000);
        newPosition = newPosition < 0 ? 0 : newPosition;
        this.videoRef.setPositionAsync(newPosition);
        this.resetShowControlsTimeout(); */
    };

    handleForward = () => {
        const {playForwardAction} = this.props;
        console.log('Inside handleForward', FORWARD_TIME_PERIOD);
        playForwardAction(FORWARD_TIME_PERIOD);
        /*
        const {positionMillis, durationMillis} = this.playbackStatus;
        let newPosition = positionMillis + (15 * 1000);
        newPosition = newPosition >= durationMillis ? durationMillis : newPosition;
        this.videoRef.setPositionAsync(newPosition);
        this.setState({sliderValue: null});
        this.resetShowControlsTimeout(); */
    };

    handlePlayAndPause = () => {
        const {playPauseAction} = this.props;
        playPauseAction();
    };

    setPositionAsync(value) {
        this.videoRef.setPositionAsync(value);
    }

    render() {
        return (
            <View style={styles.controls}>

                <TouchableOpacity
                    onPress={this.handlePlayPrevious}
                >
                    <MaterialIcons
                        name={"skip-previous"}
                        size={45}
                        color="white"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.handleBackward}
                >
                    <MaterialIcons
                        name={"replay-10"}
                        size={45}
                        color="white"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.handlePlayAndPause}
                >
                    <MaterialIcons
                        name={!this.props.player.pause ? "pause" : "play-arrow"}
                        size={45}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.handleForward}
                >
                    <MaterialIcons
                        name={"forward-10"}
                        size={45}
                        color="white"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.handlePlayNext}
                >
                    <MaterialIcons
                        name={"skip-next"}
                        size={45}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        )
    }
}


PlayerControls.defaultProps = {
    url: 'http://softhem.se/vids/eliman.mp4'
};

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    player: state.player
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = ({
    playNextAction,
    playPreviousAction,
    playForwardAction,
    playBackwardAction,
    playPauseAction
});

export default connect(mapStateToProps, mapActionsToProps)(PlayerControls);

const styles = StyleSheet.create({
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
});


