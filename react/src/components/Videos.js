import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Sidebar from './Sidebar';
import Center from './Center';
import FileUpload from './FileUpload';
import {videoAddAction, videoReadAction, videoUpdateAction} from "../actions/VideoAction";
import Table from '@softhem.se/table';
import File from '@softhem.se/file';
import Select from '@softhem.se/select';


class Videos extends React.Component {
    constructor(props) {
        super(props);
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
            videoUrl: null
        };

        this.genreList = [
            {
                value: 'pop',
                label: 'Pop'
            },
            {
                value: 'jazz',
                label: 'Jazz'
            },
            {
                value: 'rock',
                label: 'Rock'
            },
            {
                value: 'disco',
                label: 'Disco'
            },
        ];

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

    getProgress(progress) {
        console.log('getProgress: ', progress);
        this.setState({progress});
    }

    handleChange(e) {
        const {form} = this.state;
        form[e.target.id] = e.target.value;
        this.setState({form});
    }

    onClickGetSelected(selected) {
        console.log('Selected', selected);
        const {form} = this.state;
        form.genre = selected.value;
        this.setState({form});
    }

    getFiles(files, id) {
        console.log('getFiles', files, id);
        const {form} = this.state;
        if (id === 'image_file') {
            form.image_path = files[0];
        }

        if (id === 'video_file') {
            form.video_path = files[0];
        }

        this.setState({form});
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.submitForm();
    }

    submitForm() {
        const {form} = this.state;
        const formData = new FormData();

        Object.keys(form).map(key => {
            formData.append(key, form[key]);
            console.log('Form key', key, formData);
        });

        console.log('onSubmit: ', formData);

        if (this.props.match.params.id) {
            console.log('Updating in component: ', form);
            this.props.videoUpdateAction({id: form._id, formData});
            setTimeout(() => {
                this.props.videoReadAction();
            }, 5000, this)
        } else {
            this.props.videoAddAction(formData, this.getProgress);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps Videos', nextProps);
        this.setState({
            list: nextProps.videos.list,
            videoUrl: nextProps.videos && nextProps.videos.form && nextProps.videos.form.result && nextProps.videos.form.result.video_path ? nextProps.videos.form.result.video_path : null
        });
    }

    componentDidMount() {
        this.setState({list: this.props.videos.list});
    }

    render() {

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center>
                    <form action="">

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="title" placeholder="Type title" value={this.state.form.title}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="description" placeholder="Type description"
                                       value={this.state.form.description}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <Select data={this.genreList} onSelect={this.onClickGetSelected}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <File accept="image/x-png,image/gif,image/jpeg" id="image_file" key={1}
                                      progress={this.state.progress} getFiles={this.getFiles}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <FileUpload videoUrl={this.state.videoUrl} accept="video/mp4,video/x-m4v,video/*"
                                            id="video_file" key={2}
                                            progress={this.state.progress} getFiles={this.getFiles}/>
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

                    <Table fields={['id', 'title', 'genre']} items={this.state.list}/>
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
    videoUpdateAction
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Videos));
