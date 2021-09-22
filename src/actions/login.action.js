import {
  LOGIN_SUCCESS,
  LOGIN_FETCHING,
  LOGIN_FAILED,
  LOGOUT,
} from "../Constants";
import axios from "../configs/axios";
import localStorageService from "../configs/localStorageService";



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
  return (dispatch) => {
    dispatch(setStateToFetching());
    axios.post("/users/login", {
        username,
        password,
      })
      .then((result) => {
        dispatch(setStateToSuccess("success"));
        localStorageService.setUserToken(result.data.token)
        localStorageService.setRole("user")
        history.push("/nike");
      }).catch((err )=> {
          dispatch(setStateToFailed())
      })

  };
};

export const register = ({email,username,password}) => {
  return dispatch => {
    axios.post("/users/register", {
      email,
      username,
      password
    }).then(result => {
      alert("Success")
    }).catch(err => {
      alert("Error")
    })
  }
}

export const reLogin = () => {
  return dispatch => {
    if(localStorageService.getRole() === "user") {
      dispatch(setStateToSuccess({}))
    }
  }
}

export const logout = ({ history }) => {
  return (dispatch) => {
    localStorageService.removeUserToken()
    localStorageService.removeRole()
    dispatch(setStateLogout());
    history.push("/");
  };
};
