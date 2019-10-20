import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Sidebar from './Sidebar';
import Center2 from './Center2';
import Select from './Select';


class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            description: '',
            genre: '',
            image_path: '',
            video_path: '',
            showGenreList: false,
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
        this.handleChange = this.handleChange.bind(this);
        */
        this.onClickGetSelected = this.onClickGetSelected.bind(this);
    }

    onClickGetSelected(selected) {
        console.log('Selected', selected);
    }

    render() {

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center2>
                    <form action="">

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="email" placeholder="Type email" value={this.state.email}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <input type="text" id="username" placeholder="Type username" value={this.state.username}
                                       onChange={e => this.handleChange(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-3">
                                <input type="text" id="password" placeholder="Type password" value={this.state.password}
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
