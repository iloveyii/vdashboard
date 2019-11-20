import React from 'react';
import {theme} from "../constants";
import Text from "./Text";
import {TouchableOpacity, StyleSheet} from "react-native";


class YellowButton extends React.Component {
    render() {
        let {label, onPress, i, style} = this.props;
        style = style ? style : {};
        const styleCombined = Object.assign({}, styles.touch, style);
        console.log('styleCombined', styleCombined);
        return (
            <TouchableOpacity
                key={`popular-${i}`}
                onPress={() => onPress()}
                style={styleCombined}
            >
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        )
    }
}

export default YellowButton;

const styles = StyleSheet.create({
    touch: {
        padding: 2,
        backgroundColor: theme.bluish.blue1,
        margin: 1,
        marginBottom: 10,
        borderColor: theme.bluish.green1,
        borderWidth: StyleSheet.hairlineWidth
    },
    text: {
        color: theme.bluish.green3,
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center'
    }
});
