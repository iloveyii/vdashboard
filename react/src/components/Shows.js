import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import models from '../store/models';
import Sidebar from './Sidebar';
import Center from './Center';
import Table from './Table';


class Shows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: models.shows, // Show is an Object of class Show, while shows is array of objects from json/db
            login: models.logins
        }
    }

    componentDidMount() {
        const {readAction} = this.props;
        const {show, login} = this.state;
        show.list = this.props.shows.list; login.list = this.props.logins.list;
        show.form = this.props.shows.form; login.form = this.props.logins.form;

        if (show.list.length < 1) {
            readAction();
        } else {
            this.setState({show, login});
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {show, login} = this.state;
        show.list = nextProps.shows.list; login.list = nextProps.logins.list;
        show.form = nextProps.shows.form; login.form = nextProps.logins.form;

        if (!show || show.list.length > 0) {
            this.setState({show, login});
        }
    }

    handleChange = (e) => {
        const {show} = this.state;
        show.form[e.target.id] = e.target.value;
        this.forceUpdate();
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const {show} = this.state;
        const {createAction, updateAction} = this.props;
        show.submitForm(createAction, updateAction);
        this.setState({show});
    };

    getFilteredRows =() => {
        const {show, login} = this.state;
        if(!show || !login || !login.list) return [];
        const userId = login.form._id;
        const loggedInUser = login.list.find( user => user._id === userId);
        if( !loggedInUser || ! loggedInUser.subscriptions) return [];
        console.log('getFilteredRows', show, loggedInUser, loggedInUser.subscriptions);
        return show.filterByIds(loggedInUser.subscriptions);
    };


    render() {
        const {show, login} = this.state;
        if(!show || !show.form) return <div>Loading...</div>

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center title="Shows">
                    <div className="row">
                        <div className="col-1-of-2">
                            <form>
                                <div className="row">
                                    <div className="col-1-of-1">
                                        <input type="text" id="title" placeholder="Type title"
                                               value={show.form.title?show.form.title:''}
                                               onChange={e => this.handleChange(e)}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <textarea cols={40} rows={5} id="description" placeholder="Type description"
                                                  value={show.form.description}
                                                  onChange={e => this.handleChange(e)} />
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
                        </div>
                    </div>

                    <Table fields={['id', 'title', 'description']} items={this.getFilteredRows()}
                           itemViewAction={(arr) => this.props.history.push('/shows/' + (arr['id'] ? arr['id'] : arr['_id']) )}
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
    shows: state.shows,
    logins: state.logins
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.shows.actions.read,
    deleteAction: models.shows.actions.delete,
    editAction: models.shows.actions.edit,
    createAction: models.shows.actions.create,
    updateAction: models.shows.actions.update,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Shows));
