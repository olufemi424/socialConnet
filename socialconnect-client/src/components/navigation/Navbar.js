import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//component
import MyButton from "../../util/MyButtom";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import Notifications from "@material-ui/icons/Notifications";

export class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props;

    const navOption = isAuthenticated ? (
      <Fragment>
        <MyButton tip="post a Scream">
          <AddIcon color="primary" />
        </MyButton>
        <MyButton tip="Notifications">
          <Notifications color="primary" />
        </MyButton>
      </Fragment>
    ) : (
      <Fragment>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Signup
        </Button>
      </Fragment>
    );

    return (
      <AppBar>
        <Toolbar>
          <div className="toolbar-container">
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon color="primary" />
              </MyButton>
            </Link>
            <div className="toolbar__auth">{navOption}</div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propType = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Navbar);
