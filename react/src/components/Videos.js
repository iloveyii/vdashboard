import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Sidebar from './Sidebar';
import Center2 from './Center2';
import Select from './Select';
import FileUpload from './FileUpload';


class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form : {
                id: null,
                title: '',
                description: '',
                genre: '',
                image_path: '',
                video_path: '',
            }
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
    }

    handleChange(e) {
        const {form} = this.state;
        form[e.target.id]= e.target.value;
        this.setState({form});
    }

    onClickGetSelected(selected) {
        console.log('Selected', selected);
        const {form} = this.state;
        form.genre = selected.value;
        this.setState({form});
    }

    getFiles(files) {
        console.log(files);
        const {form} = this.state;
        form.image_path = files;
        this.setState({form});
    }

    submitForm(e) {
        e.preventDefault();
        const { form } = this.state;
        const formData = new FormData();

        Object.keys(form).map(key => {
            formData.append(key, form[key]);
        });

        console.log('onSubmit: ', formData);

        if (this.props.match.params.id) {
            console.log('Updating in component: ', form);
            this.props.videoUpdateAction({id: form._id, formData});
            setTimeout(() => {
                this.props.videoReadAction();
            }, 5000, this)
        } else {
            this.props.videoAddAction(formData);
        }
    }

    render() {

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center2>
                    <form action="">

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="title" placeholder="Type title" value={this.state.form.title}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="description" placeholder="Type description" value={this.state.form.description}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <Select list={this.genreList} onClickGetSelected={this.onClickGetSelected}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <FileUpload getFiles={this.getFiles} />
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
                </Center2>

            </section>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    spot: state.spot,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Videos));
