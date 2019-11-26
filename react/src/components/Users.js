import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Center from "./Center";
import Select from './Select';
import Table from './Table';
import Sidebar from "./Sidebar";
import models from "../store/models";


class Users extends React.Component {
    constructor(props) {
        super(props);
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

        this.state = {
            showAdminList: false,
            login : models.logins
        };

        this.showAdminList = this.showAdminList.bind(this);
        this.handleCenterClick = this.handleCenterClick.bind(this);
        this.makeAdmin = this.makeAdmin.bind(this);
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

        if (login && login.list && login.list.length > 0) {
            this.setState({login});
        }
    }

    handleChange = (e) => {
        const {login} = this.state;
        login.form[e.target.id] = e.target.value;
        this.forceUpdate();
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const {login} = this.state;
        const {createAction, updateAction} = this.props;
        login.submitForm(createAction, updateAction);
        this.setState({login});
    };


    render() {
        const {login} = this.state;
        if(!login || !login.form) return <div>Loading...</div>

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center title="Users">
                    <form action="">

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="email" placeholder="Type email" value={login.form.email ? login.form.email : ''}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="username" placeholder="Type username" value={login.form.username}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-3">
                                <input type="password" id="password" placeholder="Type password" value={login.form.password}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <Select placeHolder={'Select admin'} attr={'admin'} model={login}/>
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

                    <Table fields={['id', 'username', 'admin']} items={login.list}
                           itemEditAction={this.props.editAction} itemDeleteAction={this.props.deleteAction}/>
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
    logins: state.logins
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.logins.actions.read,
    deleteAction: models.logins.actions.delete,
    editAction: models.logins.actions.edit,
    createAction: models.logins.actions.create,
    updateAction: models.logins.actions.update,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Users));
