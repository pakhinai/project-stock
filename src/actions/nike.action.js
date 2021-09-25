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
    // if (localStorageService.getRole() === "admin") {
    //   dispatch(setNikeToFetching());
    //   let result = await axios.get("/nikes");
    //   dispatch(setNikeToSuccess(result.data));
    //   console.log("show show show");
    // } else {
    //   dispatch(setNikeToFailed());
    // }
    dispatch(setNikeToFetching());
    let result = await axios.get("/nikes");
    if (result) {
      dispatch(setNikeToSuccess(result.data));
    } else {
      dispatch(setNikeToFailed());
    }
  };
};

export const getNikeById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setNikeToFetching());
      let result = await axios.get(`/nikes/${id}`);
      dispatch(setNikeToSuccess(result.data));
    } catch (err) {
      dispatch(setNikeToFailed());
    }
  };
};

export const CreateNike = (formData, history) => {
  return async (dispatch) => {
    await axios
      .post("/nikes", formData)
      .then((result) => history.push("/nike"))
      .catch((err) => console.log(err));
  };
};

export const EditNike = (formData, id, history) => {
  return async (dispatch) => {
    await axios
      .put(`/nikes/${id}`, formData)
      .then((result) => history.push("/nike"))
      .catch((err) => console.log(err));
  };
};

export const RemoveNike = (id) => {
  return async (dispatch) => {
    await axios.delete(`/nikes/${id}`);
    await getNike();
  };
};
