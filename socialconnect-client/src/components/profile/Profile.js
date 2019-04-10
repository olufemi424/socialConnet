import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

//component
import ProfileDetails from "./ProfileDetails";
import ProfileRedirectLinks from "./ProfileRedirectLinks";

//actions
import { getUserData } from "../../store/actions/userActions";

//theme
import theme from "../../util/theme";

class Profile extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    //props
    const {
      classes,
      loading,
      user: { isAuthenticated, credentials }
    } = this.props;

    let profileIsAuthenticated = isAuthenticated ? (
      <ProfileDetails credentials={credentials} classes={classes} />
    ) : (
      <ProfileRedirectLinks classes={classes} />
    );

    let profileMarkup = !loading ? profileIsAuthenticated : <p>Loading...</p>;

    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  getUserData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(theme)(Profile));
