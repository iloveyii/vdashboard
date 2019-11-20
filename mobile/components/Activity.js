import React from 'react';
import {StyleSheet, ActivityIndicator, View} from "react-native";
import Logo from "./Logo";
import {theme} from "../constants";

class Activity extends React.Component {
    render() {
        return (
            <View style={styles.activityI} size="small" color="black" animating={true}>
                <Logo imageUri={theme.icons.default} />
            </View>
        )
    }
}

export default Activity;

const styles = StyleSheet.create({
    activityI : {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    logo: {
        width: 55,
        height: 70,
        overflow: 'visible',
        position: 'relative',
        marginLeft: -10
    }
});
