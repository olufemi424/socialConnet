import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//components
import EditDetails from "./EditDetails";
import MyButtom from "../../util/MyButtom";

//actions
import { uploadImage, logoutUser } from "../../store/actions/userActions";

// MUI components
import CalendarToday from "@material-ui/icons/CalendarToday";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// MUI icons
import LanguageIcon from "@material-ui/icons/Language";
import LocationOn from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";

//theme
import theme from "../../util/theme";

export class ProfileDetails extends Component {
  handleImageChange = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);

    //get image from from data
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogOut = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      credentials: { handle, createdAt, imageUrl, bio, website, location }
    } = this.props;

    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img className="profile-image" src={imageUrl} alt={handle} />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              multiple
              onChange={this.handleImageChange}
            />
            <MyButtom
              tip="Edit profile picture"
              onClick={this.handleEditPicture}
              btnClassName="button"
            >
              {" "}
              <EditIcon color="primary" />
            </MyButtom>

            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LanguageIcon color="primary" />
                  <a
                    color="primary"
                    href={website}
                    target="_black"
                    rel="noopener noreferer"
                  >
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
          </div>
          <MyButtom tip="Logout" onClick={this.handleLogOut}>
            {" "}
            <KeyboardReturn color="primary" />
          </MyButtom>
          <EditDetails />
        </div>
      </Paper>
    );
  }
}

ProfileDetails.propTypes = {
  credentials: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

const mapActionsToProps = {
  logoutUser,
  uploadImage
};

export default connect(
  null,
  mapActionsToProps
)(withStyles(theme)(ProfileDetails));
