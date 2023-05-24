import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";

//Occtl
import occtlSaga from "./occtl/saga";

//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(occtlSaga),
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
  ]);
}
