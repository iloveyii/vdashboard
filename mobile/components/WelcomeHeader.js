import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import logo from "../assets/icons/default.png";
import {theme, settings} from "../constants";

class WelcomeHeader extends React.Component {

    render() {
        return (
            <View style={styles.header}>
                <View style={styles.h1}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <View style={{color: 'green', textAlign: 'center'}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>

                                <Text style={styles.heading}>{settings.appName}</Text>

                                <Text style={styles.h2}>The place for the culture.</Text>
                            </View>
                            <Image resizeMode='contain' style={styles.logo} source={logo}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default WelcomeHeader;

const styles = StyleSheet.create({
    header: {
        height: 55,
        paddingHorizontal: theme.sizes.base * 2,
        backgroundColor: 'black',
        elevation: 3,
        borderColor: 'white',
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: theme.colors.textTertiary,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    menu: {
        flex: 1
    },
    menuIcon: {
        color: 'white'
    },
    logo: {
        width: 15,
        height: 20,
        overflow: 'visible',
        position: 'absolute',
        right: -18,
        top: 5
    },
    heading: {
        color: 'white',
        fontSize: 30,
        fontWeight: '700',
        fontFamily: 'Anton',
        padding: 0
    },
    h1: {
        flex: 5,
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    h2: {
        fontFamily: 'URW-Geometric-Medium',
        color: 'white',
        fontSize: 10,
        marginTop: -10,
        textAlign: 'center'
    }
});
