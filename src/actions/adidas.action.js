import { ADIDAS_FETCHING, ADIDAS_SUCCESS, ADIDAS_FAILED } from "../Constants";
import axios from "../configs/axios";

export const setAdidasToFetching = () => ({
  type: ADIDAS_FETCHING,
});

export const setAdidasToSuccess = (payload) => ({
  type: ADIDAS_SUCCESS,
  payload,
});

export const setAdidasToFailed = () => ({
  type: ADIDAS_FAILED,
});

export const getAdidas = () => {
  return async (dispatch) => {
    dispatch(setAdidasToFetching());
    let result = await axios.get("/adidass");
    if (result) {
      dispatch(setAdidasToSuccess(result.data));
    } else {
      dispatch(setAdidasToFailed());
    }
  };
};

export const getAdidasById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setAdidasToFetching());
      let result = await axios.get(`/adidass/${id}`);
      dispatch(setAdidasToSuccess(result.data));
    } catch (err) {
      dispatch(setAdidasToFailed());
    }
  };
};

export const CreateAdidas = (formData, history) => {
  return async (dispatch) => {
    await axios
      .post("/adidass", formData)
      .then((result) => history.push("/adidas"))
      .catch((err) => console.log(err));
  };
};

export const EditAdidas = (formData, id, history) => {
  return async (dispatch) => {
    await axios
      .put(`/adidass/${id}`, formData)
      .then((result) => history.push("/adidas"))
      .catch((err) => console.log(err));
  };
};

export const RemoveAdidas = (id) => {
  return async (dispatch) => {
    await axios.delete(`/adidass/${id}`);
    await getAdidas();
  };
};
