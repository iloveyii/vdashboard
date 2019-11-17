import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View, Text} from 'react-native';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

import {theme} from '../constants';
import Carousel from '../components/Carousel';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TouchImage from '../components/TouchImage';
import YellowButton from '../components/YellowButton';
import More from '../components/More';
import Activity from '../components/Activity';

import {postsReadAction} from '../actions/PostsAction';
import {songsReadAction} from '../actions/SongsAction';
import {showFindAction} from '../actions/ShowAction';
import {muteAction, addPlayListAction, addPlayingNowAction} from "../actions/PlayerAction";


const {width} = Dimensions.get('window');

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            latest: [],
            popular: [],
            countShowingItemsLatest: 2,
            countShowingItemsPopular: 2,
            latestShows: {},
            popularShows: {}
        };
        this.handleWatchEpisodes = this.handleWatchEpisodes.bind(this);
        this.increaseShowingItems = this.increaseShowingItems.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {latest, popular} = nextProps;
        console.log('Home componentWillReceiveProps', latest);
        this.setState({latest, popular});
    }

    componentWillMount() {
        const {latest, popular, login, songsReadAction} = this.props;
        console.log('Home componentWillMount - entries count, login :  ', latest);
        if (!latest || latest.length === 0) {
            songsReadAction();
        } else {
            this.setState({latest, popular});
        }
    }

    handleWatchEpisodes(show, latestOrPopular) {
        const {navigation, addPlayListAction, addPlayingNowAction} = this.props;
        let playList = show.episodes;
        playList.show = {
            _id: show._id,
            title: show.title,
            description: show.description
        };
        addPlayListAction(playList);
        addPlayingNowAction(playList[0]);
        navigation.navigate('Show', {});
    }

    increaseShowingItems(listName) {
        console.log('increaseShowingItems', listName);
        const {countShowingItemsLatest, countShowingItemsPopular} = this.state;
        console.log(countShowingItemsLatest, countShowingItemsPopular);
        const {latest} = this.props;
        if (latest.length && listName === 'latest') {
            this.setState({countShowingItemsLatest: countShowingItemsLatest + 3});
        } else {
            this.setState({countShowingItemsPopular: countShowingItemsPopular + 3});
        }
    }

    sortByViews = (latest) => {
        const popular = latest.slice();
        popular.sort((a, b) => {
            let v1 = a.views ? Number(a.views) : 0;
            let v2 = b.views ? Number(b.views) : 0;
            if (v1 > v2) {
                return -1;
            }

            if (v1 < v2) {
                return 1;
            }

            return 0;
        });

        return popular;
    };

    render() {
        let {latest} = this.state;
        if (!latest || latest.length < 1) return <Text>{JSON.stringify(latest)}</Text>
        const popular = this.sortByViews(latest);

        return (
            <Container>
                <Header navigation={this.props.navigation}/>
                <View style={styles.content}>
                    <Carousel shows={latest}/>
                    <View style={styles.programList}>
                        <View style={styles.latest}>
                            <YellowButton i={1} label="Senaste" onPress={() => null}/>
                            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                                {
                                    latest.map(show =>
                                        <View key={show._id + 'view'} style={styles.card}>
                                            <TouchImage captionText={show.title} i={show._id}
                                                        imageUrl={show.episodes[0].image}
                                                        onPress={() => this.handleWatchEpisodes(show, 'latest')}/>
                                            <View style={{
                                                flex: 1,
                                                alignItems: 'center'
                                            }}>
                                            </View>
                                        </View>
                                    )
                                }

                                {
                                    this.state.countShowingItemsLatest < this.props.latest.length
                                        ? <More label="Mer" onPress={() => this.increaseShowingItems('latest')}/>
                                        : null
                                }
                            </ScrollView>

                        </View>
                        <View style={styles.popular}>
                            <YellowButton i={1} label="Populärt" onPress={() => null}/>
                            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                                {
                                    popular.map(show =>
                                        <View key={show._id + 'view'} style={styles.card}>
                                            <TouchImage captionText={show.title} i={show._id}
                                                        imageUrl={show.episodes[0].image}
                                                        popular={show.views ? show.views : 1}
                                                        onPress={() => this.handleWatchEpisodes(show, 'popular')}/>
                                            <View style={{
                                                flex: 1,
                                                alignItems: 'center'
                                            }}>
                                            </View>
                                        </View>
                                    )
                                }
                                {
                                    this.state.countShowingItemsPopular < this.props.popular.length
                                        ? <More label="Mer" onPress={() => this.increaseShowingItems('popular')}/>
                                        : null
                                }
                            </ScrollView>
                        </View>
                    </View>
                </View>

                <Footer navigation={this.props.navigation}/>
            </Container>
        )
    }
}

Home.defaultProps = {
    // latest: mocks.entries,
    // popular: mocks.entries
};

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    latest: state.shows.list,
    popular: state.shows.list,
    login: state.login
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = ({
    postsReadAction,
    songsReadAction,
    showFindAction,
    muteAction, addPlayListAction, addPlayingNowAction
});

export default connect(mapStateToProps, mapActionsToProps)(withNavigation(Home));

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
