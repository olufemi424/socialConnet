import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

//get all screams
export const getScreams = () => async dispatch => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get("/scream/all");

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

//get a single scream
export const getScream = screamId => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/scream/${screamId}`);
    dispatch({
      type: SET_SCREAM,
      payload: res.data
    });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    console.log(err);
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
    dispatch(clearErrors());
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

//submit comment
export const submitComment = (screamId, commentData) => async dispatch => {
  try {
    const res = await axios.post(`/scream/comment/${screamId}`, commentData);
    dispatch({ type: SUBMIT_COMMENT, payload: res.data });
    dispatch(clearErrors());
  } catch (err) {
    console.log(err);
    dispatch({ type: SET_ERRORS, payload: err.response.data });
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

export const getUserDetails = userHandle => async dispatch => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get(`/user/${userHandle}`);
    dispatch({ type: SET_SCREAMS, payload: res.data.screams });
  } catch (err) {
    dispatch({ type: SET_SCREAMS, payload: null });
  }
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
