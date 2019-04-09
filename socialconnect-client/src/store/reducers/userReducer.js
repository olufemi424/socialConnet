import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

//INITIAL AUTH STATE OF STORE
const initialState = {
  isAuthenticated: false,
  credentials: {},
  likes: [],
  notifications: []
};

//SWITCH CASES TESTING FOR ACTIONS TYPES TO UPDATE THE STORE
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        isAuthenticated: true,
        ...action.payload
      };
    default:
      return state;
  }
}
