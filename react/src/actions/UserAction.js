import {
    USER_ADD,
    USER_ADD_SUCCESS,
    USER_ADD_FAIL, USER_READ, USER_READ_SUCCESS, USER_READ_FAIL, USER_DELETE, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
    USER_EDIT, USER_EDIT_SUCCESS, USER_EDIT_FAIL, USER_UPDATE, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from '../types/User';


export const userAddAction = (user) => {
    console.log('Inside userAddAction', user);

    return {
        type: USER_ADD,
        payload: {
            user
        }
    }
};

export const userAddSuccessAction = (resp) => {
    return {
        type: USER_ADD_SUCCESS,
        payload: resp
    }
};

export const userAddFailAction = (err) => {
    console.log('Inside userAddFailAction');
    console.log(err);
    return {
        type: USER_ADD_FAIL,
        payload: {err}
    }
};

export const userDeleteAction = (user) => {
    console.log('Inside userDeleteAction', user);

    return {
        type: USER_DELETE,
        payload: {
            id : user.id
        }
    }
};

export const userDeleteSuccessAction = (data) => {
    return {
        type: USER_DELETE_SUCCESS,
        payload: {
            status: data.status,
            id: data.id
        }
    }
};

export const userDeleteFailAction = (err) => {
    return {
        type: USER_DELETE_FAIL,
        payload: {
            err
        }
    }
};

export const userEditAction = (user) => {
    return {
        type: USER_EDIT,
        payload: {
            user
        }
    }
};
export const userEditSuccessAction = (status) => {
    return {
        type: USER_EDIT_SUCCESS,
        payload: {
            status
        }
    }
};
export const userEditFailAction = (err) => {
    return {
        type: USER_EDIT_FAIL,
        payload: {
            err
        }
    }
};


export const userUpdateAction = (user) => {
    console.log('Inside userUpdateAction', user);

    return {
        type: USER_UPDATE,
        payload: {
            user
        }
    }
};

export const userUpdateSuccessAction = (status) => {
    console.log('Inside userUpdateSuccessAction', status);

    return {
        type: USER_UPDATE_SUCCESS,
        payload: {
            status
        }
    }
};

export const userUpdateFailAction = (err) => {
    console.log('Inside userUpdateFailAction', err);

    return {
        type: USER_UPDATE_FAIL,
        payload: {
            err
        }
    }
};

export const userReadAction = () => {
    console.log('userReadAction');
    return {
        type: USER_READ,
        payload: {}
    }
};


export const userReadSuccessAction = (users) => {
    console.log('userReadAction');
    return {
        type: USER_READ_SUCCESS,
        payload: {users}
    }
};


export const userReadFailAction = (err) => {
    console.log('userReadFailAction');
    return {
        type: USER_READ_FAIL,
        payload: {err}
    }
};
