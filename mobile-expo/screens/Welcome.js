import React from 'react';
import {Dimensions, StyleSheet, View, Button, Text, TouchableOpacity, TextInput, ScrollView, Modal} from 'react-native';
import {theme} from '../constants';
import {FontAwesome} from '@expo/vector-icons';
import WelcomeHeader from '../components/WelcomeHeader';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import {facebookLoginSuccessAction} from "../actions/LoginAction";
import {connect} from "react-redux";
import Stored from '../navigation/Stored';
import Logo from '../components/Logo';
import * as settings from '../constants/settings';
import YellowButton from "../components/YellowButton";

// Initialize Firebase
const firebaseConfig = {
    // ADD YOUR FIREBASE CREDENTIALS
    apiKey: "AIzaSyALOEpzs8GNlqmxGsOyNtT2P3AopFoBUL0",
    authDomain: "",
    databaseURL: "",
    projectId: "urbantv-62774",
    storageBucket: "",
};
firebase.initializeApp(firebaseConfig);

const {width} = Dimensions.get('window');


class Welcome extends React.Component {
    /* static navigationOptions = {
        header: null
    }; */

    static navigationOptions = {
        drawerLabel: () => null
    };

    constructor(props) {
        super(props);
        this.fbLogin = this.fbLogin.bind(this);
        this.googleLogin = this.googleLogin.bind(this);
        this.state = {
            login: {
                facebook: settings.login.NOT_LOGGED_IN,
                google: false,
                user: {}
            },
            showManual: false,
            showPrivacyPolicy: false
        };
        this.showManual = this.showManual.bind(this);
        this.logIn = this.logIn.bind(this);
        this.renderPrivacyPolicy = this.renderPrivacyPolicy.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('Welcome componentWillReceiveProps')
    }

    renderPrivacyPolicy() {
        return (
            <Modal animationType="slide" visible={this.state.showPrivacyPolicy}
                   onRequestClose={() => this.setState({showPrivacyPolicy: false})}
                   style={{backgroundColor: theme.colors.lightGrey}}
            >
                <View style={{padding: 30, backgroundColor: theme.colors.lightGrey, flex: 1}}>
                    <Text>Privacy policy</Text>
                    <ScrollView>
                        <Text> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci at
                            consequuntur, enim error ex iusto minus nulla possimus quis rerum sequi velit voluptatum.
                            Cumque illo repellendus repudiandae vel voluptates.
                        </Text>

                        <Text> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci at
                            consequuntur, enim error ex iusto minus nulla possimus quis rerum sequi velit voluptatum.
                            Cumque illo repellendus repudiandae vel voluptates.
                        </Text>

                        <Text> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci at
                            consequuntur, enim error ex iusto minus nulla possimus quis rerum sequi velit voluptatum.
                            Cumque illo repellendus repudiandae vel voluptates.
                        </Text>

                        <Button title="I agree" onPress={() => this.setState({showPrivacyPolicy: false})}></Button>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    showManual() {
        const showManual = true;
        this.setState({showManual});
    }

    /**
     * Login listener
     */
    setListener() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                console.log('Auth user: ', user);
                const service = user.email ? 'google' : 'facebook'; // which service was used
                // Prepare state variable
                const login = {
                    facebook: service === 'facebook' ? settings.login.LOGIN_SUCCESS : settings.login.NOT_LOGGED_IN,
                    google: service === 'google' ? settings.login.LOGIN_SUCCESS : settings.login.NOT_LOGGED_IN,
                    user
                };
                setTimeout(() => {
                    this.setState({login});
                    console.log('setListener would have got event in 1.5 secs', login);
                    this.setState({login});
                    this.props.facebookLoginSuccessAction(login);
                }, 1500, this);
            }
        });
    }

    logIn() {
        const login = {
            manual: settings.login.LOGIN_STARTED,
        };
        this.setState({login});
    }

    async googleLogin() {
        const login = {
            facebook: settings.login.NOT_LOGGED_IN,
            google: settings.login.LOGIN_STARTED,
        };
        this.setState({login});
        const {type, accessToken, user} = await Google.logInAsync({
            behavior: 'web',
            iosClientId: '675693128505-tl220p6ld0kv22h66sk4i5gjn4b9g5op.apps.googleusercontent.com',
        });

        if (type === 'success') {
            console.log('User logged in from google', user);

            const login = {
                facebook: settings.login.NOT_LOGGED_IN,
                google: settings.login.LOGIN_SUCCESS,
                user
            };
            setTimeout(() => {
                this.setState({login});
                this.props.facebookLoginSuccessAction(login);
            }, 1500, this);
        }
    }

    async fbLogin() {
        const login = {
            facebook: settings.login.LOGIN_STARTED,
            google: false,
        };
        this.setState({login});

        const appId = '454426711781312';
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            appId,
            {permissions: ['public_profile']},
        );

        if (type === 'success' && token) {
            console.log('Login success');
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credential).catch(error => {
                console.log(error);
            });
            this.setListener();
        } else {
            console.log('Login failed');
        }
    }


    render() {
        return (
            this.state.login.facebook === settings.login.LOGIN_SUCCESS
            || this.state.login.google === settings.login.LOGIN_SUCCESS
                //|| true
                ? <Stored login={this.state.login}/>
                : <View style={styles.container}>
                    <WelcomeHeader/>
                    <View style={styles.content}>

                        <View style={styles.logIn}>
                            <Text style={{fontSize: 30, color: 'white', flex: 1, fontFamily: 'URW-Geometric-Medium'}}>Logga
                                in</Text>
                            <View style={{flex: 1}}>
                                {
                                    this.state.login.facebook === settings.login.LOGIN_STARTED
                                    || this.state.login.google === settings.login.LOGIN_STARTED
                                    || this.state.login.manual === settings.login.LOGIN_STARTED
                                        ? <Logo size={4}/>
                                        : null
                                }
                            </View>
                        </View>

                        <View style={styles.social}>
                            <TouchableOpacity onPress={this.fbLogin}>
                                <Text style={styles.facebook}>
                                    <FontAwesome
                                        name="facebook-official"
                                        size={20}
                                        color={theme.colors.white}
                                    />
                                    &nbsp; Logga in med facebook
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.googleLogin}>
                                <Text style={styles.gmail}>
                                    <FontAwesome
                                        name="google"
                                        size={20}
                                        color={theme.colors.white}
                                    />
                                    &nbsp; Logga in med gmail
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.register}>
                            <TouchableOpacity onPress={this.showManual}>
                                <Text style={{fontSize: 20, color: 'white', fontFamily: 'URW-Geometric-Medium'}}>Manuell
                                    registrering</Text>
                            </TouchableOpacity>
                            {
                                this.state.showManual
                                    ? <View>
                                        <TextInput
                                            style={{
                                                height: 35,
                                                borderColor: theme.colors.lightGrey,
                                                borderWidth: StyleSheet.hairlineWidth,
                                                color: 'white',
                                                paddingLeft: 5,
                                                marginTop: 6,
                                                fontFamily: 'URW-Geometric-Medium'
                                            }}
                                            onChangeText={(email) => this.setState({email})}
                                            placeholder="Fill i din mail här"
                                            placeholderTextColor={theme.colors.gray}
                                        />
                                        <TextInput
                                            style={{
                                                height: 35,
                                                borderColor: theme.colors.lightGrey,
                                                borderWidth: StyleSheet.hairlineWidth,
                                                color: 'white',
                                                paddingLeft: 5,
                                                marginTop: 4,
                                                fontFamily: 'URW-Geometric-Medium'
                                            }}
                                            onChangeText={(email) => this.setState({email})}
                                            placeholder="Lösenord"
                                            placeholderTextColor={theme.colors.gray}
                                        />

                                        <YellowButton i={1} style={{marginTop: 10}} label="Logga in"
                                                      onPress={this.logIn}/>
                                        <Text style={{
                                            fontSize: 15,
                                            color: 'white',
                                            paddingTop: 10,
                                            fontFamily: 'URW-Geometric-Medium'
                                        }}>I agree to terms of use </Text>

                                        <TouchableOpacity onPress={() => this.setState({showPrivacyPolicy: true})}>
                                            <Text style={{
                                                fontSize: 15,
                                                color: 'white',
                                                paddingTop: 8,
                                                fontFamily: 'URW-Geometric-Medium'
                                            }}>* Privacy policy </Text>
                                        </TouchableOpacity>
                                        {this.renderPrivacyPolicy()}
                                    </View>
                                    : null
                            }
                        </View>
                    </View>


                    <View style={styles.footer}></View>

                </View>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    login: state.login
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = ({
    facebookLoginSuccessAction
});

export default connect(mapStateToProps, mapActionsToProps)(Welcome);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 33,
        alignItems: 'center'
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.sizes.base * 2,
        backgroundColor: 'transparent',
        width: width - theme.sizes.base * 6
    },
    logIn: {
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    social: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    facebook: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'URW-Geometric-Medium'
    },
    gmail: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'URW-Geometric-Medium'
    },
    register: {
        fontSize: 20,
        color: 'white',
        flex: 3,
        backgroundColor: 'transparent',
        paddingTop: 10,
        flexDirection: 'column',
    },
    footer: {
        borderColor: theme.colors.textTertiary,
        borderTopWidth: StyleSheet.hairlineWidth,
        height: 55,
        width: width / 4,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: theme.sizes.base * 2,
    }
});
