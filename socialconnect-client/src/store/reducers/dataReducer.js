import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT
} from "../types";

//INITIAL AUTH STATE OF STORE
const initialState = {
  screams: [],
  scream: {},
  loading: false
};

//SWITCH CASES TESTING FOR ACTIONS TYPES TO UPDATE THE STORE
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
        loading: false
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const newState = { ...state };
      let index = newState.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );

      console.log(index);
      newState.screams[index] = action.payload;
      if (newState.scream.screamId === action.payload.screamId) {
        newState.scream = action.payload;
      }

      return {
        ...newState
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state
      };

    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };

    default:
      return state;
  }
}
