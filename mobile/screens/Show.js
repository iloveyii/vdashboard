import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
import {theme} from '../constants';
import Player from '../components/Player';
import Header from '../components/Header';
import Container from '../components/Container';
import Footer from '../components/Footer';
import TouchImage from '../components/TouchImage';
import BaseLine from '../components/BaseLine';
import {showPopularizeAction} from "../actions/ShowAction";
import {muteAction, addPlayListAction, addPlayingNowAction} from "../actions/PlayerAction";
import {songsPopularizeAction} from "../actions/SongsAction";
import {connect} from "react-redux";
import Activity from "../components/Activity";
import Icon from 'react-native-vector-icons/AntDesign';


const {width} = Dimensions.get('window');


class Show extends React.Component {
    static navigationOptions = {
        drawerLabel: () => null
    };

    constructor(props) {
        super(props);
        this.state = {
            popular: [],
            latest: [],
            currentIndex: 0,
            player: {}, // it should be shows object @TODO
        };

        this.addPlayingNow = this.addPlayingNow.bind(this);
    }

    getTitle(title) {
        return title ? title.charAt(0).toUpperCase() + title.slice(1) : 'NA';
    }

    addPlayingNow(playingNow) {
        const {addPlayingNowAction, songsPopularizeAction, player} = this.props;
        addPlayingNowAction(playingNow);
        const show = player.playList.show;
        const id = show._id + '+' + playingNow._id;
        console.log('songsPopularizeAction id', id);
        songsPopularizeAction(id);
    }


    render() {
        const {player} = this.props;
        console.log('Show render player:', player);

        if (!player || Object.keys(player).length < 1) return <Activity/>;
        const show = player.playList.show;

        return (
            <View style={{flex: 1}}>
                <Container>
                    <Header navigation={this.props.navigation}/>

                    <View style={styles.content}>
                        <View style={styles.slideShow}>
                            <View style={styles.slider}>
                                <Player />
                            </View>
                            <BaseLine color={theme.bluish.green5}/>
                        </View>
                        <View style={{flex: 5}}>
                            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                                <View style={styles.row}>
                                    <Text
                                        style={styles.title}>Title: {show.title}</Text>
                                    <Text style={styles.paragraph}>{show.description}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.episode}>Avsnitt</Text>
                                </View>

                                <View style={styles.row}>
                                    {
                                        player.playList.map((entry, i) =>
                                            <View key={i} style={[styles.card, {flexDirection: 'row'}]}>
                                                <View style={{flex: 1, overflow: 'hidden', marginTop: 0}}>
                                                    <TouchImage noBorder={true} imageUrl={entry.image} i={i}
                                                                onPress={() => this.addPlayingNow(entry)}
                                                                opacity={i === this.state.currentIndex ? 0.3 : 1}/>
                                                </View>

                                                <View style={{flex: 1, paddingHorizontal: 10}}>
                                                    <Text
                                                        style={styles.title}>{i + 1}. {this.getTitle(entry.title)}:</Text>
                                                    <Text style={styles.episode2}>{entry.episode}</Text>
                                                    <Text style={styles.episodeCaption}>
                                                        {entry.description}
                                                    </Text>
                                                    <View style={styles.stats}>
                                                        <Icon style={styles.statsIcon} name="eyeo" />
                                                        <Text style={styles.statsText}> 23 </Text>
                                                        <Icon style={styles.statsIcon} name="staro" />
                                                        <Text style={styles.statsText}> 27 </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }

                                </View>
                            </ScrollView>
                        </View>
                    </View>

                    <Footer navigation={this.props.navigation}/>

                </Container>
            </View>
        )
    }
}

Show.defaultProps = {
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
    player: state.player
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = ({
    showPopularizeAction,
    muteAction, addPlayListAction, addPlayingNowAction,
    songsPopularizeAction
});

export default connect(mapStateToProps, mapActionsToProps)(Show);

const styles = StyleSheet.create({
    row: {
        flex: 5,
        backgroundColor: 'black',
        marginBottom: 3,
        paddingHorizontal: theme.sizes.base * 2
    },
    content: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 0
    },
    slideShow: {
        flex: 3,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    slider: {
        backgroundColor: 'black',
        // height: 170,
        flex: 1,
        width: width,
    },
    captionText: {
        fontSize: 15,
        padding: 2,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1.1,
        textAlign: 'left'
    },
    isActive: {
        color: theme.colors.textTertiary
    },
    card: {
        borderWidth: 0,
        borderColor: 'transparent',
        marginBottom: 5,
        backgroundColor: theme.bluish.blue1,
        padding: 3,
        borderRadius: theme.borderRadius
    },
    title: {
        fontSize: 17,
        fontWeight: '800',
        marginBottom: 3,
        padding: 0,
        color: theme.bluish.grey3,
        fontFamily: theme.fontFamily
    },
    paragraph: {
        textAlign: 'justify',
        color: theme.bluish.grey3,
        fontFamily: theme.fontFamily
    },
    episode: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 8,
        marginBottom: 5,
        color: theme.bluish.green1,
        fontFamily: theme.fontFamily
    },
    episode2: {
        fontSize: 14,
        fontWeight: '800',
        marginBottom: 3,
        padding: 0,
        color: theme.bluish.grey3,
        fontFamily: theme.fontFamily
    },
    episodeCaption: {
        fontSize: 12,
        color: theme.bluish.green3,
        marginBottom: 2
    },
    stats: {
        bottom: 0,
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'row'
    },
    statsIcon: {
        color: theme.bluish.green5,
        fontFamily: theme.fontFamily,
        fontSize: 13,
        width: 15,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    statsText: {
        color: theme.bluish.green5,
        fontFamily: theme.fontFamily,
        fontSize: 10,
        width: 15,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
});
