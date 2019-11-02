import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Sidebar from './Sidebar';


class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <div className="dashboard--center" onClick={this.handleCenterClick}>
                    <h1>Profile</h1>
                </div>
            </section>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    spot: state.spot,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Profile));
