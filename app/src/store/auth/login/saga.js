import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

import {
  postFakeLogin,

} from "../../../helpers/fakebackend_helper";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postFakeLogin, {
      email: user.email,
      password: user.password,
    });
    sessionStorage.setItem("authUser", JSON.stringify(response));
    if (response.status === "success") {
      yield put(loginSuccess(response));
      history.push("/dashboard");
    } else {
      yield put(apiError(response));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser() {
  try {
    sessionStorage.removeItem("authUser");
    yield put(logoutUserSuccess(LOGOUT_USER, true));
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}


function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
