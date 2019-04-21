import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

//components
import MyButton from "../../util/MyButtom";
import LikeButton from "../button/LikeButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative"
  },
  image: {
    minWidth: 200,
    minHeight: 150,
    objectFit: "cover"
  },
  content: {
    padding: 25
  }
};

class Scream extends Component {
  render() {
    //init daysjs helper middleware
    dayjs.extend(relativeTime);

    //destructure props
    const {
      user: {
        isAuthenticated,
        credentials: { handle }
      },
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        commentCount,
        screamId
      }
    } = this.props;

    const deleteButton =
      isAuthenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/user/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body1">{body}</Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          {commentCount}
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  classes: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
