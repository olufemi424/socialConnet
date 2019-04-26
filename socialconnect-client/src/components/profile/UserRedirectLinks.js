import React, { Component } from "react";
import { Link } from "react-router-dom";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//theme
import theme from "../../util/theme";

export class ProfileRedirectLinks extends Component {
  render() {
    const { classes, errors } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          {errors ? errors.message : "No Profile found, please login again"}
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(theme)(ProfileRedirectLinks);
