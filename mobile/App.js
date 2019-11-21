import * as Font from 'expo-font';
import React from 'react';
import store from './store';
import {Provider} from 'react-redux';
import Activity from './components/Activity';
import Welcome from './screens/Welcome';
import {View} from 'react-native';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
        };
    }

    componentDidMount() {
        this.loadFonts();
        // console.log = () => null;
        setTimeout(() => {
            this.setState({fontLoaded: true});
        }, 5000, this);
    }

    async loadFonts() {
        await Font.loadAsync({
            'URW-Geometric-Medium': require('./assets/fonts/URW-Geometric-Medium.ttf'),
            'Anton': require('./assets/fonts/Anton.ttf')
        });

        console.log('Fonts loaded');

        this.setState({
            fontLoaded: true
        });
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    {this.state.fontLoaded ? <Welcome/> : <Activity/>}
                </View>
            </Provider>
        );
    }
}


// PUBLISH
// expo publish

// BUILDS
// expo build:android -t app-bundle

// expo build:ios -t app-bundle
// expo build:ios

// you need to this app id
// https://developer.apple.com/account/resources/identifiers/list
