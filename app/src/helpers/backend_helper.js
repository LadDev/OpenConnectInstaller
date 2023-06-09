import { APIClient } from "./api_helper";

import * as url from "./url_helper";
import {POST_GET_ALL_SESSIONS} from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};


export const getOcctl = () => api.get(url.GET_OCCTL_STATUS);
export const getOcctlUsers = () => api.get(url.GET_OCCTL_USERS);
export const getOcctlUser = (user) => api.get(url.GET_OCCTL_USER+`/${user}`);
export const getDisconnectOcctlUser = (user) => api.get(url.GET_OCCTL_USER+`/${user}/disconnect`);
export const getOcctlReload = () => api.get(url.GET_OCCTL_RELOAD);
export const getOcctlReset = () => api.get(url.GET_OCCTL_RESET);
export const getOcctlStopNow = () => api.get(url.GET_OCCTL_STOP_NOW);
export const getOcctlStart= () => api.get(url.GET_OCCTL_START);
export const postAuth = (data) => api.create(url.POST_AUTH,data);
export const postUpdateUSer = (data) => api.create(url.POST_UPDATE_USER,data);
export const postAddUSer = (data) => api.create(url.POST_ADD_USER,data);
export const postDeleteUSer = (data) => api.create(url.POST_DELETE_USER,data);
export const getUserSession = (data) => api.get(url.POST_GET_USER_SESSION+data);
export const getSessions = () => api.get(url.POST_GET_ALL_SESSIONS);
