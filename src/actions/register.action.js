import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
  } from "../Constants";
  import axios from "../configs/axios";
  
  export const setRegisterToSuccess = (payload) => ({
    type: REGISTER_SUCCESS,
    payload,
  });
  
  export const setRegisterToFailed = () => ({
    type: REGISTER_FAILED,
  });
  
  
  
  export const register = ({email,username,password}) => {
    return dispatch => {
      axios.post("/users/register", {
        email,
        username,
        password
      }).then(result => {
        dispatch(setRegisterToSuccess("success"));
      }).catch(err => {
        dispatch(setRegisterToFailed())
      })
    }
  }
  