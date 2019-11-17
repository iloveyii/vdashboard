import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Slider} from 'react-native';
import {connect} from "react-redux";

const HIDE_CONTROLS_TIMEOUT = 7000; // milliseconds


class SliderControl extends React.Component {
    state = {
        mute: false,
        shouldPlay: true,
        showControls: false,
        sliderValue: 0,
        sliderValueMax: 0,
        min: 0,
        max: 5 * 60 * 1000,
        value: 0
    };

    constructor(props) {
        super(props);
        this.showControls = this.showControls.bind(this);
        this.handleFullScreen = this.handleFullScreen.bind(this);
        this.handleVolume = this.handleVolume.bind(this);
        this.updateSlider = this.updateSlider.bind(this);
    }

    handleFullScreen() {
        this.props.handleFullScreen();
    }

    handleVolume() {
        this.props.handleVolume();
    };

    componentDidMount() {
        this.props.setSlideControlUpdate(this.updateSlider);
        this.videoRef = this.props.videoRef;
    }

    setSliderValue(value) {
        this.props.setPositionAsync(this.props.player);
        this.setState({value});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {player} = nextProps;
        const value = player.position.time;
        const max = player.position.duration;
        this.setState({value, max});
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

    updateSlider(playbackStatus) {
        if (Math.abs(this.sliderValue - Number(playbackStatus.positionMillis)) < 2000) return false;
        const max = playbackStatus.durationMillis ? playbackStatus.durationMillis : 0;
        const value = playbackStatus.positionMillis ? playbackStatus.positionMillis : 0;
        this.setState({value, max});
    }

    render() {
        return (
            <View style={styles.container}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={this.state.max}
                    value={this.state.value}
                    minimumTrackTintColor="#ffcc07"
                    maximumTrackTintColor="transparent"
                    trackImage={null}
                    // thumbImage={theme.icons.play}
                    onSlidingComplete={sliderValue => this.setSliderValue(sliderValue)}
                />
                <TouchableOpacity
                    onPress={this.handleVolume}
                    style={styles.button}
                >
                    <MaterialIcons
                        name={this.props.mute ? "volume-mute" : "volume-up"}
                        size={45}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.handleFullScreen}
                    style={styles.button}
                >
                    <MaterialIcons
                        name={"fullscreen"}
                        size={45}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

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
const mapActionsToProps = ({});

export default connect(mapStateToProps, mapActionsToProps)(SliderControl);

const styles = StyleSheet.create({
    container: {
        zIndex: 4,
        backgroundColor: 'transparent',
        position: 'absolute', bottom: 0, left: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    slider: {
        height: 50,
        flex: 6,
        backgroundColor: 'transparent'
    },
    button: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    }
});

