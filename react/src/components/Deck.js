import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import models from "../store/models";


class Deck extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            login: models.logins,
        }
    }

    componentDidMount() {
        const {readAction} = this.props;
        const {login} = this.state;
        login.list = this.props.logins.list;
        login.form = this.props.logins.form;

        if (login.list.length < 1) {
            readAction();
        } else {
            this.setState({login});
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {login} = this.state;
        login.list = nextProps.logins.list;
        login.form = nextProps.logins.form;
        this.setState({login});
    }

    subscribe = (e) => {
        e.preventDefault();
        const {login} = this.state;
        const {updateAction, show} = this.props;
        login.form.subscription = show._id;
        login.form.unsubscribe = this.props.unsubscribe ? this.props.unsubscribe : false;
        login.submitForm(updateAction, updateAction);
        this.setState({login});
    };

    render() {
        const {show} = this.props;

        return (
            <ul onClick={(e) => this.subscribe(e)} style={{display: 'inline-block', listStyle: 'none', cursor: 'pointer'}}>
                <h1 style={{zIndex: 1000, textAlign: 'center', fontSize: '20px', height: '40px'}}>{show.title}</h1>
                {
                    show.episodes.slice(0, 3).map((episode, i) => <li key={episode._id}><img
                        style={{
                            zIndex: 100 - i,
                            width: '180px',
                            height: '200px',
                            position: 'relative',
                            marginTop: i === 0 ? '0' : -(200 - i * 7) + 'px',
                            marginLeft: (i * 10) + 'px'
                        }}

                        src={episode.image} alt={episode.title}/></li>)
                }
            </ul>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    logins: state.logins,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.logins.actions.read,
    updateAction: models.logins.actions.update,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Deck));
