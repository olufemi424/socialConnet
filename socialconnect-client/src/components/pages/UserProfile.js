import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import Scream from "../screams/Scream";
import StaticProfile from "../profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

//actions
import { getUserDetails } from "../../store/actions/dataActions";

export class User extends Component {
  state = { profile: null, screamIdParam: null };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamIdParam: screamId });

    this.props.getUserDetails(handle);
    this.getStaticProfile(handle);
  }

  getStaticProfile = async handle => {
    try {
      const res = await axios.get(`/user/${handle}`);
      this.setState({ profile: res.data.user });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { screams, loading } = this.props;
    const { screamIdParam } = this.state;

    //get user scream mockup
    const userScreams =
      screams.length >= 1 ? (
        !screamIdParam ? (
          screams.map(scream => (
            <Scream key={scream.screamId} scream={scream} />
          ))
        ) : (
          screams.map(scream => {
            if (scream.screamId !== screamIdParam)
              return <Scream key={scream.screamId} scream={scream} />;
            else
              return (
                <Scream key={scream.screamId} scream={scream} openDialog />
              );
          })
        )
      ) : (
        <p>No Scream from user</p>
      );

    const screamsMarkup = loading ? <p>loading...</p> : userScreams;

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading Profile</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserDetails: PropTypes.func.isRequired,
  screams: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  screams: state.data.screams
});

export default connect(
  mapStateToProps,
  { getUserDetails }
)(User);
