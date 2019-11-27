import React from 'react';
import {StyleSheet, View, SafeAreaView} from "react-native";
import {theme} from "../constants";

class Container extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.contents}>
                    {this.props.children }
                </View>
            </SafeAreaView>
        )
    }
}

export default Container;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 0,
        alignItems: 'center'
    },
    contents: {
        flex: 1,
        backgroundColor: 'black',
    }
});
