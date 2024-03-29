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


class Videos extends React.Component {
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
        if (false && e.target.id === 'title') {
            const {list} = this.state;
            const filtered = list.filter(item => item._form.title.includes(video.form.title));
            console.log(list, filtered);
        }
        this.setState({video});
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const {video} = this.state;

        if (this.props.match.params.id || video.mode == 'update') {
            video.submitForm(this.props.videoUpdateAction);
            const alerted = {type: 'info', title: 'Video updated successfully'};
            this.setState({alert:alerted});
        } else {
            video.submitForm(this.props.videoAddAction);
            const alerted = {type: 'info', title: 'Video added successfully'};
            this.setState({alert:alerted});
        }
        this.forceUpdate();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps Videos', nextProps);
        const {videos} = nextProps;
        this.setState({list: videos.list});

        if (videos && videos.form) {
            const {video} = this.state;
            if(videos.form.mode === 'update') {
                video.form = nextProps.videos.form;
                video.mode = 'update';
            }
            video.formResult = nextProps.videos.form.result;
        }
    }

    componentDidMount() {
        console.log('componentDidMount Videos', this.props);
        const {videos: {list}, videoReadAction} = this.props;

        if (! list || list.length < 1) {
            videoReadAction();
        } else {
            this.setState({list});
        }
    }

    render() {
        const {video} = this.state;

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
                                               value={video.form.title}
                                               onChange={e => this.handleChange(e)}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-1">
                                        <textarea cols={40} rows={5} id="description" placeholder="Type description"
                                                  value={video.form.description}
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

                    <Table fields={['id', 'title', 'description']} items={this.props.videos.list}
                           itemViewAction={(arr) => this.props.history.push('/videos/' + (arr['id'] ? arr['id'] : arr['_id']) )}
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
