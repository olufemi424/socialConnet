import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  UNAUTHORIZED_USER_ERROR,
  MARK_NOTIFICATIONS_READ
} from "../types";

//INITIAL AUTH STATE OF STORE
const initialState = {
  isAuthenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  errors: {}
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

    case UNAUTHORIZED_USER_ERROR:
      return {
        ...state,
        errors: { message: action.payload }
      };

    case SET_USER:
      return {
        isAuthenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.screamId !== action.payload.screamId
        )
      };

    case MARK_NOTIFICATIONS_READ:
      const stateCopy = { ...state };
      if (stateCopy.notification) {
        stateCopy.notification.forEach(
          notification => (notification.read = true)
        );
      }
      return {
        ...stateCopy
      };
    default:
      return state;
  }
}
