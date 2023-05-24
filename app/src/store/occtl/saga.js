import { takeEvery, put, call } from "redux-saga/effects"

// Calender Redux States
import {
 OCCTL_GET_STATUS
} from "./actionTypes"

import {
  fetchOcctlStatusSuccess, fetchOcctlStatusError
} from "./actions"

//Include Both Helper File with needed methods
import {getOcctl} from "../../helpers/backend_helper";

function* fetchOcctlStatus() {
  try {
    const response = yield call(getOcctl)
    yield put(fetchOcctlStatusSuccess(response))
  } catch (error) {
    yield put(fetchOcctlStatusError(error))
  }
}

function* occtlSaga() {
  yield takeEvery(OCCTL_GET_STATUS, fetchOcctlStatus)


}

export default occtlSaga
