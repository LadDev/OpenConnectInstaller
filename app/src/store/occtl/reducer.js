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
  GET_UPCOMMINGEVENT_FAIL,
  OCCTL_GET_STATUS,
  OCCTL_GET_STATUS_SUCCESS,
  OCCTL_GET_STATUS_ERROR,
  OCCTL_GET_USERS,
  OCCTL_GET_USERS_SUCCESS, OCCTL_GET_USERS_ERROR, OCCTL_GET_USER_SUCCESS, OCCTL_GET_USER_ERROR, OCCTL_GET_USER,
} from "./actionTypes";

const INIT_STATE = {
  statusLoading: false,
  usersLoading: false,
  status: {},
  users: [],
  user: null,
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

    case OCCTL_GET_USERS:
      return {
        ...state,
        usersLoading: true
      }
    case OCCTL_GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        usersLoading: false
      }
    case OCCTL_GET_USERS_ERROR:
      return {
        ...state,
        error: action.payload.message,
        usersLoading: false
      }

    case OCCTL_GET_USER:
      return {
        ...state,
        user: null,
        usersLoading: true
      }
    case OCCTL_GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        usersLoading: false
      }
    case OCCTL_GET_USER_ERROR:
      return {
        ...state,
        error: action.payload.message,
        usersLoading: false
      }
    default:
      return state;
  }
};

export default Occtl;
