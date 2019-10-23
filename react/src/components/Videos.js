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
import {apiServer} from '../common/constants';
import Video from '../Models/Video';


class Videos extends React.Component {
    constructor(props) {
        super(props);
        this._forceUpdate = this._forceUpdate.bind(this);

        const video = new Video(this._forceUpdate);
        console.log('Videos constructor', video.genre);


        this.state = {
            form: {
                id: null,
                title: '',
                description: '',
                genre: '',
                image_path: {},
                video_path: '',
            },
            progress: 0,
            videoUrl: null,
            video: video
        };

        this.genreList = video.genreList;

        /*
        this.showAdminList = this.showAdminList.bind(this);
        this.handleCenterClick = this.handleCenterClick.bind(this);
        this.makeAdmin = this.makeAdmin.bind(this);
        */
        this.onClickGetSelected = this.onClickGetSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getFiles = this.getFiles.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getProgress = this.getProgress.bind(this);

    }

    _forceUpdate() {
        this.forceUpdate();
    }

    getProgress(progress) {
        console.log('getProgress: ', progress);
        const {video} = this.state;
        video.uploadProgress = progress;
        this.setState({video});
    }

    handleChange(e) {
        const {video} = this.state;
        video.formFieldByE = e;
        this.setState({video});
    }

    onClickGetSelected(selected) {
        const {video} = this.state;
        video.genre = selected;
        this.setState({video});
    }

    getFiles(files, id) {
        const {video} = this.state;

        if (id === 'image_file') {
            video.imagePath = files;
        }

        if (id === 'video_file') {
            video.videoPath = files;
        }

        this.setState({video});
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.submitForm();
    }

    submitForm() {
        const {video} = this.state;

        if (this.props.match.params.id || video.mode == 'update') {
            video.submitForm(this.props.videoUpdateAction);
        } else {
            video.submitForm(this.props.videoAddAction);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps Videos', nextProps);
        if (nextProps.videos && nextProps.videos.form && Object.keys(nextProps.videos.form).length > 0) {
            const video = new Video(nextProps.videos.form);
            this.setState({video});
        }
    }

    componentDidMount() {
        this.setState({list: this.props.videos.list});
    }

    render() {
        const {video} = this.state;

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center>
                    <form action="">

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="title" placeholder="Type title" value={video.form.title}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="description" placeholder="Type description"
                                       value={video.form.description}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <Select selected={video.selected} data={video.genreList} onSelect={video.setGenre}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <File imageUrl={video.imageUrl} accept="image/x-png,image/gif,image/jpeg"
                                      id="image_file" key={1}
                                      progress={video.uploadProgress} getFiles={video.setImagePath}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <File videoUrl={video.videoUrl} accept="video/mp4,video/x-m4v,video/*"
                                      id="video_file" key={2}
                                      progress={video.uploadProgress} getFiles={video.setVideoPath}/>
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

                    <Table fields={['id', 'title', 'genre']} items={this.props.videos.list}
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

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Videos));
