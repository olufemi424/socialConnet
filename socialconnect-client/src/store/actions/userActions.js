import axios from "axios";
import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  UNAUTHORIZED_USER_ERROR,
  MARK_NOTIFICATIONS_READ
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
      dispatch({
        type: UNAUTHORIZED_USER_ERROR,
        payload: "Unauthorized ~ user need to login"
      });
      console.log("Unauthorized ~ user need to login");
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
  try {
    axios.post("/user", userDetails).then(res => {
      dispatch(getUserData());
    });
  } catch (err) {
    console.log(err);
  }
};

export const markNotificationsRead = notificationsId => dispatch => {
  try {
    axios.post("user/notifications", notificationsId).then(res => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    });
  } catch (err) {
    console.log(err);
  }
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
