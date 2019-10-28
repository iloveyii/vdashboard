import React from 'react';

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
        this.setTimeoutId = null;
        this.types = {
            success: {cls: 'alert alert-success', icon: 'far fa-check-square'},
            warning: {cls: 'alert alert-warning', icon: 'fas fa-exclamation-triangle'},
            info: {cls: 'alert alert-info', icon: 'fas fa-info-circle'},
            danger: {cls: 'alert alert-danger', icon: 'fas fa-radiation-alt'},
        };
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.setState({visible: false});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({visible: true});
        clearTimeout(this.setTimeoutId);
        this.setTimeoutId = setTimeout(() => {
            this.setState({visible: false});
        }, 3000);
    }

    componentDidMount() {
        clearTimeout(this.setTimeoutId);
        this.setTimeoutId = setTimeout(() => {
            this.setState({visible: false});
        }, 3000);
    }

    render() {
        const {title, type} = this.props;

        return (
            <div className={this.types[type].cls} style={{display: this.state.visible ? 'flex' : 'none'}}>
                <div className="alert-left"><i className={this.types[type].icon}></i></div>
                <div className="alert-middle">{title}</div>
                <div className="alert-right">
                    <span onClick={this.onClose}>
                        <i className="far fa-window-close"></i>
                    </span>
                </div>
            </div>
        )
    }
}

export default Alert;
