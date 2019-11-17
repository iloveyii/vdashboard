import React from 'react';
import {theme} from "../constants";
import Text from "./Text";
import {TouchableOpacity, StyleSheet} from "react-native";


class More extends React.Component {
    render() {
        const {label, onPress} = this.props;
        return (
            <TouchableOpacity
                key={`items-${Math.random() * 100}`}
                onPress={()=>onPress()}
                style={styles.touch}
            >
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        )
    }
}

export default More;

const styles = StyleSheet.create({
    touch: {
        padding: 8,
        backgroundColor: 'transparent',
        margin: 1,
        marginBottom: 10,
    },
    text: {
        color: theme.bluish.green3,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'URW-Geometric-Medium'
    }
});
