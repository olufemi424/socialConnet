import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";

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

const theme = createMuiTheme(themeFile);

// validate token before app entry
let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
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
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={SignUp}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
