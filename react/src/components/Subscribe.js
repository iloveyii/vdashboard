import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import models from '../store/models';
import Sidebar from './Sidebar';
import Center from "./Center";
import Deck from "./Deck";


class Subscribe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: models.shows // Show is an Object of class Show, while shows is array of objects from json/db
        }
    }

    componentDidMount() {
        const {readAction} = this.props;
        const {show} = this.state;
        show.list = this.props.shows.list;
        show.form = this.props.shows.form;

        if (show.list.length < 1) {
            readAction();
        } else {
            this.setState({show});
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {show} = this.state;
        show.list = nextProps.shows.list;
        show.form = nextProps.shows.form;

        if (!show || show.list.length > 0) {
            this.setState({show});
        }
    }


    render() {
        const {show}= this.state;
        if(!show || !show.list) return <div>Loading...</div>

        return (
            <section id="dashboard" className="dashboard">
                <Sidebar/>
                <Center>
                    <div className="row">
                        <div className="col-1-of-1">
                            <h1>Subscribe</h1>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="row" style={{backgroundColor: 'green'}}>
                            {
                                show.list.map(s => <Deck key={s._id} show={s} />)
                            }
                    </div>
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
    shows: state.shows,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{UserUpdate: UserUpdateAction}}
 */
const mapActionsToProps = {
    readAction: models.shows.actions.read,
    deleteAction: models.shows.actions.delete,
    editAction: models.shows.actions.edit,
    createAction: models.shows.actions.create,
    updateAction: models.shows.actions.update,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Subscribe));
