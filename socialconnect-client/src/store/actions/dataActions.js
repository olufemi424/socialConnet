import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM
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
