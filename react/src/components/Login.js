import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import models from '../store/models';


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: 'root',
            password: 'root',
            login: models.logins,
        }
    }

    handleChange(e) {
        e.preventDefault();
        const field = e.target.id;
        const value = e.target.value;
        this.setState({[field]: value});
    }

    handleLogin(e) {
        e.preventDefault();
        const {readAction} = this.props;
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        readAction(user);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {logins} = nextProps;
        console.log('componentWillReceiveProps', logins);
        if (logins && logins.form && logins.form.authenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
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
                            <p style={{textAlign: 'right'}}><Link to="/signup"> Sign up </Link></p>
                            <h1>Login</h1>
                            <div className="row">
                                <div className="col-1-of-1">
                                    <input type="text" id="username" placeholder="Type username"
                                           value={this.state.username}
                                           onChange={e => this.handleChange(e)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1-of-1">
                                    <input type="password" id="password" placeholder="Type password"
                                           value={this.state.password}
                                           onChange={e => this.handleChange(e)}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-1-of-1">

                                    <button style={{width: '80px'}} type="submit"
                                            onClick={e => this.handleLogin(e)}><i
                                        className="fas fa-sign-in-alt"></i> Login
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
    readAction: models.logins.actions.read
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Login));
