import axios from "axios";
import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from "../types";

export const loginUser = (userData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/user/login", userData);

    // set token
    setAuthorizationHeader(res.data.token);
    //get user
    dispatch(getUserData());
    //clear errors
    dispatch({ type: CLEAR_ERRORS });
    //push to home
    history.push("/");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    });
  }
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/user/signup", newUserData)
    .then(res => {
      //set token
      setAuthorizationHeader(res.data.token);
      //get user
      dispatch(getUserData());
      //clear errors
      dispatch({ type: CLEAR_ERRORS });
      //push to home
      history.push("/");
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Unauthorized ~ user need to login");
      console.log(err);
    });
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });

  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });

  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
