import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Link} from 'react-router-dom';
import {apiServer} from '../common/constants';
import axios from 'axios';
import models from '../store/models';



class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            login: models.logins,
            user:{}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {logins} = nextProps;
        const {readAction} = this.props;
        const {user} = this.state;

        if(logins.actions && logins.actions.type=='create' && logins.actions.ok === 1) {
            readAction({username: user.username, password: user.password});
        }

        if (logins && logins.form.authenticated) {
            this.props.history.push('/dashboard');
        }
    }

    handleChange = (e) => {
        const {login} = this.state;
        login.form[e.target.id] = e.target.value;
        this.forceUpdate();
    };

    handleSignUp = (e) => {
        e.preventDefault();
        const {login} = this.state;
        const user = Object.assign({}, login.form);
        const {createAction} = this.props;
        login.submitForm(createAction, ()=>null);
        this.setState({login, user});
    };

    render() {
        const {login} = this.state;

        return (
            <section id="dashboard" className="dashboard">
                <div className="dashboard--center" style={{textAlign: 'center', float: 'none'}}>

                    <div style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <form action=""
                              style={{width: '500px', backgroundColor: 'black', padding: '40px', borderRadius: '5px'}}>
                            <p style={{textAlign: 'right'}}><Link to="/login"> Back to login </Link></p>
                            <h1>Sign Up</h1>
                            <div className="row">
                                <div className="col-1-of-1">
                                    <input type="text" id="email" placeholder="Type email" value={login.email}
                                           onChange={e => this.handleChange(e)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1-of-1">
                                    <input type="text" id="username" placeholder="Type username"
                                           value={login.username}
                                           onChange={e => this.handleChange(e)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1-of-1">
                                    <input type="password" id="password" placeholder="Type password"
                                           value={login.password}
                                           onChange={e => this.handleChange(e)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1-of-1">

                                    <button style={{width: '80px'}} type="submit"
                                            onClick={e => this.handleSignUp(e)}><i
                                        className="fas fa-user-edit"></i> Sign up
                                    </button>

                                </div>
                            </div>

                        </form>

                    </div>
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
    logins: state.logins,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.logins.actions.read,
    createAction: models.logins.actions.create
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Signup));
