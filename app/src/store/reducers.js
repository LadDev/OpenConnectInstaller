import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

//OCCTL
import Occtl from "./occtl/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";


const rootReducer = combineReducers({
    // public
    Layout,
    Occtl,
    Login,
    Account,
    ForgetPassword,
    Profile,
});

export default rootReducer;
