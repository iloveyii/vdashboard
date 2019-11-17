import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput
} from 'react-native';
import {mocks, theme} from '../constants';
import {FontAwesome} from '@expo/vector-icons';
import {entries} from '../constants/mocks';
import Header from '../components/Header';
import Container from '../components/Container';
import Footer from '../components/Footer';
import {MaterialIcons} from '@expo/vector-icons';
import {connect} from "react-redux";
import Activity from '../components/Activity';
import {apiServer} from "../constants/settings";
import CachedImage from "../components/CachedImage";

const {width} = Dimensions.get('window');

class Program extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            currentIndex: 0,
            searchFocus: false
        };

        this.setActive = this.setActive.bind(this);
        this.handleSearchPress = this.handleSearchPress.bind(this);
    }

    handleSearchPress() {
        this.setState({searchFocus: true});
    }

    setActive(index) {
        this.setState({currentIndex: index});
        console.log(index);
    }

    render() {
        let {latest} = this.props;
        if (! latest || latest.length < 1) return <Activity />
        /* if (latest.length < 1) {
            latest = defaultLatest;
            console.log('Program Inside render defaultLatest', defaultLatest);
        } */

        return (
            <Container>
                <Header navigation={this.props.navigation}/>
                <View style={styles.content}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
                            <View style={{flex: 2}}><Text style={styles.title}>Program</Text></View>

                            <View style={{
                                flex: this.state.searchFocus ? 2 : 1,
                                flexDirection: 'row',
                                borderColor: 'gray',
                                borderWidth: StyleSheet.hairlineWidth,
                                borderRadius: 2
                            }}>
                                <TextInput
                                    style={{
                                        flex: 1,
                                        height: 35,
                                        borderColor: 'transparent',
                                        borderWidth: 0,
                                        color: 'white',
                                        paddingLeft: 5
                                    }}
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}
                                />
                                <TouchableOpacity
                                    onPress={this.handleSearchPress}
                                >
                                    <MaterialIcons
                                        name={"search"}
                                        size={30}
                                        color="white"
                                        style={{marginTop: 4}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                            <View style={styles.latest}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between'
                                }}>
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
                                                            borderBottomColor: theme.colors.darkGrey,
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
                                                        {entry.captionText}
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                </View>

                <Footer navigation={this.props.navigation}/>

            </Container>
        )
    }
}

Program.defaultProps = {
    defaultLatest: mocks.entries
};


/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    songs: state.songs.latest,
    latest: state.songs.latest
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = ({});

export default connect(mapStateToProps, mapActionsToProps)(Program);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: theme.sizes.base * 2
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
    latest: {
        flex: 1,
        width: width - (theme.sizes.base * 4)
    },
    card: {
        borderColor: theme.colors.darkGrey,
        borderWidth: 1,
        marginBottom: 8,
        width: ((width - (theme.sizes.base * 4)) / 2) - 4
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
