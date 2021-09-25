import { UNDERARMOUR_FETCHING, UNDERARMOUR_SUCCESS, UNDERARMOUR_FAILED } from "../Constants";
import axios from "../configs/axios";

export const setUnderArmourToFetching = () => ({
  type: UNDERARMOUR_FETCHING,
});

export const setUnderArmourToSuccess = (payload) => ({
  type: UNDERARMOUR_SUCCESS,
  payload,
});

export const setUnderArmourToFailed = () => ({
  type: UNDERARMOUR_FAILED,
});

export const getUnderArmour = () => {
  return async (dispatch) => {
    dispatch(setUnderArmourToFetching());
    let result = await axios.get("/underarmours");
    if (result) {
      dispatch(setUnderArmourToSuccess(result.data));
    } else {
      dispatch(setUnderArmourToFailed());
    }
  };
};

export const getUnderArmourById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setUnderArmourToFetching());
      let result = await axios.get(`/underarmours/${id}`);
      dispatch(setUnderArmourToSuccess(result.data));
    } catch (err) {
      dispatch(setUnderArmourToFailed());
    }
  };
};

export const createUnderArmour = (formData, history) => {
  return async (dispatch) => {
    await axios
      .post("/underarmours", formData)
      .then((result) => history.push("/underarmour"))
      .catch((err) => console.log(err));
  };
};

export const editUnderArmour = (formData, id, history) => {
  return async (dispatch) => {
    await axios
      .put(`/underarmours/${id}`, formData)
      .then((result) => history.push("/underarmour"))
      .catch((err) => console.log(err));
  };
};

export const removeUnderArmour = (id) => {
  return async (dispatch) => {
    await axios.delete(`/underarmours/${id}`);
    await getUnderArmour();
  };
};
