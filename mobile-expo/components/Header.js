import React from 'react';
import {Dimensions, Image, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {theme, settings} from "../constants";
import Icon from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');

class Header extends React.Component {

    render() {
        return (
            <View style={styles.header}>
                <View style={styles.drawerIconContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.openDrawer()}
                    >
                        <Icon name="bars" size={25} style={styles.menuIcon}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.appNameContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
                        style={styles.appNameContainerInner}
                    >
                        <View style={styles.appName}>
                            <View style={styles.appNameLeft}>
                                <Text style={styles.h1}>{settings.appName}</Text>
                                <Text style={styles.h2}>free to choose</Text>
                            </View>
                            <Icon name='select1' size={20} style={styles.appNameRight}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                </View>
            </View>
        )
    }
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 45,
        paddingHorizontal: theme.sizes.base * 2,
        backgroundColor: 'black',
        elevation: 3,
        borderColor: 'white',
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    drawerIconContainer: {
        flex: 1
    },
    appNameContainer: {
        flex: 5,
        paddingHorizontal: 10
    },
    appNameContainerInner: {
        flex: 1,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    appName: {
        flex: 1,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    appNameLeft: {
        flex: 4,
        paddingHorizontal: 10,
        display: 'flex',
        alignItems: 'flex-end'
    },
    appNameRight: {
        flex: 1,
        paddingHorizontal: 10,
        display: 'flex',
        fontSize: 15,
        marginTop: 7,
        color: theme.bluish.green2
    },
    menuIcon: {
        color: 'white'
    },
    h1: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Anton',
        padding: 0,
        flex: 2,
    },
    h2: {
        fontFamily: 'URW-Geometric-Medium',
        color: 'white',
        fontSize: 10,
        marginTop: 3,
        textAlign: 'center',
        flex: 1,
        marginRight: 20
    }
});
