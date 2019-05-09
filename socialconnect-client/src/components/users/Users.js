import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//action
import { getAllUsers } from "../../store/actions/userActions";
// MUI
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

//theme
import theme from "../../util/theme";

export class Users extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    //init daysjs helper middleware
    dayjs.extend(relativeTime);

    const { users, classes } = this.props;
    return (
      <Paper className={classes.paper} style={{ marginTop: 20 }}>
        <List className={classes.root}>
          {users.map(user => (
            <ListItem key={user.userId}>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={user.userImage}
                  className={classes.bigAvatar}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/user/${user.handle}`}
                    color="primary"
                  >
                    {user.handle}
                  </Typography>
                }
                secondary={
                  <Typography variant="body1">
                    Joined {dayjs(user.createdAt).fromNow()}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  users: state.user.users
});

const mapDispatchToProps = {
  getAllUsers
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(theme)(Users));
