import React, { Component } from "react";
import axios from "axios";

//Components
import Scream from "../components/Scream";

// MUI
import Grid from "@material-ui/core/Grid";

export class Home extends Component {
  state = {
    screams: null
  };

  componentDidMount() {
    axios
      .get("/scream/all")
      .then(res => {
        this.setState({
          screams: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { screams } = this.state;
    console.log(screams);
    let recentScreamsMarkup = screams ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile....</p>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
