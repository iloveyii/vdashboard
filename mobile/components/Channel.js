import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Badge, Block, Card, Text} from '../components';
import {theme, mocks} from "../constants";
import Icon from 'react-native-vector-icons/Ionicons';

class Channel extends React.Component {

    render() {
        const {channels} = this.props;

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{paddingVertical: theme.sizes.base * 2}}
            >
                <Block flex={false} row space="between" style={styles.channels}>
                    {channels.map((channel, index) => (
                        <TouchableOpacity
                            key={channel.name}
                            onPress={() => this.handleChannel(channel.cmd)}
                        >
                            <Card center middle shadow style={styles.channel}>
                                <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                                    {
                                        channel.tags.includes('channels')
                                            ? <Image source={channel.image} style={styles.channelImg}/>
                                            : <Icon name={channel.icon} size={30} color="#900"/>
                                    }

                                </Badge>
                                <Text medium height={20}>{channel.name}</Text>
                                <Text gray caption>{channel.count} products</Text>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </Block>
            </ScrollView>
        );
    }
}

Show.defaultProps = {
    channels : mocks
};

export default Channel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlBar: {
        flex: 0,
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    }
});
