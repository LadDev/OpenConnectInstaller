import { takeEvery, put, call } from "redux-saga/effects"

// Calender Redux States
import {
  OCCTL_ADD_USER, OCCTL_DELETE_USER,
  OCCTL_DISCONNECT_USER,
  OCCTL_GET_STATUS,
  OCCTL_GET_USER,
  OCCTL_GET_USERS,
  OCCTL_RELOAD,
  OCCTL_RESET, OCCTL_SESSIONS,
  OCCTL_START,
  OCCTL_STOP_NOW,
  OCCTL_UPDATE_USER, OCCTL_USER_SESSION
} from "./actionTypes"

import {
  fetchOcctlStatusSuccess,
  fetchOcctlStatusError,
  fetchOcctlUsersError,
  fetchOcctlUsersSuccess,
  fetchOcctlUserError,
  fetchOcctlUserSuccess,
  disconnectUserSuccess,
  disconnectUserError,
  occtlGetUserSessionSuccess,
  occtlGetUserSessionError, fetchOcctlSessionsSuccess, fetchOcctlSessionsError
} from "./actions"

//Include Both Helper File with needed methods
import {
  getDisconnectOcctlUser,
  getOcctl, getOcctlReload,
  getOcctlReset, getOcctlStart, getOcctlStopNow,
  getOcctlUser,
  getOcctlUsers, getSessions, getUserSession, postAddUSer, postDeleteUSer, postUpdateUSer
} from "../../helpers/backend_helper";

function* fetchOcctlStatus() {
  try {
    const response = yield call(getOcctl)
    yield put(fetchOcctlStatusSuccess(response))
  } catch (error) {
    yield put(fetchOcctlStatusError(error))
  }
}

function* fetchOcctlUsers() {
  try {
    const response = yield call(getOcctlUsers)
    yield put(fetchOcctlUsersSuccess(response))
  } catch (error) {
    yield put(fetchOcctlUsersError(error))
  }
}

function* fetchOcctlUser({payload: user}) {
  try {
    const response = yield call(getOcctlUser, user)
    yield put(fetchOcctlUserSuccess(response))
  } catch (error) {
    yield put(fetchOcctlUserError(error))
  }
}

function* disconnectOcctlUser({payload: id}) {
  try {
    const response = yield call(getDisconnectOcctlUser, id)
    yield put(disconnectUserSuccess(response))
  } catch (error) {
    yield put(disconnectUserError(error))
  }
}

function* occtlReset() {
  try {
    yield call(getOcctlReset)
  } catch (error) {
    // yield put(disconnectUserError(error))
  }
}

function* occtlReload() {
  try {
    yield call(getOcctlReload)
  } catch (error) {
    // yield put(disconnectUserError(error))
  }
}

function* occtlStopNow() {
  try {
    yield call(getOcctlStopNow)
  } catch (error) {
    // yield put(disconnectUserError(error))
  }
}

function* occtlStart() {
  try {
    yield call(getOcctlStart)
  } catch (error) {
    // yield put(disconnectUserError(error))
  }
}

function* occtlUpdateUser({payload: data}) {
  try {
    const response = yield call(postUpdateUSer, data)
    yield put(fetchOcctlUsersSuccess(response))
  } catch (error) {
    yield put(fetchOcctlUsersError(error))
  }
}

function* occtlAddUser({payload: data}) {
  try {
    const response = yield call(postAddUSer, data)
    yield put(fetchOcctlUsersSuccess(response))
  } catch (error) {
    yield put(fetchOcctlUsersError(error))
  }
}

function* occtlDeleteUser({payload: data}) {
  try {
    const response = yield call(postDeleteUSer, data)
    yield put(fetchOcctlUsersSuccess(response))
  } catch (error) {
    yield put(fetchOcctlUsersError(error))
  }
}

function* occtlGetUserSession({payload: id}) {
  try {
    const response = yield call(getUserSession, id)
    yield put(occtlGetUserSessionSuccess(response))
  } catch (error) {
    yield put(occtlGetUserSessionError(error))
  }
}

function* fetchOcctlSessions() {
  try {
    const response = yield call(getSessions)
    yield put(fetchOcctlSessionsSuccess(response))
  } catch (error) {
    yield put(fetchOcctlSessionsError(error))
  }
}

function* occtlSaga() {
  yield takeEvery(OCCTL_GET_STATUS, fetchOcctlStatus)
  yield takeEvery(OCCTL_GET_USERS, fetchOcctlUsers)
  yield takeEvery(OCCTL_GET_USER, fetchOcctlUser)
  yield takeEvery(OCCTL_DISCONNECT_USER, disconnectOcctlUser)
  yield takeEvery(OCCTL_RELOAD, occtlReload)
  yield takeEvery(OCCTL_RESET, occtlReset)
  yield takeEvery(OCCTL_STOP_NOW, occtlStopNow)
  yield takeEvery(OCCTL_START, occtlStart)
  yield takeEvery(OCCTL_UPDATE_USER, occtlUpdateUser)
  yield takeEvery(OCCTL_ADD_USER, occtlAddUser)
  yield takeEvery(OCCTL_DELETE_USER, occtlDeleteUser)
  yield takeEvery(OCCTL_USER_SESSION, occtlGetUserSession)
  yield takeEvery(OCCTL_SESSIONS, fetchOcctlSessions)


}

export default occtlSaga
