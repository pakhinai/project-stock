import {
  LOGIN_SUCCESS,
  LOGIN_FETCHING,
  LOGIN_FAILED,
  LOGOUT,
} from "../Constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_FETCHING:
      return {...state, result: null, isFetching: true, isError: false};
    case LOGIN_SUCCESS:
        return {...state, result: payload, isFetching: false, isError: false}
    case LOGIN_FAILED :
        return {...state, result: null, isFetching: false, isError: true}
    case LOGOUT:
        return {initialState}
    default:
      return state;
  }
};
