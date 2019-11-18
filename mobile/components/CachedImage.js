/**
 * Standard packages
 */
import React from 'react';
import {
    Alert,
    Image
} from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import {theme} from "../constants";

async function getiOSNotificationPermission() {
    const {status} = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
}

export default class CachedImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUri: false,
            source: {uri : false},
            data: {
                exists: false
            }
        };
        this.downloadFile = this.downloadFile.bind(this);
        this.downloadFileIfNotExist = this.downloadFileIfNotExist.bind(this);
        this.setSource = this.setSource.bind(this);
    }

    downloadFile(url, fileName) {
        const fileUri = FileSystem.documentDirectory + fileName;
        FileSystem.downloadAsync(
            url,
            fileUri
        )
            .then(({uri}) => {
                console.log('Finished downloading to ', uri);
                this.setSource(fileUri);
            })
            .catch(error => {
                console.error(error);
                Alert.alert('Error :', error);
            });
    }

    downloadFileIfNotExist(url) {
        const arrUrl = url.split('/');
        const fileName = arrUrl[arrUrl.length - 1];
        const fileUri = FileSystem.documentDirectory + fileName;
        //console.log('downloadFileIfNotExist', fileUri, url, arrUrl, fileName)

        FileSystem.getInfoAsync(fileUri, {}).then(data => {
            if (data.exists === true) {
                //console.log('File already exists : ' + fileUri);
                this.setSource(fileUri);
            } else {
                this.downloadFile(url, fileName)
            }
        });
    }

    setSource(fileUri) {
        this.setState({source: {uri: fileUri}});
    }

    componentWillMount() {
        getiOSNotificationPermission();
    }

    componentDidMount() {
        this.downloadFileIfNotExist(this.props.source.uri);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.downloadFileIfNotExist(nextProps.source.uri);
    }

    render() {
        // @TODO change the following to _ this.state.source to get image from cache
        return this.state.source.uri
            ? <Image resizeMode='cover' style={this.props.style} source={this.props.source}/>
            : <Image resizeMode='cover' style={{width: 50, height: 50}} source={theme.icons.default}/> ;
    }
}
