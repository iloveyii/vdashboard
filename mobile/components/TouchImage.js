import React from 'react';
import {Dimensions, View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {theme} from "../constants";
import {apiServer} from "../constants/settings";
import CachedImage from './CachedImage';
import {MaterialIcons} from '@expo/vector-icons';

const {width} = Dimensions.get('window');

class TouchImage extends React.Component {
    constructor(props) {
        super(props);
        this.setActive = this.onPress.bind(this);
    }

    onPress() {
        this.props.onPress();
    }

    render() {
        const {i, imageUrl, captionText, popular, noBorder} = this.props;
        if(!imageUrl) return <Text>Loading...</Text>

        return (
            <TouchableOpacity
                key={`image-${i}`}
                onPress={() => {
                    this.onPress();
                }}
                style={[styles.container, { borderWidth: noBorder ? 0 : StyleSheet.hairlineWidth,  borderColor: this.props.opacity < 1 ? theme.bluish.green1 : theme.colors.lightBlack}]}
            >
                { popular
                    &&
                    <View style={{position: 'absolute', top: 1, left: 4, zIndex: 5, flexDirection: 'row'}}>
                        <MaterialIcons
                            name={"remove-red-eye"}
                            size={12}
                            color= {theme.bluish.green5}
                            style={{flex: 1}}
                        />
                        <Text style={{flex: 10, fontSize: 10, fontFamily: theme.fontFamily}}>{popular}</Text>
                    </View>
                }
                <CachedImage style={[styles.touchImage, {opacity:this.props.opacity || 1}]}
                       source={{uri: imageUrl}}/>
                <Text style={styles.caption}>{captionText && captionText.substr(0, 50)}</Text>
            </TouchableOpacity>
        )
    }
}

export default TouchImage;

const styles = StyleSheet.create({
    container: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.lightBlack,
        margin: 0,
        padding: 0,
        overflow: 'hidden'
    },
    touchImage: {
        width: (width - (theme.sizes.base * 4)) / 2 - 13,
        height: (width - (theme.sizes.base * 4)) / 4,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        flex: 1,
        borderTopLeftRadius: theme.borderRadius,
        borderBottomLeftRadius: theme.borderRadius
    },
    caption: {
        fontSize: 13,
        fontWeight: '700',
        color: theme.bluish.green3,
        paddingHorizontal: 5,
        marginBottom: 2,
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        fontFamily: 'URW-Geometric-Medium'
    },
});
