import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Sidebar from './Sidebar';
import Center from './Center';
import {
    videoAddAction,
    videoReadAction,
    videoUpdateAction,
    videoDeleteAction,
    videoEditAction
} from "../actions/VideoAction";
import Table from './Table';
// import File from '@softhem.se/file';
import File from './File';
import Select from './Select';
import Alert from './Alert';
import VideoPlayer from './VideoPlayer';
import Video from '../Models/Video';


class VideosView extends React.Component {
    constructor(props) {
        super(props);
        this._forceUpdate = this._forceUpdate.bind(this);

        const video = new Video(this._forceUpdate);
        video.subscribe(['setUploadProgress', 'formResult']);

        this.state = {
            video: video,
            alert: {
                type: 'info',
                title: 'Info'
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    _forceUpdate() {
        this.forceUpdate();
    }

    handleChange(e) {
        const {video} = this.state;
        video.formFieldByE = e;
        if (e.target.id === 'title') {
            const {list} = this.state;
            const filtered = list.filter(item => item.form.title.includes(video.form.title));
            console.log(list, filtered);
        }
        this.setState({video});
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const {video} = this.state;

        if (this.props.match.params.id || video.mode == 'update') {
            video.submitForm(this.props.videoUpdateAction);
            const alert = {type: 'info', title: 'Video updated successfully'};
            this.setState({alert});
        } else {
            video.submitForm(this.props.videoAddAction);
            const alert = {type: 'info', title: 'Video added successfully'};
            this.setState({alert});
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {id} = nextProps.match.params;
        const show = this.filterById(id, nextProps.videos.list);
        console.log('VideosView componentWillReceiveProps Videos', id, show, nextProps);
        this.setState({show});

        if (nextProps.videos && nextProps.videos.form && Object.keys(nextProps.videos.form).length > 0) {
            const {video} = this.state;
            video.form = nextProps.videos.form;
            video.mode = 'update';
            video.formResult = nextProps.videos.form.result;
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const show = this.filterById(id, this.props.videos.list);
        console.log('VideosView componentDidMount Show and Videos', show, this.props);
        this.setState({list: this.props.videos.list, show});
    }

    filterById(id, list) {
        const showArray = list.filter(s => s.id == id);
        const show = Array.isArray(showArray) ? showArray[0] : showArray;
        return show;
    }

    render() {
        const {video, show} = this.state;
        if (!show) return <div>Loading...</div>

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center>

                    <div className="row">
                        <div className="col-1-of-1">
                            <h1>Show View</h1>
                            <h3>{show.form.title}</h3>
                            <h3>{show.form.description}</h3>
                            <h3>Episodes: {show.form.episodes.length}</h3>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-2">
                            <form>
                                <div className="row">
                                    <div className="col-1-of-1">
                                        <Alert type={this.state.alert.type} title={this.state.alert.title}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1-of-1">
                                        <input type="text" id="title" placeholder="Type title"
                                               value={video.form.title}
                                               onChange={e => this.handleChange(e)}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <input type="text" id="description" placeholder="Type description"
                                               value={video.form.description}
                                               onChange={e => this.handleChange(e)}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <Select model={video}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <File model={video} type="image"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <File model={video} type="video"/>
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
                        <div className="col-1-of-2">
                            <VideoPlayer video={video}/>
                        </div>
                    </div>

                    <Table fields={['id', 'title']} items={show.form.episodes}
                           itemEditAction={this.props.videoEditAction} itemDeleteAction={this.props.videoDeleteAction}/>
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
    videos: state.videos,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    videoAddAction,
    videoReadAction,
    videoUpdateAction,
    videoDeleteAction,
    videoEditAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(VideosView));
