import {
    USER_EDIT,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAIL,
    USER_ADD_SUCCESS,
    USER_READ_SUCCESS,
    USER_UPDATE_SUCCESS
} from '../types/User';

const initState = {
    edit: {},
    delete: {},
    add: {}
};

const UserReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case USER_EDIT:
            console.log('Inside UserReducer USER_EDIT', action.payload);
            const newStateEdit = {...state, ...{edit: action.payload.user}};
            return newStateEdit;

        case USER_EDIT_SUCCESS:
            console.log('Inside UserReducer USER_EDIT_SUCCESS', action);
            return state;

        case USER_UPDATE_SUCCESS:
            console.log('Inside UserReducer', action.payload);
            const edit = state.edit;
            edit.result = action.payload.status;
            const newStateUpdate = {...state, ...{edit}};
            return newStateUpdate;

        case USER_ADD_SUCCESS:
            console.log('Inside UserReducer', action.payload);
            const newStateAdd = {...state, ...{add: action.payload}};
            return newStateAdd;

        case USER_READ_SUCCESS:
            console.log('Inside USER_READ_SUCCESS', action.payload);
            const newState = {...state, ...{list: action.payload.users}};
            return newState;

        default:
            return state;
    }
};

export default UserReducer;
