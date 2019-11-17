import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createDrawerNavigator,
    SafeAreaView,
    DrawerItems
} from 'react-navigation';
import {Image, ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from '../screens/Home';
import Show from '../screens/Show';
import News from '../screens/News';
import About from '../screens/About';
import Program from '../screens/Program';
import Contact from '../screens/Contact';
import {theme} from '../constants';
import Profile from '../components/Profile';

const CustomDrawerComponent = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <View style={{
                    height: 70,
                    backgroundColor: theme.bluish.blue3,
                    justifyContent: 'space-between',
                    flex: 1,
                    flexDirection: 'row',
                    padding: 10,
                    margin: 0
                }}>
                    <View style={{flex: 1, backgroundColor: theme.bluish.blue3}}>
                        <Icon name='select1' size={20} style={styles.logo}/>
                    </View>
                    <View style={{padding: 5, backgroundColor: 'transparent', flex: 3, flexDirection: 'row'}}>
                        <Text style={[styles.h2, {flex: 10}]}>Free to choose</Text>
                        <TouchableOpacity style={{flex: 2}} onPress={() => props.navigation.closeDrawer()}>
                            <Icon name="doubleleft" size={30} style={styles.close}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <DrawerItems {...props} activeTintColor='#2196f3' activeBackgroundColor={theme.bluish.blue1}
                             inactiveTintColor='rgba(0, 0, 0, .87)' inactiveBackgroundColor='black'
                             style={{backgroundColor: '#000000', marginTop: 0}}
                             labelStyle={{color: theme.bluish.grey3, fontFamily: theme.fontFamily}}/>
                <View style={{flex: 1}}>
                    <Profile/>
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={styles.social}>
                    <TouchableOpacity>
                        <Icon style={styles.socialIcon} name="facebook-square" size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon style={styles.socialIcon} name="instagram" size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon style={styles.socialIcon} name="youtube" size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon style={styles.socialIcon} name="twitter" size={25}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.settings}>
                    <View style={{flex: 10}}></View>
                    <TouchableOpacity style={{flex: 5, backgroundColor: 'transparent'}}>
                        <Icon style={styles.socialIcon} name="setting" size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

const AppDrawerNavigator = createDrawerNavigator({
    Home: Home,
    Show: Show,
    'Kontakta oss': Contact
}, {
    contentComponent: CustomDrawerComponent,
    screenProps: 'abc',
    style: {
        backgroundColor: theme.bluish.black1,
        fontFamily: theme.fontFamily,
        color: 'white',
        marginTop: 0,
        paddingTop: 0
    }
});
const styles = StyleSheet.create({
    logo: {
        height: 30, width: 40, backgroundColor: theme.bluish.blue3, color: theme.bluish.grey3,
        marginTop: 12
    },
    close: {
        color: theme.bluish.grey3
    },
    h2: {
        color: theme.bluish.grey3,
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 5,
        marginTop: 10,
        fontFamily: theme.fontFamily
    },
    footerContainer: {
        padding: 12,
        flexDirection: 'row'
    },
    social: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 3
    },
    settings: {
        flex: 2,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    social2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 10,
        color: 'white',
        backgroundColor: 'red'
    },
    socialIcon: {
        color: theme.bluish.grey3,
    }
});

export default createAppContainer(AppDrawerNavigator);
