import { PUMA_FETCHING, PUMA_SUCCESS, PUMA_FAILED } from "../Constants";
import axios from "../configs/axios";

export const setPumaToFetching = () => ({
  type: PUMA_FETCHING,
});

export const setPumaToSuccess = (payload) => ({
  type: PUMA_SUCCESS,
  payload,
});

export const setPumaToFailed = () => ({
  type: PUMA_FAILED,
});

export const getPuma = () => {
  return async (dispatch) => {
    dispatch(setPumaToFetching());
    let result = await axios.get("/pumas");
    if (result) {
      dispatch(setPumaToSuccess(result.data));
    } else {
      dispatch(setPumaToFailed());
    }
  };
};

export const getPumaById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setPumaToFetching());
      let result = await axios.get(`/pumas/${id}`);
      dispatch(setPumaToSuccess(result.data));
    } catch (err) {
      dispatch(setPumaToFailed());
    }
  };
};

export const createPuma = (formData, history) => {
  return async (dispatch) => {
    await axios
      .post("/pumas", formData)
      .then((result) => history.push("/puma"))
      .catch((err) => console.log(err));
  };
};

export const editPuma = (formData, id, history) => {
  return async (dispatch) => {
    await axios
      .put(`/pumas/${id}`, formData)
      .then((result) => history.push("/puma"))
      .catch((err) => console.log(err));
  };
};

export const RemovePuma = (id) => {
  return async (dispatch) => {
    await axios.delete(`/pumas/${id}`);
    await getPuma();
  };
};
