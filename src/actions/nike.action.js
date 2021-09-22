import { NIKE_FETCHING, NIKE_SUCCESS, NIKE_FAILED } from "../Constants";
import axios from "../configs/axios";
import localStorageService from "../configs/localStorageService";

export const setNikeToFetching = () => ({
  type: NIKE_FETCHING,
});

export const setNikeToSuccess = (payload) => ({
  type: NIKE_SUCCESS,
  payload,
});

export const setNikeToFailed = () => ({
  type: NIKE_FAILED,
});

export const getNike = () => {
  return async (dispatch) => {
    if (localStorageService.getRole() === "admin") {
      dispatch(setNikeToFetching());
      let result = await axios.get("/nikes");
      dispatch(setNikeToSuccess(result.data));
      console.log("show show show")
    } else {
      dispatch(setNikeToFailed());
    }
  };
};
