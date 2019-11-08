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
            shows: models.shows
        }
    }

    componentDidMount() {
        const {readAction} = this.props;
        const {shows} = this.state;
        shows.list = this.props.shows.list;
        shows.form = this.props.shows.form;

        if (shows.list.length < 1) {
            readAction();
        } else {
            this.setState({shows});
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {shows} = this.state;
        shows.list = nextProps.shows.list;
        shows.form = nextProps.shows.form;

        if (!shows || shows.list.length < 1) {
            this.setState({shows});
        }
    }

    render() {
        const {shows} = this.state;

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center>
                    <div className="row">
                        <div className="col-1-of-1">
                            <h1>Shows</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1-of-2">
                            <form>
                                <div className="row">
                                    <div className="col-1-of-1">
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1-of-1">
                                        <input type="text" id="title" placeholder="Type title"
                                               value={shows.form.title}
                                               onChange={e => this.handleChange(e)}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <textarea cols={40} rows={5} id="description" placeholder="Type description"
                                                  value={shows.form.description}
                                                  onChange={e => this.handleChange(e)}> </textarea>
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

                    <Table fields={['id', 'title', 'description']} items={shows.list}
                           // itemViewAction={(arr) => this.props.history.push('/videos/' + (arr['id'] ? arr['id'] : arr['_id']) )}
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
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction : models.shows.actions.read,
    deleteAction : models.shows.actions.delete,
    editAction : models.shows.actions.read,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Shows));
