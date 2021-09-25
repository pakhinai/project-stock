import {
  UNDERARMOUR_FETCHING,
  UNDERARMOUR_SUCCESS,
  UNDERARMOUR_FAILED,
} from "../Constants";

const initialState = {
  underArmourResult: null,
  underArmourFetching: false,
  underArmourError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UNDERARMOUR_FETCHING:
      return {
        ...state,
        underArmourResult: null,
        underArmourFetching: true,
        underArmourError: false,
      };
    case UNDERARMOUR_SUCCESS:
      return {
        ...state,
        underArmourResult: payload,
        underArmourFetching: false,
        underArmourError: false,
      };
    case UNDERARMOUR_FAILED:
      return {
        ...state,
        underArmourResult: null,
        underArmourFetching: false,
        underArmourError: true,
      };
    default:
      return state;
  }
};
