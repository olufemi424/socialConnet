import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//actions
import { getScreams } from "../../store/actions/dataActions";

//components
import Scream from "./Scream";
import ScreamSkeleton from "../../util/ScreamSkeleton";

export class Screams extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
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
