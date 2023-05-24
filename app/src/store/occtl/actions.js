import {
    OCCTL_GET_STATUS,
    OCCTL_GET_STATUS_ERROR,
    OCCTL_GET_STATUS_SUCCESS, OCCTL_GET_USER, OCCTL_GET_USER_ERROR, OCCTL_GET_USER_SUCCESS,
    OCCTL_GET_USERS,
    OCCTL_GET_USERS_ERROR,
    OCCTL_GET_USERS_SUCCESS

} from "./actionTypes";

export const fetchOcctlStatus = () => {
    return {
        type: OCCTL_GET_STATUS
    }
}

export const fetchOcctlStatusSuccess = (data) => {
    return {
        type: OCCTL_GET_STATUS_SUCCESS,
        payload: data
    }
}

export const fetchOcctlStatusError = (error) => {
    return {
        type: OCCTL_GET_STATUS_ERROR,
        payload: error
    }
}

export const fetchOcctlUsers = () => {
    return {
        type: OCCTL_GET_USERS
    }
}

export const fetchOcctlUsersSuccess = (data) => {
    return {
        type: OCCTL_GET_USERS_SUCCESS,
        payload: data
    }
}

export const fetchOcctlUsersError = (error) => {
    return {
        type: OCCTL_GET_USERS_ERROR,
        payload: error
    }
}

export const fetchOcctlUser = (user) => {
    return {
        type: OCCTL_GET_USER,
        payload: user
    }
}

export const fetchOcctlUserSuccess = (data) => {
    return {
        type: OCCTL_GET_USER_SUCCESS,
        payload: data
    }
}

export const fetchOcctlUserError = (error) => {
    return {
        type: OCCTL_GET_USER_ERROR,
        payload: error
    }
}
