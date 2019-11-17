import React from 'react';
import {StyleSheet, View, Text, Dimensions} from "react-native";
import {FontAwesome} from '@expo/vector-icons';
import {theme} from "../constants";

const {width} = Dimensions.get('window');

export default class YellowBox extends React.Component {

    renderElipses() {
        const { itemsCount, currentIndex } = this.props;
        const items = new Array(itemsCount); items.fill(1, 0, itemsCount);
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', textAlign: 'center', padding:3}}>
                {
                    items.slice(0, 8).map((item, i) => <View key={i} style={[styles.steps, {backgroundColor: i === currentIndex? theme.colors.textTertiary: theme.colors.gray2}]}></View>)
                }
            </View>
        )
    }

    render() {
        const {captionText} = this.props;
        const items = captionText ? captionText.split(',') :[];

        return (
            <View style={styles.sliderCaption}>
                {
                    items.map((text, i) => <View key={i} style={styles.keywordBox}>
                        <Text style={styles.captionText}>{text.trim()}</Text>
                    </View>)
                }

                <View style={styles.keywordBox}>
                    {this.renderElipses()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sliderCaption: {
        backgroundColor: 'transparent',
        padding: 4,
        position: 'absolute',
        right: (width / 3) - 16,
        bottom: 10,
        flex: 1,
        width: width / 3,
        justifyContent: 'center'
    },
    keywordBox: {
        backgroundColor: 'black',
        marginBottom: 1,
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
    captionText: {
        fontSize: 6,
        padding: 2,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1.1,
        textAlign: 'center'
    },
    steps:{
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
    }
});
