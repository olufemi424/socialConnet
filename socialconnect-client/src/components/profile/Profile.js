import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

//component
import ProfileDetails from "./ProfileDetails";
import UserRedirectLinks from "./UserRedirectLinks";
import ProfileSkeleton from "../../util/ProfileSkeleton";

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
      user: { isAuthenticated, credentials, errors, loading }
    } = this.props;

    //skeleton loading
    let profileDetailsIsReady = loading ? (
      <ProfileSkeleton />
    ) : (
      <ProfileDetails credentials={credentials} classes={classes} />
    );
    //is authenticated markup
    let profileIsAuthenticated = isAuthenticated ? (
      profileDetailsIsReady
    ) : (
      <UserRedirectLinks classes={classes} errors={errors} />
    );

    return profileIsAuthenticated;
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
