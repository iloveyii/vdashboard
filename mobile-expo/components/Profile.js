import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions, Text} from 'react-native';
import {theme} from '../constants';
import {connect} from "react-redux";
import {login} from '../constants/settings';
import axios from 'axios';
import * as settings from "../constants/settings";

const server = settings.apiServer + '/api/v1/login-with-id/';

const {width} = Dimensions.get('window');

class Profile extends Component {
    componentDidMount() {
        console.log('Profile componentDidMount props', this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('Profile componentWillReceiveProps props ', nextProps);
        const {login} = nextProps;
        if (login.facebook && login.facebook === 2) {
            console.log('Profile componentWillReceiveProps login to system with fb ', login.facebook);
            this.loginToSystem(login.user.uid);
        } else {
            console.log('Profile componentWillReceiveProps login to system with google ', login.google);
            this.loginToSystem(login.user.id);
        }
    }

    loginToSystem = (id) => {
        axios.get(server+id).then(res => {
            console.log('Inside Profile login with id.', server, res.data);
            return res.data;
        }).catch(error => console.log(error));
    };

    render() {
        console.log('Profile render');
        let data = null;

        // Facebook login
        if (this.props.login && this.props.login.facebook === login.LOGIN_SUCCESS && login.LOGIN_SUCCESS && this.props.login.user && this.props.login.user && this.props.login.user.providerData[0]) {
            data = {
                name: this.props.login.user.providerData[0].displayName,
                photoUrl: this.props.login.user.providerData[0].photoURL
            };
        } else if (this.props.login && this.props.login.google === login.LOGIN_SUCCESS && this.props.login.user && this.props.login.user.givenName) {
            data = {
                name: this.props.login.user.givenName,
                photoUrl: this.props.login.user.photoUrl
            };
        }

        return (
            <View style={styles.container}>
                {
                    data
                        ? <Image style={styles.profile} source={{uri: data.photoUrl}}/>
                        : null
                }
                {
                    data
                        ? <Text>{data.name}</Text>
                        : null
                }

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
const mapActionsToProps = ({});

export default connect(mapStateToProps, mapActionsToProps)(Profile);


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profile: {
        width: width / 5,
        height: width / 5,
        margin: theme.sizes.base * 2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.lightBlack,
        borderRadius: 2
    }
});

const fb =
    {
        "login": {
            "facebook": 2,
            "google": 0,
            "user": {
                "apiKey": "AIzaSyALOEpzs8GNlqmxGsOyNtT2P3AopFoBUL0",
                "appName": "[DEFAULT]",
                "authDomain": null,
                "createdAt": "1562315196929",
                "displayName": "Hazrat Ali",
                "email": null,
                "emailVerified": false,
                "isAnonymous": false,
                "lastLoginAt": "1574845733211",
                "phoneNumber": null,
                "photoURL": "https://graph.facebook.com/876051482774872/picture",
                "providerData": [
                    {
                        "displayName": "Hazrat Ali",
                        "email": null,
                        "phoneNumber": null,
                        "photoURL": "https://graph.facebook.com/876051482774872/picture",
                        "providerId": "facebook.com",
                        "uid": "876051482774872",
                    },
                ],
                "redirectEventId": null,
                "stsTokenManager": {
                    "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjRhOWEzMGI5ZThkYTMxNjY2YTY3NTRkZWZlZDQxNzQzZjJlN2FlZWEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGF6cmF0IEFsaSIsInBpY3R1cmUiOiJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS84NzYwNTE0ODI3NzQ4NzIvcGljdHVyZSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS91cmJhbnR2LTYyNzc0IiwiYXVkIjoidXJiYW50di02Mjc3NCIsImF1dGhfdGltZSI6MTU3NDg0NTczMywidXNlcl9pZCI6Imw1eVhZRDQ0NEFPRE1hMEgwSEhZWVBneUZsYTIiLCJzdWIiOiJsNXlYWUQ0NDRBT0RNYTBIMEhIWVlQZ3lGbGEyIiwiaWF0IjoxNTc0ODQ1NzMzLCJleHAiOjE1NzQ4NDkzMzMsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZmFjZWJvb2suY29tIjpbIjg3NjA1MTQ4Mjc3NDg3MiJdfSwic2lnbl9pbl9wcm92aWRlciI6ImZhY2Vib29rLmNvbSJ9fQ.RO-RsIQUBtVjzWj036pWo928u7ps6s-OBYPf9gyoH282TarcTRltnzyllCSzf3eMXfndt_auPiFRssA5r59or3AOgpw1o-9a1CXkP4x_kS6sT4y0UPAPRx32E6a_XBDTMPXFrjPc50SF0KiAtGhoObaDFjykh2C3ciI_P1CKIpNwxH62aT8XVOYZhqXbZydl_N_e-TZ_bEWmTdQzlC-F0H-8xptJ2falbGKjKChhbqvCf3lWIFrKOyTVpvLcAGYvyOg6BA7ij1La78WBRUQx8j_ClacN9UJHS0eRi5jflAzkwYg_o-oc6fJhFQPk-FwxsmTfYJEUIDG48Ie5igXjow",
                    "apiKey": "AIzaSyALOEpzs8GNlqmxGsOyNtT2P3AopFoBUL0",
                    "expirationTime": 1574849333288,
                    "refreshToken": "AEu4IL2YGkEMfq2bW_7MqtPdwhqn0FnCGzi3pThC7QA0BPcpT0KpKQVz_kJoJzAXFx7OxpPcRo-Q3s26bfQEOv3GiZ_DDwzNGZZFwccGCqx4OWuT4IKfMlKZDd-Y5i_VcmvWiAYYb10rOa8NormKKVU36K3j0WrL7YVmjjJRa5dTKvY1g_z5KuUzKmU5Lc2tZiSM9N7zQEjBOTYStvPH6LvOIWIzAcugg1Wg6HAEbDoWHwxfk6fG2oD0CfZUkIiveRFV0wQ3Vy7aC4VsMxrnXR-rHHvea2gJyVfsQa6Lt4pcyw620yGKkNQxKAHXUFI3teyC0u9L_nVu",
                },
                "tenantId": null,
                "uid": "l5yXYD444AODMa0H0HHYYPgyFla2",
            },
        },
    };

const gogle = {
    "login": {
        "facebook": 0,
        "google": 2,
        "user": {
            "email": "ali.fly2020@gmail.com",
            "familyName": "Ali",
            "givenName": "Hazrat",
            "id": "105719976401241777311",
            "name": "Hazrat Ali",
            "photoUrl": "https://lh3.googleusercontent.com/a-/AAuE7mAvdC5-CG-d276nbjSXZt7kEQqK5ykoLUFnK9CTRA",
        },
    },
};
