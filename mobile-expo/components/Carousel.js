import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {theme} from '../constants';

import YellowBox from './YellowBox';
import BaseLine from './BaseLine';
import Activity from './Activity';
import {MaterialIcons} from '@expo/vector-icons';
import {apiServer} from "../constants/settings";
import CachedImage from "./CachedImage";

const {width} = Dimensions.get('window');

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.changeIndex = this.changeIndex.bind(this);
        this.state = {
            currentIndex: 0,
            episodes: [],
        };
    }

    changeIndex() {
        let {currentIndex, episodes} = this.state;
        if (episodes.length < 1) return false;
        currentIndex = currentIndex < (episodes.length - 1) ? currentIndex + 1 : 0;
        this.setState({currentIndex});
    }

    componentDidMount() {
        const {shows} = this.props;
        const episodes = shows ? this.extractEpisodes(shows) : [];
        this.setState({episodes});
        setInterval(() => {
            this.changeIndex();
        }, 5000, this);
    }

    extractEpisodes(shows) {
        let episodes = [];
        shows.map(show => episodes = episodes.concat(show.episodes));
        return episodes.slice(0, 10);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {shows} = nextProps;
        const episodes = shows ? this.extractEpisodes(shows) : [];
        this.setState({episodes});
    }

    handlePrevious() {
        let {currentIndex, episodes} = this.state;
        currentIndex = currentIndex === 0 ? episodes.length - 1 : currentIndex - 1;
        this.setState({currentIndex});
    }

    handleNext() {
        let {currentIndex, episodes} = this.state;
        currentIndex = currentIndex === (episodes.length - 1) ? 0 : currentIndex + 1;
        this.setState({currentIndex});
    }

    renderControls() {
        return (
            <View style={styles.controls}>
                <TouchableOpacity
                    onPress={this.handlePrevious}
                >
                    <MaterialIcons
                        name={"chevron-left"}
                        size={50}
                        color="white"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.handleNext}
                >
                    <MaterialIcons
                        name={"chevron-right"}
                        size={50}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let {currentIndex, episodes} = this.state;
        if (episodes && episodes.length < 1) return <Activity/>

        return (
            <View style={styles.slideShow}>
                <View style={styles.slider}>
                    <CachedImage style={styles.sliderImage}
                                 source={{uri: episodes[currentIndex].image}}/>
                    <YellowBox captionText={episodes[currentIndex].description} itemsCount={episodes.length}
                               currentIndex={currentIndex}/>
                </View>
                {this.renderControls()}
                <BaseLine color="white"/>
            </View>
        )
    }
}

export default Carousel;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 33,
        alignItems: 'center',
    },
    header: {
        height: 70,
        paddingHorizontal: theme.sizes.base * 2,
        backgroundColor: 'black',
        elevation: 3
    },
    urbanTv: {
        height: theme.sizes.base * 3.2,
        width: width - (theme.sizes.base * 10),
        overflow: 'visible'
    },
    content: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: theme.sizes.base * 2
    },
    slideShow: {
        flex: 2,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    programList: {
        flex: 3,
        backgroundColor: 'black',
        flexDirection: 'row'
    },
    footer: {
        borderColor: '#c1c1c1',
        borderTopWidth: 1,
        height: 60,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: theme.sizes.base * 2,
    },
    slider: {
        backgroundColor: 'yellow',
        flex: 1,
        width: width - (theme.sizes.base * 4),
    },
    sliderImage: {
        height: width - theme.sizes.base * 8,
        width: width - (theme.sizes.base * 4),
        overflow: 'hidden',
        flex: 1
    },
    sliderCaption: {
        backgroundColor: '#ffcc07',
        padding: 4,
        position: 'absolute',
        right: 10,
        bottom: 10,
        flex: 1,

    },
    keywordBox: {
        backgroundColor: 'black',
        marginBottom: 1,
        borderColor: 'green',
        borderWidth: 1,
        flexWrap: 'wrap',
        flex: 1,
        overflow: 'hidden'
    },
    captionText: {
        fontSize: 5,
        padding: 2,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1.1,
        textAlign: 'left'
    },
    latestButton: {},
    isActive: {
        color: theme.colors.textTertiary
    },
    latest: {
        flex: 1,
        backgroundColor: 'black',
        marginRight: 10,
    },
    popular: {
        flex: 1,
        backgroundColor: 'black',
        marginLeft: 10
    },
    popularImage: {
        height: (width - (theme.sizes.base * 8)) / 2,
        width: (width - (theme.sizes.base * 4)) / 2,
        overflow: 'hidden',
        flex: 1
    },
    popularCaption: {
        fontSize: 5,
        color: theme.colors.textTertiary,
        paddingHorizontal: 3,
        marginBottom: 2
    },
    card: {
        borderColor: theme.colors.gray2,
        borderWidth: 0,
        marginBottom: 8
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
        zIndex: 5
    },
});
