import {call, put} from 'redux-saga/effects';
import api from "../api/video";

class Model {

    // Constructor - Name, forceUpdate
    constructor(name, forceUpdate = null) {
        this.name = name;
        if (forceUpdate && typeof forceUpdate === 'function') {
            this.forceUpdate = forceUpdate;
        } else {
            this.forceUpdate = () => null;
        }
        this.debug = true;
    }

    log(msg) {
        if(this.debug) console.log(msg);
    }

    // Subscribers


    // CRUD constants
    get types() {
        return {
            create: this.name + '.create',
            create_success: this.name + '.create.success',
            create_fail: this.name + '.create.fail',

            read: this.name + '.read',
            read_success: this.name + '.read.success',
            read_fail: this.name + '.read.fail',

            update: this.name + '.update',
            update_success: this.name + '.update.success',
            update_fail: this.name + '.update.fail',

            delete: this.name + '.delete',
            delete_success: this.name + '.delete.success',
            delete_fail: this.name + '.delete.fail',
        }
    }
    // ACTIONS
    get actions() {
        console.log('Inside show actions');
        return {
            create: (data) => ({type: this.types.create, payload: {data} }),
            create_success: (data) => ({type: this.types.create_success, payload: {data} }),
            create_fail: (data) => ({type: this.types.create_fail, payload: {data} }),

            read: (data) => ({type: this.types.read, payload: {data} }),
            read_success: (data) => ({type: this.types.read_success, payload: {data} }),
            read_fail: (data) => ({type: this.types.read_fail, payload: {data} }),

            update: (data) => ({type: this.types.update, payload: {data} }),
            update_success: (data) => ({type: this.types.update, payload: {data} }),
            update_fail: (data) => ({type: this.types.update_success, payload: {data} }),

            delete: (data) => ({type: this.types.delete, payload: {data} }),
            delete_success: (data) => ({type: this.types.delete_success, payload: {data} }),
            delete_fail: (data) => ({type: this.types.delete_fail, payload: {data} }),
        };
    }

    // REDUCERS
    get reducers() {
        const initState = {
            list: [],
            form: {}
        };

        const reducer = (state = initState, action = {}) => {

            switch (action.type) {
                case this.types.read_success:
                    this.log('Inside reducer of class ' + this.name + ' : ' + JSON.stringify(action.payload) );
                    const {data} = action.payload;
                    const newState = {...state, ...{list:data}};
                    return newState;
                default:
                    this.log('Inside show default reducer of class ' + this.name + JSON.stringify(action));
                    return state;
            }
        };

        return reducer;
    }


    // SAGAS
    get sagas() {

        const read = () => function* (action) {
            try {
                this.log('Inside saga of ' + this.name );
                const resp = yield call(api.video.read, action.payload);

                if ( true || Array.isArray(resp)) {
                    this.log('Inside saga of ' + this.name + ' ' + JSON.stringify(action) + ' ' + JSON.stringify(resp));
                    yield put(this.actions.read_success(resp));
                } else {
                    yield put(this.actions.read_fail(resp));
                }
            } catch (err) {
                yield put(this.actions.read_fail(err));
            }
        };

        return {
            read
        }
    }


    // Validation




}

export default Model;
