import {
  OCCTL_GET_STATUS,
  OCCTL_GET_STATUS_SUCCESS,
  OCCTL_GET_STATUS_ERROR,
  OCCTL_GET_USERS,
  OCCTL_GET_USERS_SUCCESS,
  OCCTL_GET_USERS_ERROR,
  OCCTL_GET_USER_SUCCESS,
  OCCTL_GET_USER_ERROR,
  OCCTL_GET_USER,
  OCCTL_DISCONNECT_USER,
  OCCTL_RESET,
  OCCTL_STOP_NOW,
  OCCTL_RELOAD,
  OCCTL_USER_SESSION,
  OCCTL_USER_SESSION_SUCCESS,
  OCCTL_USER_SESSION_ERROR, OCCTL_SESSIONS_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  statusLoading: false,
  usersLoading: false,
  system: null,
  status: {},
  users: [],
  usersFile: [],
  user: null,
  error: {},
  session: null,
  sessions: []
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
        system: action.payload.system,
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
        usersFile: action.payload.usersFile,
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

    case OCCTL_DISCONNECT_USER:
      return {
        ...state,
        users: [...state.users.filter(usr => action.payload !== usr.id)],
        user: null,
        usersLoading: false
      }

    case OCCTL_RESET:
      return {
        ...state,
        // users: [],
        // status: {},
        // user: null,
        // usersLoading: false
      }

    case OCCTL_RELOAD:
      return {
        ...state,
        // users: [],
        // status: {},
        // user: null,
        // usersLoading: false
      }

    case OCCTL_USER_SESSION:
      return {
        ...state,
        session: null
      }
    case OCCTL_USER_SESSION_SUCCESS:
      return {
        ...state,
        session: action.payload.session
      }
    case OCCTL_USER_SESSION_ERROR:
      return {
        ...state,
        session: null
      }
    case OCCTL_SESSIONS_SUCCESS:
      return {
        ...state,
        sessions: action.payload.sessions
      }
    case OCCTL_STOP_NOW:
      return {
        ...state,
        users: [],
        status: {},
        user: null,
        usersLoading: false
      }
    default:
      return state;
  }
};

export default Occtl;
