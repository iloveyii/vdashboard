import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import models from '../store/models';
import Sidebar from './Sidebar';
import Center from './Center';
import Table from './Table';
import File from './File';
import Select from './Select';
import Alert from './Alert';
import VideoPlayer from './VideoPlayer';
import Episode from "../Models/Episode";


class ShowsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            episode: new Episode('episodes')// Show is an Object of class Show, while shows is array of objects from json/db
        }
    }

    componentDidMount() {
        const {match, shows} = this.props;
        const {episode} = this.state;
        episode.list = this.props.episodes.list;
        episode.form = this.props.episodes.form;
        episode._form.show_id = match.params.id;
        this.setState({episode, shows});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {episode} = this.state;
        episode.list = nextProps.episodes.list;
        episode.form = nextProps.episodes.form;

        this.setState({episode, shows: nextProps.shows});
    }

    handleChange = (e) => {
        const {episode} = this.state;
        episode.form[e.target.id] = e.target.value;
        this.forceUpdate();
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const {episode} = this.state;
        episode.form.show_id = this.props.match.params.id;

        console.log('Episode', episode);
        const {createAction, updateAction} = this.props; // actions for episodes
        episode.submitForm(createAction, updateAction);
        this.setState({episode});
    };


    render() {
        const {episode} = this.state;
        const {shows} = this.props;
        if (!shows || Object.keys(shows).length < 1) return <div>Loading</div>;

        const show = shows.list.find(s => s._id === this.props.match.params.id);
        if(!show) return <div>Loading...</div>;

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
                                               value={episode.form.title}
                                               onChange={e => this.handleChange(e)}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <textarea cols={40} rows={5} id="description" placeholder="Type description"
                                                  value={episode.form.description}
                                                  onChange={e => this.handleChange(e)}></textarea>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <Select model={episode}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <File model={episode} type="image"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <File model={episode} type="video"/>
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

                    <Table fields={['id', 'title', 'description']} items={show.episodes? show.episodes : []}
                           itemViewAction={(arr) => this.props.history.push('/shows/' + (arr['id'] ? arr['id'] : arr['_id']))}
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
    episodes: state.episodes,
    shows: state.shows,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.episodes.actions.read,
    deleteAction: models.episodes.actions.delete,
    editAction: models.episodes.actions.edit,
    createAction: models.episodes.actions.create,
    updateAction: models.episodes.actions.update,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(ShowsView));
