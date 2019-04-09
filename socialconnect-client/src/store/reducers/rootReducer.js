import { combineReducers } from "redux";

//reducers
import userReducer from "./userReducer";
import dataReducer from "./dataReducer";
import uiReducer from "./uiReducer";

export default combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});
