import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {userAddAction, userUpdateAction} from "../actions/UserAction";
import Center from "./Center";
import Select from '@softhem.se/select';
import Table from './Table';
import Sidebar from "./Sidebar";
import {userDeleteAction, userEditAction} from '../actions/UserAction';


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            email: '',
            username: '',
            password: '',
            admin: 0,
            showAdminList: false,
        };

        this.adminList = [
            {
                value: '1',
                label: 'Yes'
            },
            {
                value: '0',
                label: 'No'
            },
        ];

        this.showAdminList = this.showAdminList.bind(this);
        this.handleCenterClick = this.handleCenterClick.bind(this);
        this.makeAdmin = this.makeAdmin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    showAdminList(e) {
        e.stopPropagation();
        this.setState({showAdminList: !this.state.showAdminList});
    }

    handleCenterClick() {
        this.setState({showAdminList: false});
    }

    makeAdmin(user) {
        this.setState({admin: user.value});
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps', nextProps);

        if (nextProps.users && nextProps.users.edit) {
            const {id, email, username, password, admin} = nextProps.users.edit;
            this.setState({id: id ? id : null, email, username, password, admin, users: nextProps.users});
        }

        if (nextProps.users.add && nextProps.users.add.status === 1) {
            this.setState({id: null, email: '', username: '', password: '', admin: 0});
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const {id, email, username, password, admin} = this.state;
        const {userAddAction, userUpdateAction} = this.props;

        const user = {
            id: id,
            email: email,
            username: username,
            password: password,
            admin: admin
        };

        console.log('Form data: ', id, username, password, admin);

        if (id === null) {
            userAddAction(user);
        } else {
            userUpdateAction(user);
            this.setState({id: null, email: '', username: '', password: '', admin: 0});
        }
    }

    render() {
        const {users, userDeleteAction, userEditAction} = this.props;
        if( ! users ) return <div>Loading</div>

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center title="Users">
                    <form action="">

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="email" placeholder="Type email" value={this.state.email}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="username" placeholder="Type username" value={this.state.username}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-3">
                                <input type="text" id="password" placeholder="Type password" value={this.state.password}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <Select data={this.adminList} onSelect={this.makeAdmin}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-3">
                                <div className="dashboard--container">

                                    <button style={{width: '80px'}} type="submit"
                                            onClick={e => this.handleFormSubmit(e)}><i
                                        className="fas fa-save"></i> Save
                                    </button>

                                </div>
                            </div>
                        </div>

                    </form>

                    <Table fields={['id', 'username', 'email', 'admin']} items={users.list}
                           itemDeleteAction={userDeleteAction} itemEditAction={userEditAction}/>
                </Center>
            </section>
        )
    }
}


/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    users: state.users
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    userAddAction,
    userUpdateAction,
    userDeleteAction,
    userEditAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Users));
