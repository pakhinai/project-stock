import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
  } from "../Constants";
  
  const initialState = {
    success: null,
    error: false,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case REGISTER_SUCCESS:
          return {...state, success: payload, error: false}
      case REGISTER_FAILED :
          return {...state, success: null, error: true}
      default:
        return state;
    }
  };
  