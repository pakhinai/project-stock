import {
  ADMIN_SUCCESS,
  ADMIN_FETCHING,
  ADMIN_FAILED,
  ADMIN_LOGOUT,
} from "../Constants";
import axios from "../configs/axios";
import localStorageService from "../configs/localStorageService";

// import { useDispatch } from "react-redux";

// const dispatch = useDispatch()

export const setAdminToFetching = () => ({
  type: ADMIN_FETCHING,
});

export const setAdminToSuccess = (payload) => ({
  type: ADMIN_SUCCESS,
  payload,
});

export const setAdminToFailed = () => ({
  type: ADMIN_FAILED,
});

export const setAdminLogout = () => ({
  type: ADMIN_LOGOUT,
});

export const login = ({ username, password, history }) => {
  return async (dispatch) => {
    dispatch(setAdminToFetching());
    // await axios
    //   .post("/admin/login", {
    //     username,
    //     password,
    //   })
    //   .then((result) => {
    //     dispatch(setAdminToSuccess("success"));
    //     localStorageService.setAdminToken(result.data.token);
    //     localStorageService.setRole("admin");
    //     console.log(localStorageService.getRole())
    //     // dispatch(nikeAction.getNike())
    //     history.push("/nike");
    //   })
    //   .catch((err) => {
    //     dispatch(setAdminToFailed());
    //   });
    const result = await axios.post('/admin/login', {username, password})
    if(result.data.message === 'Login suscessfully') {
      localStorageService.setAdminToken(result.data.token)
      localStorageService.setRole("admin")
      dispatch(setAdminToSuccess("success"));
      console.log("Login Success")
      history.push("/nike")
    } else {
      dispatch(setAdminToFailed())
      console.log("Login failed")
    }
  };
};

export const reLogin = () => {
    return dispatch => {
      if(localStorageService.getRole() === "admin") {
        dispatch(setAdminToSuccess({}))
      }
    }
  }
  
  export const logout = ({ history }) => {
    return (dispatch) => {
      localStorageService.removeAdminToken()
      localStorageService.removeRole()
      dispatch(setAdminLogout());
      history.push("/");
    };
  };
