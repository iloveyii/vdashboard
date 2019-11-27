import React from 'react';
import Navigator from './index';


class Stored extends React.Component {
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('Stored componentWillReceiveProps', nextProps);
    }

    componentDidMount() {
        console.log('Stored componentDidMount');
    }

    render() {
        console.log('render stored');
        return <Navigator/>
    }
}


export default Stored;
