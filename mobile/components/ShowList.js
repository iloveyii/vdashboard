import React from 'react';
import {Dimensions, StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {mocks, theme} from "../constants";
import {connect} from "react-redux";
import TouchImage from "./TouchImage";

const {width} = Dimensions.get('window');

class ShowList extends React.Component {

    getTitle(title) {
        return title ? title.charAt(0).toUpperCase() + title.slice(1) : 'NA';
    }

    render() {
        let {latest, defaultLatest} = this.props;
        if (latest.length < 1) {
            latest = defaultLatest;
            console.log('ShowList Inside render defaultLatest', defaultLatest);
        }

        return (
            <View style={styles.row}>
                {
                    latest.map((entry, i) =>
                        <View key={i} style={[styles.card, {flexDirection: 'row'}]}>
                            <View style={{flex: 1, overflow: 'hidden', marginTop: 5}}>
                                <TouchImage imageUrl={entry.image} i={i} onPress={this.props.setActive}
                                            opacity={i === this.props.currentIndex ? 0.3 : 1}/>
                            </View>

                            <View style={{flex: 1, paddingHorizontal: 10}}>
                                <Text
                                    style={styles.title}>{i + 1}. {this.getTitle(entry.title)}:</Text>
                                <Text style={styles.episodeCaption}>
                                    {entry.description}
                                </Text>
                            </View>
                        </View>
                    )
                }
            </View>
        );
    }
}

ShowList.defaultProps = {
    url: 'http://softhem.se/vids/eliman.mp4',
    defaultLatest: mocks.entries
};

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    posts: state.posts,
    latest: state.songs,
    popular: (state) =>  state.popular.sort((a, b) => Number(a.popular) - Number(b.popular))
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = ({});

export default connect(mapStateToProps, mapActionsToProps)(ShowList);

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
        marginBottom: 2
    },
    title: {
        fontSize: 17,
        fontWeight: '800',
        marginBottom: 3,
        padding: 0,
        color: 'white',
    },
    paragraph: {
        textAlign: 'justify',
        color: 'grey'
    },
    episode: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 8,
        marginBottom: 5,
        color: 'white'
    },
    episodeCaption: {
        fontSize: 12,
        color: theme.colors.textTertiary,
        marginBottom: 2
    },
});
