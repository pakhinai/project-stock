import {
  ADMIN_SUCCESS,
  ADMIN_FETCHING,
  ADMIN_FAILED,
  ADMIN_LOGOUT,
  } from "../Constants";
  
  const initialState = {
    result: null,
    isFetching: false,
    isError: false,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case ADMIN_FETCHING:
        return {...state, result: null, isFetching: true, isError: false};
      case ADMIN_SUCCESS:
          return {...state, result: payload, isFetching: false, isError: false}
      case ADMIN_FAILED :
          return {...state, result: null, isFetching: false, isError: true}
      case ADMIN_LOGOUT:
          return {initialState}
      default:
        return state;
    }
  };
  