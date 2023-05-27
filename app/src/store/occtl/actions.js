import {
    OCCTL_ADD_USER,
    OCCTL_DELETE_USER,
    OCCTL_DISCONNECT_USER,
    OCCTL_DISCONNECT_USER_ERROR,
    OCCTL_DISCONNECT_USER_SUCCESS,
    OCCTL_GET_STATUS,
    OCCTL_GET_STATUS_ERROR,
    OCCTL_GET_STATUS_SUCCESS,
    OCCTL_GET_USER,
    OCCTL_GET_USER_ERROR,
    OCCTL_GET_USER_SUCCESS,
    OCCTL_GET_USERS,
    OCCTL_GET_USERS_ERROR,
    OCCTL_GET_USERS_SUCCESS,
    OCCTL_RELOAD,
    OCCTL_RESET,
    OCCTL_START,
    OCCTL_STOP_NOW,
    OCCTL_UPDATE_USER,
    OCCTL_USER_SESSION, OCCTL_USER_SESSION_ERROR, OCCTL_USER_SESSION_SUCCESS

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

export const disconnectUser = (id) => {
    return {
        type: OCCTL_DISCONNECT_USER,
        payload: id
    }
}

export const disconnectUserSuccess = (data) => {
    return {
        type: OCCTL_DISCONNECT_USER_SUCCESS,
        payload: data
    }
}

export const disconnectUserError = (error) => {
    return {
        type: OCCTL_DISCONNECT_USER_ERROR,
        payload: error
    }
}

export const occtlSart = () => {
    return {
        type: OCCTL_START
    }
}

export const occtlReset = () => {
    return {
        type: OCCTL_RESET
    }
}

export const occtlReload = () => {
    return {
        type: OCCTL_RELOAD
    }
}
export const occtlStopNow = () => {
    return {
        type: OCCTL_STOP_NOW
    }
}

export const occtlUpdateUser = (data) => {
    return {
        type: OCCTL_UPDATE_USER,
        payload: data
    }
}
export const occtlAddUser = (data) => {
    return {
        type: OCCTL_ADD_USER,
        payload: data
    }
}
export const occtlDeleteUser = (data) => {
    return {
        type: OCCTL_DELETE_USER,
        payload: data
    }
}

export const occtlGetUserSession = (id) => {
    return {
        type: OCCTL_USER_SESSION,
        payload: id
    }
}

export const occtlGetUserSessionSuccess = (data) => {
    return {
        type: OCCTL_USER_SESSION_SUCCESS,
        payload: data
    }
}

export const occtlGetUserSessionError = (error) => {
    return {
        type: OCCTL_USER_SESSION_ERROR,
        payload: error
    }
}
