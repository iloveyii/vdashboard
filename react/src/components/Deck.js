import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import axios from 'axios';


class Deck extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: 'root',
            password: '',
            login: true
        }
    }

    componentDidMount() {
        const {logins} = this.props;
        console.log('componentDidMount', logins);
        if (logins && logins.form && logins.form.username) {
            this.setState({username: logins.form.username});
        }
    }

    render() {
        const {show} = this.props;

        return (
            <div className="col-1-of-4">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h1 style={{zIndex: 1000, textAlign:'center', fontSize: '20px', height: '40px'}}>{show.title}</h1>
                    {
                        show.episodes.slice(0, 3).map((episode, i) => <img
                            style={{
                                zIndex: 100 - i,
                                width: '180px',
                                height: '200px',
                                position: 'relative',
                                marginTop: i === 0 ? '0' : -(200 -i*7) + 'px',
                                marginLeft: (i * 10) + 'px'
                            }}

                            src={episode.image} alt={episode.title}/>)
                    }
                </div>
                <hr/>
            </div>
        )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    logins: state.logins,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Deck));
