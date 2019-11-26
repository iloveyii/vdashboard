import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {logoutAction} from "../actions/LoginAction";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.setActive = this.setActive.bind(this);
        this.state = {
            active: 'dashboard'
        }
    }

    setActive(e) {
        e.preventDefault();
        console.log('Setting active ' + e);
        this.setState({active: e});
    }

    handleLogout() {
        const {logoutAction} = this.props;
        logoutAction();
        this.props.history.push('/');
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {logins} = nextProps;
        if (logins && logins.form && logins.form.authenticated === false) {
            //this.props.history.push('/');
        }
    }

    render() {
        let {pathname} = this.props.location;
        pathname = pathname.length == 0 ? '/dashboard' : pathname;

        return (
            <div className="dashboard--left-bar">
                <span className="button line u-green-text">
                    <i className="fas fa-shopping-basket"></i>
                    <label htmlFor=""><h4 className="italic">Admin</h4></label>
                </span>
                <span className="dashboard--left-bar-line"></span>

                <Link to={`/dashboard`} className={pathname == '/dashboard' ? 'button active' : 'button'}>
                    <i className="fas fa-home"></i>
                    <label htmlFor="">Dashboard</label>
                </Link>

                <Link to={`/subscribe`} className={pathname == '/subscribe' ? 'button active' : 'button'}>
                    <i className="fas fa-check-double"></i>
                    <label htmlFor="">Subscribe</label>
                </Link>

                <Link to={`/shows`} className={pathname == '/shows' ? 'button active' : 'button'}>
                    <i className="fas fa-photo-video"></i>
                    <label htmlFor="">Shows</label>
                </Link>

                <Link to={`/users`} className={pathname == '/users' ? 'button active' : 'button'}>
                    <i className="fas fa-users"></i>
                    <label htmlFor="">Users</label>
                </Link>

                <Link to={`/settings`} className={pathname == '/settings' ? 'button active' : 'button'}>
                    <i className="fas fa-cog"></i>
                    <label>Settings</label>
                </Link>

                <span className="button" onClick={() => this.handleLogout()}>
                    <i className="fas fa-sign-out-alt"></i>
                    <label>Sign out</label>
                </span>
            </div>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    logins: state.logins
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    logoutAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Sidebar));

