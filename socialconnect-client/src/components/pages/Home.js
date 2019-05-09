import React, { Component } from "react";

//Components
import Screams from "../screams/Screams";
import Profile from "../profile/Profile";
import Users from "../users/Users";

// MUI
import Grid from "@material-ui/core/Grid";

export class Home extends Component {
  render() {
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          <Screams />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
          <Users />
        </Grid>
      </Grid>
    );
  }
}

export default Home;
