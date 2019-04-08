import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

//images
import AppIcon from "../images/connect.png";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  ...theme
});

export class SignUp extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    loading: false,
    errors: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });

    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };

    axios
      .post("/user/login", userData)
      .then(response => {
        localStorage.setItem("FBIdToekn", `Bearer ${response.data.token}`);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({
          errors: error.response.data,
          loading: false
        });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="App Icon" className={classes.imageStyle} />{" "}
          <Typography variant="h2" className={classes.pageTitle}>
            Sign Up
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="Submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              {" "}
              Login
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <br />
            <small>
              Don't have an account ? sign up <Link t0="/signup"> here</Link>{" "}
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

SignUp.propType = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
