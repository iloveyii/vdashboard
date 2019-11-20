import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions, Text} from 'react-native';
import {theme} from '../constants';
import {connect} from "react-redux";
import {login} from '../constants/settings';

const {width} = Dimensions.get('window');

class Profile extends Component {
    componentDidMount() {
        console.log('Profile componentDidMount props', this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('Profile componentWillReceiveProps props ', nextProps);
    }

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
