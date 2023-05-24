import { takeEvery, put, call } from "redux-saga/effects"

// Calender Redux States
import {
  OCCTL_GET_STATUS, OCCTL_GET_USER, OCCTL_GET_USERS
} from "./actionTypes"

import {
  fetchOcctlStatusSuccess,
  fetchOcctlStatusError,
  fetchOcctlUsersError,
  fetchOcctlUsersSuccess,
  fetchOcctlUserError,
  fetchOcctlUserSuccess
} from "./actions"

//Include Both Helper File with needed methods
import {getOcctl, getOcctlUser, getOcctlUsers} from "../../helpers/backend_helper";

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

function* occtlSaga() {
  yield takeEvery(OCCTL_GET_STATUS, fetchOcctlStatus)
  yield takeEvery(OCCTL_GET_USERS, fetchOcctlUsers)
  yield takeEvery(OCCTL_GET_USER, fetchOcctlUser)


}

export default occtlSaga