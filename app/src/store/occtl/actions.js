import {
    OCCTL_GET_STATUS, OCCTL_GET_STATUS_ERROR, OCCTL_GET_STATUS_SUCCESS

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
