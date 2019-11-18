import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {mocks, theme} from '../constants';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from "../components/Header";
import Text from "../components/Text";
import { connect } from "react-redux";
import {apiServer} from "../constants/settings";
import Activity from "../components/Activity";
import CachedImage from "../components/CachedImage";

const {width} = Dimensions.get('window');

class About extends React.Component {

    render() {
        /* let {defaultLatest, latest} = this.props;
        if (latest.length < 1) {
            latest = defaultLatest;
            console.log('About Inside render defaultLatest', defaultLatest);
        } */

        let {latest} = this.props;
        if (! latest || latest.length < 1) return <Activity />

        return (
            <View style={{flex: 1}}>
                <Container>
                    <Header navigation={this.props.navigation}/>
                    <View style={styles.content}>
                        <Text style={styles.title}>Om oss</Text>
                        <Text style={styles.h2}>Vi är Urban Tv</Text>
                        <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                            debitis eum ex id illum impedit iste labore laborum nihil, non placeat quis recusandae
                            repellat
                            totam unde ut vero vitae!</Text>
                        <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                            tempora, ut. Ab cum dolore iste quibusdam! Amet, asperiores culpa cupiditate deserunt et
                            excepturi officia quaerat quibusdam rem veritatis? Error, quos.</Text>

                        <Text style={styles.h2}>Definition av Urban Tv</Text>
                        <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
                            asperiores debitis dicta distinctio eaque error est et exercitationem neque, nostrum
                            perspiciatis quasi quis quod reiciendis sapiente, soluta, temporibus velit
                            voluptatem.</Text>

                        <Text style={styles.h2}>Team</Text>
                        <View style={styles.card}>
                            {
                                latest.slice(0,3).map((entry, i) =>
                                    <View key={i} style={styles.teamImage}>
                                        <CachedImage style={styles.teamImage}
                                               source={{uri: apiServer + entry.image}} />
                                    </View>)
                            }

                        </View>
                    </View>

                    <Footer navigation={this.props.navigation}/>
                </Container>
            </View>
        )
    }
}

About.defaultProps = {
    // defaultLatest: mocks.entries
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
});

export default connect(mapStateToProps, mapActionsToProps)(About);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 33
    },
    navBar: {
        height: 55,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderColor: '#c1c1c1',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        width: 98,
        height: 22
    },
    rightNav: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    rightNavItem: {
        marginLeft: 25
    },
    tabBar: {
        borderColor: '#c1c1c1',
        borderTopWidth: 1,
        height: 60,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        width: width - (theme.sizes.base * 0)
    },
    tabItem: {},
    tabTitle: {
        fontSize: 11,
        color: '#3c3c3c'
    },
    content: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: theme.sizes.base * 2,
        width: width
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 10
    },
    h2: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 5,
        marginTop: 10
    },
    paragraph: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'justify',
        lineHeight: 20
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        bottom: 0
    },
    teamImage: {
        borderColor: theme.colors.textTertiary,
        borderWidth: StyleSheet.hairlineWidth,
        width: (width - (theme.sizes.base * 4)) / 4,
        height: (width - (theme.sizes.base * 4)) / 4
    }
});
