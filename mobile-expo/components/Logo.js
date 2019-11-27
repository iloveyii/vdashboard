/**
 * Standard packages
 */
import React from 'react';
import {
    View, Animated, Easing
} from 'react-native';
import {theme} from "../constants";

export default class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.spin();
    }

    spin() {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 5,
                duration: 10000,
                easing: Easing.linear
            }
        ).start(() => this.spin());
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        const factor = this.props.size ? this.props.size : 10;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                <Animated.Image
                    style={{
                        width: 5.5 * factor,
                        height: 7 * factor,
                        transform: [{rotate: spin}]
                    }}
                    source={ theme.icons.default}
                />
            </View>
        );
    }
}
