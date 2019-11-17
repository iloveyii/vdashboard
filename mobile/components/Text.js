import React, {Component} from "react";
import {Text} from "react-native";


class CustomText extends Component {
    render() {
        const style = [{fontFamily: 'URW-Geometric-Medium', color: '#888888', fontSize: 16, textAlign: 'justify'}, this.props.style || {}];
        const allProps = Object.assign({},  {style: style});

        return <Text {...allProps}>{this.props.children}</Text>
    }
}

export default CustomText;
