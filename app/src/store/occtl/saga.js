import { takeEvery, put, call } from "redux-saga/effects"

// Calender Redux States
import {
  OCCTL_DISCONNECT_USER,
  OCCTL_GET_STATUS, OCCTL_GET_USER, OCCTL_GET_USERS, OCCTL_RESET, OCCTL_STOP_NOW
} from "./actionTypes"

import {
  fetchOcctlStatusSuccess,
  fetchOcctlStatusError,
  fetchOcctlUsersError,
  fetchOcctlUsersSuccess,
  fetchOcctlUserError,
  fetchOcctlUserSuccess, disconnectUserSuccess, disconnectUserError
} from "./actions"

//Include Both Helper File with needed methods
import {
  getDisconnectOcctlUser,
  getOcctl,
  getOcctlReset, getOcctlStopNow,
  getOcctlUser,
  getOcctlUsers
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

function* occtlStopNow() {
  try {
    yield call(getOcctlStopNow)
  } catch (error) {
    // yield put(disconnectUserError(error))
  }
}

function* occtlSaga() {
  yield takeEvery(OCCTL_GET_STATUS, fetchOcctlStatus)
  yield takeEvery(OCCTL_GET_USERS, fetchOcctlUsers)
  yield takeEvery(OCCTL_GET_USER, fetchOcctlUser)
  yield takeEvery(OCCTL_DISCONNECT_USER, disconnectOcctlUser)
  yield takeEvery(OCCTL_RESET, occtlReset)
  yield takeEvery(OCCTL_STOP_NOW, occtlStopNow)


}

export default occtlSaga
