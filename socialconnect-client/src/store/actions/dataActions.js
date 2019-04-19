import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS
} from "../types";
import axios from "axios";

//get all screams
export const getScreams = () => async dispatch => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios("/scream/all");

    dispatch({
      type: SET_SCREAMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_SCREAMS,
      payload: {}
    });
  }
};

//post scream action

export const postScream = screamData => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/scream", screamData);
    dispatch({
      type: POST_SCREAM,
      payload: res.data
    });
    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

// likd a scream
export const likeScream = screamId => async dispatch => {
  try {
    const res = await axios.post(`/scream/like/${screamId}/`);
    dispatch({ type: LIKE_SCREAM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

// likd a scream
export const unLikeScream = screamId => async dispatch => {
  try {
    const res = await axios.post(`/scream/unlike/${screamId}/`);
    dispatch({ type: UNLIKE_SCREAM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteScream = screamId => async dispatch => {
  try {
    axios.delete(`/scream/${screamId}/`).then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    });
  } catch (err) {
    console.log(err);
  }
};
