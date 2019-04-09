import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { SET_AUTHENTICATED } from "./store/types";
import { getUserData, logoutUser } from "./store/actions/userActions";

//themefile
import themeFile from "./util/theme";

// MUI THEME
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//Components
import NavBar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

// PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import axios from "axios";

const theme = createMuiTheme(themeFile);

// validate token before app entry
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser);
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData);
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={SignUp} />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
