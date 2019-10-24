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
        video.subscribe(['setUploadProgress', 'formResult']);

        this.state = {
            video: video
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
        this.setState({video});
    }

    handleFormSubmit(e) {
        e.preventDefault();
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
            const {video} = this.state;
            video.form = nextProps.videos.form;
            video.formResult = nextProps.videos.form.result;
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
                                <Select model={video}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <File model={video} type="image"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
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
