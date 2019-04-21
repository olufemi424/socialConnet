import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButtom";

//actions
import { likeScream, unLikeScream } from "../../store/actions/dataActions";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

export class LikeButton extends Component {
  //check if user has already liked
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.screamId === this.props.screamId)
    ) {
      return true;
    } else return false;
  };
  //like scream action call
  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  //unlike scream action call
  unlikeScream = () => {
    this.props.unLikeScream(this.props.screamId);
  };
  render() {
    const { isAuthenticated } = this.props.user;
    const likeButton = !isAuthenticated ? (
      //direct to login if not authenticated
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      //allow to perform action if authenticated and tuggle like and unlike
      <MyButton tip="Undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  likeScream,
  unLikeScream
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeButton);
