import { TableCell, TextField } from "@material-ui/core";
import React from "react";
import SnackBar from "./SnackBar";

class Editable extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      ifClick: false,
      data: this.props.data,
      value: this.props.value,
      type: "success",
      message: "",
      open: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(() => {
      return { value: nextProps.value };
    });
  }

  onClickEdit() {
    this.setState(() => {
      return { ifClick: true };
    });
  }

  onChangeValue(event) {
    this.setState(() => {
      const newData = [...this.state.data];
      switch (this.props.type) {
        case "name":
          newData[this.props.index].name = event.target.value;
          return {
            value: event.target.value,
            data: newData,
          };
        case "topSpeed":
          newData[this.props.index].topSpeed = event.target.value;
          return {
            value: event.target.value,
            data: newData,
          };
        case "price":
          newData[this.props.index].price = event.target.value;
          return {
            value: event.target.value,
            data: newData,
          };
        default:
          break;
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.props.handleNewData(this.state.data);
      setTimeout(async () => {
        this.setState(() => {
          return {
            ifClick: false,
          };
        });
      }, 5000);
    }
  }
  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.setState(() => {
      return { open: false };
    });
  }

  render() {
    return (
      <TableCell>
        {this.state.ifClick ? (
          <TextField
            autoFocus
            value={this.state.value}
            onChange={(e) => {
              this.onChangeValue(e);
            }}
            label={this.props.type}
          />
        ) : (
          <div onClick={this.onClickEdit}> {this.state.value}</div>
        )}
        <SnackBar
          handleClose={this.handleClose}
          type={this.state.type}
          message={this.state.message}
          open={this.state.open}
        />
      </TableCell>
    );
  }
}
export default Editable;
