import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//actions
import { postScream } from "../../store/actions/dataActions";

// MUI components
import MyButton from "../../util/MyButtom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";

// icons
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  ...theme
});

export class PostScream extends Component {
  state = {
    scream: "",
    open: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }

    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ scream: "" });
      this.handleClose();
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, errors: {} });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const postData = {
      body: this.state.scream
    };
    this.props.postScream(postData);
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;

    const { errors } = this.state;

    return (
      <Fragment>
        <MyButton tip="post a Scream" onClick={this.handleOpen}>
          <AddIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="scream"
                tpye="text"
                label="Post Scream"
                multiline
                rows="2"
                className={classes.textField}
                value={this.state.scream}
                helperText={errors.commentError}
                onChange={this.handleChange}
                error={errors.commentError ? true : false}
                fullWidth
              />
              <DialogActions>
                <Button onClick={this.handleSubmit} color="primary">
                  Post{" "}
                  {loading && (
                    <CircularProgress size={25} className={classes.progress} />
                  )}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.protoType = {
  postScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postScream }
)(withStyles(styles)(PostScream));
