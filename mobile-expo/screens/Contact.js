import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Image,
    Dimensions,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import {theme} from '../constants';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from "../components/Header";
import Icon from 'react-native-vector-icons/Entypo';
import Text from '../components/Text';
import {apiServer} from "../constants/settings";
import {connect} from "react-redux";

const {width} = Dimensions.get('window');

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    render() {
        const {songs} = this.props;

        return (
            <View style={{flex: 1}}>
                <Container>
                    <Header navigation={this.props.navigation}/>
                    <KeyboardAvoidingView style={styles.content} behavior="padding">
                        <View style={styles.row}>
                            <View style={styles.column1}>
                                <Text style={styles.title}>Kontakta oss</Text>
                                <Text style={styles.h2}>Email:</Text>
                                <Text style={styles.paragraph}>contakt@example.com</Text>
                                <View style={styles.social}>
                                    <TouchableOpacity>
                                        <Icon style={styles.socialIcon} name="facebook-with-circle" size={25}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon style={styles.socialIcon} name="instagram-with-circle" size={25}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon style={styles.socialIcon} name="youtube-with-circle" size={25}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon style={styles.socialIcon} name="twitter-with-circle" size={25}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.column2}>
                                <View style={{flex: 1}}></View>
                                <Image resizeMode='cover' style={styles.teamImage}
                                       source={{uri: songs[0].image}}/>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={{width: '100%'}}>
                                <Text style={styles.paragraph}>Få Urban Tv Nyheter & inbjudningar direkt till din
                                    mail.</Text>
                                <Text style={styles.paragraph}>Prenumerera på varan nyhetsbrev.</Text>
                                <TextInput
                                    style={{
                                        height: 35,
                                        borderColor: theme.colors.lightGrey,
                                        borderWidth: 1,
                                        color: 'white',
                                        paddingLeft: 5,
                                        marginTop: 4
                                    }}
                                    onChangeText={(email) => this.setState({email})}
                                    placeholder="Fill i din mail här"
                                />
                                <Text style={[styles.paragraph, {marginTop: 15}]}>Privacy policy</Text>
                            </View>

                        </View>
                    </KeyboardAvoidingView>

                    <Footer navigation={this.props.navigation}/>
                </Container>
            </View>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    songs: state.shows.list[0].episodes,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = ({});

export default connect(mapStateToProps, mapActionsToProps)(Contact);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 33
    },
    content: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: theme.sizes.base * 2,
        width: width
    },
    row: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginBottom: 10
    },
    column1: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    column2: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'baseline',
        paddingTop: 20,
        flexDirection: 'row'
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
        width: (width - (theme.sizes.base * 4)) / 3,
        height: (width - (theme.sizes.base * 4)) / 3,
        flex: 10
    },
    social: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 10,
        color: 'white',
    },
    socialIcon: {
        color: 'white',
    }
});
