import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//rootreducer
import rootReducer from "./reducers/rootReducer";

//GLOBAL INITIAL STATE
const initialState = {};

//Array of middleware
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export default store;
