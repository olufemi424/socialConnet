import axios from "axios";
import { SET_USER, SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from "../types";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/user/login", userData)
    .then(response => {
      const FBIdToken = `Bearer ${response.data.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      axios.defaults.headers.common["Authorization"] = FBIdToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
    });
};

export const getUserData = () => dispatch => {
  axios
    .get("/user/all")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
