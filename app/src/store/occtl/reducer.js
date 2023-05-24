import {
  GET_EVENTS_FAIL,
  GET_EVENTS_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_SUCCESS,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  RESET_CALENDAR,
  GET_UPCOMMINGEVENT_SUCCESS,
  GET_UPCOMMINGEVENT_FAIL, OCCTL_GET_STATUS, OCCTL_GET_STATUS_SUCCESS, OCCTL_GET_STATUS_ERROR,
} from "./actionTypes";

const INIT_STATE = {
  statusLoading: false,
  status: {},
  error: {},
};

const Occtl = (state = INIT_STATE, action) => {
  switch (action.type) {
    case OCCTL_GET_STATUS:
      return {
        ...state,
        statusLoading: true
      }
    case OCCTL_GET_STATUS_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        statusLoading: false
      }
    case OCCTL_GET_STATUS_ERROR:
      return {
        ...state,
        error: action.payload.message,
        statusLoading: false
      }
    default:
      return state;
  }
};

export default Occtl;
