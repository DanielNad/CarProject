import { Snackbar } from "@material-ui/core";
import React, { Component } from "react";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class SnackBar extends Component {
  render() {
    return (
      <Snackbar
        open={this.props.open}
        autoHideDuration={6000}
        onClose={this.props.handleClose}>
        <Alert onClose={this.props.handleClose} severity={this.props.type}>
          {this.props.message}
        </Alert>
      </Snackbar>
    );
  }
}

export default SnackBar;
