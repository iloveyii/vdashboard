import React from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {theme} from '../constants';
import Text from './Text';


const {width} = Dimensions.get('window');

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.handleTouch = this.handleTouch.bind(this);
    }

    handleTouch(screen) {
        this.props.navigation.navigate(screen);
    }


    render() {
        return (
            <View style={styles.tabBar}>
                <TouchableHighlight
                    onPress={() => this.handleTouch('Home')}
                    style={styles.section}
                >
                    <View style={styles.button}>
                        <Icon style={styles.tabItem} name="home" size={32}/>
                        <Text style={styles.tabTitle}>Home</Text>
                    </View>

                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => this.handleTouch('Kontakta oss')}
                    style={styles.section}
                >
                    <View style={styles.button}>
                        <Icon style={styles.tabItem} name="contacts" size={32}/>
                        <Text style={styles.tabTitle}>Contact</Text>
                    </View>

                </TouchableHighlight>
            </View>
        )
    }
}

export default Footer;

const styles = StyleSheet.create({
    tabBar: {
        borderColor: theme.bluish.blue5,
        borderTopWidth: 1,
        height: 60,
        backgroundColor: theme.bluish.blue3,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 2,
        width: width - (theme.sizes.base * 0),
        opacity: 1,
        marginBottom: 0
    },
    section: {
        borderColor: theme.bluish.blue1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 0
    },
    tabItem: {
        color: theme.bluish.green1,
    },
    tabTitle: {
        fontSize: 14,
        color: theme.bluish.green3,
        paddingLeft: 1
    }
});
