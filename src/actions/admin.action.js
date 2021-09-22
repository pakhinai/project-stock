import {
  LOGIN_SUCCESS,
  LOGIN_FETCHING,
  LOGIN_FAILED,
  LOGOUT,
} from "../Constants";
import axios from "../configs/axios";
import localStorageService from "../configs/localStorageService";
import * as nikeAction from "./nike.action"

// import { useDispatch } from "react-redux";

// const dispatch = useDispatch()

export const setStateToFetching = () => ({
  type: LOGIN_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setStateToFailed = () => ({
  type: LOGIN_FAILED,
});

export const setStateLogout = () => ({
  type: LOGOUT,
});

export const login = ({ username, password, history }) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    await axios
      .post("/admin/login", {
        username,
        password,
      })
      .then((result) => {
        dispatch(setStateToSuccess("success"));
        localStorageService.setAdminToken(result.data.token);
        localStorageService.setRole("admin");
        // console.log(localStorageService.getRole())
        dispatch(nikeAction.getNike())
        history.push("/nike");
      })
      .catch((err) => {
        dispatch(setStateToFailed());
      });

  };
};

export const reLogin = () => {
    return dispatch => {
      if(localStorageService.getRole() === "admin") {
        dispatch(setStateToSuccess({}))
      }
    }
  }
  
  export const logout = ({ history }) => {
    return (dispatch) => {
      localStorageService.removeAdminToken()
      localStorageService.removeRole()
      dispatch(setStateLogout());
      history.push("/");
    };
  };
