import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {itemAddAction, itemUpdateAction} from "../actions/ItemAction";
import Center from "./Center";
import Select from '@softhem.se/select';
import Table from './Table';
import Sidebar from "./Sidebar";
import {itemDeleteAction, itemEditAction} from '../actions/ItemAction';



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

    makeAdmin(item) {
        this.setState({admin: item.value});
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps', nextProps);

        if (nextProps.edit && nextProps.edit.item) {
            const {id, email, username, password, admin} = nextProps.edit.item;
            this.setState({id: id ? id : null, email, username, password, admin});
        }

        if (nextProps.add && nextProps.add.status === 1) {
            this.setState({id: null, email: '', username: '', password: '', admin: 0});
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const {id, email, username, password, admin} = this.state;
        const {itemAddAction, itemUpdateAction} = this.props;

        const item = {
            id: id,
            email: email,
            username: username,
            password: password,
            admin: admin
        };

        console.log('Form data: ', id, username, password, admin);

        if (id === null) {
            itemAddAction(item);
        } else {
            itemUpdateAction(item);
            this.setState({id: null, email: '', username: '', password: '', admin: 0});
        }
    }

    render() {
        const {items, itemDeleteAction, itemEditAction} = this.props;

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

                    <Table fields={['id', 'username', 'email', 'admin']} items={items} itemDeleteAction={itemDeleteAction} itemEditAction={itemEditAction} />
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
    items: state.items,
    edit: state.item.edit,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    itemAddAction,
    itemUpdateAction,
    itemDeleteAction,
    itemEditAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Users));
