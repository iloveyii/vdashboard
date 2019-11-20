import {View} from "react-native";
import React from "react";

const BaseLine = ({color}) =>  (
        <View style={{alignItems: 'space-between', flexDirection: 'row', marginTop: 3}}>
            <View style={{flex: 3}}></View>
            <View style={{flex: 1, backgroundColor: color, height: 1}}></View>
            <View style={{flex: 3}}></View>
        </View>);

export default BaseLine;
