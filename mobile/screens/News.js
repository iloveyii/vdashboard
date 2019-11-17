import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {mocks, theme} from '../constants';
import {FontAwesome} from '@expo/vector-icons';
import Header from '../components/Header';
import Container from '../components/Container';
import Footer from '../components/Footer';
import {connect} from "react-redux";
import {apiServer} from "../constants/settings";
import {songsReadAction} from "../actions/SongsAction";
const server = apiServer + '/api/v1/shows';
import { withNavigation } from "react-navigation";
import Activity from "../components/Activity";
import CachedImage from "../components/CachedImage";

const {width} = Dimensions.get('window');

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            currentIndex: 0,
        };

        this.setActive = this.setActive.bind(this);
    }

    setActive(index) {
        this.setState({currentIndex: index});
        console.log(index);
    }

    componentWillMount() {
        console.log('News componentWillMount props', this.props);
        let {latest, popular} = this.props;
        this.setState({latest, popular})
        if(! latest || latest.length < 1) {
            console.log('News componentWillMount latest is 0 therefore calling songsReadAction');
            this.props.songsReadAction();
        }
    }

    componentDidMount() {
        console.log('News componentDidMount fetching ...');
        fetch(server).then( res =>
            res.json().then(data => this.setState({latest: data, popular: data}))
        ).catch(error => {
            console.log('Some error occurred in songs fetch get');
            console.log(error);
        });
    }

    render() {

        let {latest} = this.props;
        if (! latest || latest.length < 1) return <Activity />

        return (
            <Container>
                <Header navigation={this.props.navigation}/>
                <View style={styles.content}>
                    <View style={{flex: 1, backgroundColor: 'black'}}>
                        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                            <View style={styles.latest}>
                                <Text style={styles.title}>Nyheter</Text>
                                <Text style={styles.paragraph}>Lorem ipsum dolor sit adipisicing. </Text>
                                {
                                    latest.map((entry, i) =>
                                        <View key={i} style={[styles.card, {flexDirection: 'column'}]}>
                                            <View style={{flex: 1, overflow: 'hidden'}}>

                                                <TouchableOpacity
                                                    key={`popular-${i}`}
                                                    onPress={() => {
                                                        this.setActive(i);
                                                    }}
                                                    style={{
                                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                                        borderBottomColor: theme.colors.lightBlack,
                                                        selfAlign: 'center',
                                                        marginBottom: 5
                                                    }}
                                                >
                                                    <CachedImage style={styles.episodeImage}
                                                           source={{uri: apiServer + entry.image}}/>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{flex: 1, paddingHorizontal: 10}}>
                                                <Text style={styles.title}>{i + 1}. Titl:</Text>
                                                <Text style={styles.episodeCaption}>
                                                    {entry.description}
                                                </Text>
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
        )
    }
}

News.defaultProps = {
    // latest: mocks.entries,
    // popular: mocks.entries,
};

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    latest: state.songs.latest,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = ({
    songsReadAction
});

export default connect(mapStateToProps, mapActionsToProps)(withNavigation(News));

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: theme.sizes.base * 2
    },

    list: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column'
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
        fontSize: 15,
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
        width: width - (theme.sizes.base * 4)
    },
    popular: {
        flex: 1,
        backgroundColor: 'black',
        marginLeft: 10
    },
    popularImage: {
        height: ((width - (theme.sizes.base * 8)) / 2) - 10,
        width: ((width - (theme.sizes.base * 4)) / 2) - 10,
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
        marginBottom: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.lightBlack,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        marginTop: 8,
        color: 'white',
    },
    paragraph: {
        textAlign: 'justify',
        color: 'grey'
    },
    episode: {
        fontSize: 15,
        fontWeight: '700',
        marginTop: 8,
        marginBottom: 5,
        color: 'white'
    },
    episodeImage: {
        width: (width - (theme.sizes.base * 4)),
        height: (width - (theme.sizes.base * 4)) / 2,
        overflow: 'hidden',
        flex: 1
    },
    episodeCaption: {
        fontSize: 12,
        color: theme.colors.textTertiary,
        marginBottom: 2
    },
});
