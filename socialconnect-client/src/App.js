import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// MUI THEME
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//Components
import NavBar from "./components/Navbar";

// PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: "center"
  },
  imageStyle: {
    width: 90,
    height: 90,
    margin: "10px auto"
  },
  textField: {
    margin: "10px auto"
  },
  button: {
    margin: "10px auto",
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    margin: "10px auto"
  },
  progress: {
    position: "absolute"
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
