import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//actions
import { getScreams } from "../../store/actions/dataActions";

//components
import Scream from "./Scream";

export class Screams extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <p>Loading...</p>
    );
    return recentScreamsMarkup;
  }
}

Screams.propTypes = {
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = {
  getScreams
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screams);
