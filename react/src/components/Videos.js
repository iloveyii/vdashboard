import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Sidebar from './Sidebar';
import Center2 from './Center2';


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
                                <div className="dd-wrapper">
                                    <div className="dd-header dd-header-open" id="select-city"
                                         onClick={(e) => this.showAdminList(e)}>
                                        <div className="dd-header-title"
                                             id="dd-header-title"> {this.state.admin == 1 ? 'Yes' : 'No'} </div>
                                        <div className="dd-icon"><i className="fas fa-angle-down"></i></div>
                                    </div>
                                    <ul className="dd-list" id="dd-list"
                                        style={{display: this.state.showAdminList ? 'block' : 'none'}}>
                                        {
                                            this.genreList.map((item, i) => <li
                                                key={i}
                                                onClick={() => this.makeAdmin(item.value)} id={item.value}
                                                className="dd-list-item">{item.label}</li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1-of-3">
                                <div className="dashboard--container">

                                    <button style={{width: '80px'}} type="submit" onClick={e => this.handleFormSubmit(e)}><i
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
