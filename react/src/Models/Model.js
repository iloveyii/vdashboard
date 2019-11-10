import {call, put} from 'redux-saga/effects';
import api from "../api/video";
import axios from "axios";
import {apiServer} from "../common/constants";

class Model {

    // Constructor - Name, forceUpdate
    constructor(name) {
        this.name = name;
        this.forceUpdate = () => null;
        this.server = apiServer + '/api/v1/' + name;
        this.debug = false;
    }

    forceUpdate = () => null;

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

            edit: this.name + '.edit',
            edit_success: this.name + '.edit.success',
            edit_fail: this.name + '.edit.fail',

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
            create: (data) => { window.data = data; console.log('Create ', data, {data}); return {type: this.types.create, payload: {data} }; },
            create_success: (data) => ({type: this.types.create_success, payload: {data} }),
            create_fail: (data) => ({type: this.types.create_fail, payload: {data} }),

            read: (data) => ({type: this.types.read, payload: {data} }),
            read_success: (data) => ({type: this.types.read_success, payload: {data} }),
            read_fail: (data) => ({type: this.types.read_fail, payload: {data} }),

            update: (data) => ({type: this.types.update, payload: {data} }),
            update_success: (data) => ({type: this.types.update_success, payload: {data} }),
            update_fail: (data) => ({type: this.types.update_fail, payload: {data} }),

            edit: (data) => ({type: this.types.edit, payload: {data} }),
            edit_success: (data) => ({type: this.types.edit_success, payload: {data} }),
            edit_fail: (data) => ({type: this.types.edit_fail, payload: {data} }),

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
                    var {data} = action.payload;
                    var newState = {...state, ...{list:data}};
                    return newState;
                case this.types.edit:
                    this.log('Inside reducer of class ' + this.name + ' : ' + JSON.stringify(action.payload) );
                    var {data} = action.payload; data.mode = this.types.edit;
                    var newState = {...state, ...{form:data}};
                    return newState;
                case this.types.update_success:
                    this.log('Inside reducer of class ' + this.name + ' : ' + JSON.stringify(action.payload) );
                    var {data} = action.payload; data.mode = this.types.update_success;
                    var form = {}; form.result = data;
                    var newState = {...state, ...{form}};
                    return newState;
                case this.types.create_success:
                    this.log('Inside reducer of class ' + this.name + ' : ' + JSON.stringify(action.payload) );
                    var {data} = action.payload; data.mode = this.types.create_success;
                    var form = {}; form.result = data;
                    var newState = {...state, ...{form}};
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
        const $this = this;// new Model('show');

        const create = function* (action) {
            console.log('Action in saga', action.payload);
            try {
                const data = yield call($this.api.create, {
                    formData: action.payload.data.formData,
                    action: (d) => action.payload.data.action ? action.payload.data.action(d) : null
                });
                if (data && Array.isArray(Object.keys(data))) {
                    yield put($this.actions.create_success(data));
                    yield put($this.actions.read());
                } else {
                    yield put($this.actions.create_fail(data));
                }
            } catch (err) {
                console.log(err);
                yield put($this.actions.create_fail(err));
            }
        };

        const read = function* (action) {
            try {
                const data = yield call($this.api.read, action.payload);
                if ( true || Array.isArray(data)) {
                    yield put( $this.actions.read_success(data) );
                } else {
                    yield put($this.actions.read_fail(data));
                }
            } catch (err) {
                yield put($this.actions.read_fail(err));
            }
        };

        const update = function* (action) {
            try {
                const data = yield call($this.api.update, {
                    formData: action.payload.data.formData,
                    action: (d) => action.payload.data.action ? action.payload.data.action(d) : null
                });
                if (data && Array.isArray(Object.keys(data))) {
                    yield put($this.actions.update_success(data));
                    yield put($this.actions.read());
                } else {
                    yield put($this.actions.update_fail(data));
                }
            } catch (err) {
                console.log(err);
                yield put($this.actions.update_fail(err));
            }
        };

        const deleted = function* (action) {
            try {
                const data = yield call($this.api.delete, action.payload);
                if (Array.isArray(Object.keys(data))) {
                    yield put($this.actions.delete_success(data));
                    yield put($this.actions.read());
                } else {
                    yield put($this.actions.delete_fail(data));
                }
            } catch (err) {
                yield put($this.actions.delete_fail(err));
            }
        };

        return {
            create,
            read,
            update,
            deleted,
        }
    }

    // API
    get api() {
        return {
                read: () =>
                    axios.get(this.server).then(res => res.data).catch(error => {
                        throw new Error(error);
                        console.dir(error);
                    }),
                create: (data) => {
                    const config = {
                        onUploadProgress: function(progressEvent) {
                            const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                            data.action && data.action(percentCompleted);
                        }
                    };
                    console.log('API', data);
                    return axios.post(this.server, data.formData, config).then(res => res.data).catch(error => {
                        throw new Error(error);
                        console.dir(error);
                    })
                },
                delete: (data) =>
                    axios.delete(this.server + '/' + data.data).then(res => res.data).catch(error => {
                        throw new Error(error);
                        console.dir(error);
                    }),
                update: (data) => {
                    const formData = data.formData;
                    const config = {
                        onUploadProgress: function(progressEvent) {
                            const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                            data && data.action(percentCompleted);
                        }
                    };
                    return axios.put(this.server + '/' + formData.getAll('_id'), formData, config).then(res => {console.log('Update response: ', res); return res.data; }).catch(error => {
                        throw new Error(error);
                        console.dir(error);
                    })
                }
            }
        }






    // Validation




}

export default Model;
