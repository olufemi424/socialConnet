import React, { Component } from "react";
import { Link } from "react-router-dom";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

export class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <div className="toolbar-container">
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <div className="toolbar__auth">
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
