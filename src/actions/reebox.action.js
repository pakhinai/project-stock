import { REEBOX_FETCHING, REEBOX_SUCCESS, REEBOX_FAILED } from "../Constants";
import axios from "../configs/axios";

export const setReeboxToFetching = () => ({
  type: REEBOX_FETCHING,
});

export const setReeboxToSuccess = (payload) => ({
  type: REEBOX_SUCCESS,
  payload,
});

export const setReeboxToFailed = () => ({
  type: REEBOX_FAILED,
});

export const getReebox = () => {
  return async (dispatch) => {
    dispatch(setReeboxToFetching());
    let result = await axios.get("/reeboxes");
    if (result) {
      dispatch(setReeboxToSuccess(result.data));
    } else {
      dispatch(setReeboxToFailed());
    }
  };
};

export const getReeboxById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setReeboxToFetching());
      let result = await axios.get(`/reeboxes/${id}`);
      dispatch(setReeboxToSuccess(result.data));
    } catch (err) {
      dispatch(setReeboxToFailed());
    }
  };
};

export const createReebox = (formData, history) => {
  return async (dispatch) => {
    await axios
      .post("/reeboxes", formData)
      .then((result) => history.push("/reebox"))
      .catch((err) => console.log(err));
  };
};

export const editReebox = (formData, id, history) => {
  return async (dispatch) => {
    await axios
      .put(`/reeboxes/${id}`, formData)
      .then((result) => history.push("/reebox"))
      .catch((err) => console.log(err));
  };
};

export const removeReebox = (id) => {
  return async (dispatch) => {
    await axios.delete(`/reeboxes/${id}`);
    await getReebox();
  };
};
