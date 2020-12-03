import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Axios from "axios";
import Config from "../../config";
import SnackBar from "./SnackBar";

const useStyles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  h1: {
    fontFamily: "Roboto",
    textAlign: "center",
    color: "#555555",
  },
  item: {
    margin: "0 1rem",
  },
});

export class NewCar extends React.Component {
  constructor(props) {
    super(props);
    this.handelChangeName = this.handelChangeName.bind(this);
    this.handelChangeSpeed = this.handelChangeSpeed.bind(this);
    this.handelChangePrice = this.handelChangePrice.bind(this);
    this.handleSaveData = this.handleSaveData.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      car: {},
      type: "success",
      message: "",
      open: false,
    };
  }

  handelChangeName(event) {
    event.persist();
    this.setState((prevState) => {
      return {
        car: { ...prevState.car, name: event.target.value },
      };
    });
  }

  handelChangeSpeed(event) {
    event.persist();
    this.setState((prevState) => {
      return {
        car: { ...prevState.car, topSpeed: event.target.value },
      };
    });
  }

  handelChangePrice(event) {
    event.persist();
    this.setState((prevState) => {
      return {
        car: { ...prevState.car, price: event.target.value },
      };
    });
  }

  async handleSaveData(event) {
    event.preventDefault();
    const data = this.state.car;
    try {
      const res = await Axios.post(`${Config._URI}/data`, data, Config._CONFIG);
      let msg;
      if (!res.data || !res.data.message) {
        msg = "Success";
      } else {
        msg = res.data.message;
      }
      if (res && res.status === 201) {
        this.props.fetchData(false);
        this.setState(() => {
          return {
            open: true,
            type: "success",
            message: msg,
          };
        });
      } else {
        throw new Error(msg);
      }
    } catch (error) {
      this.setState(() => {
        let msg;
        if (
          !error.response ||
          !error.response.data ||
          !error.response.data.message
        ) {
          msg = error.message;
        } else {
          msg = error.response.data.message;
        }
        return {
          open: true,
          type: "error",
          message: msg,
        };
      });
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
    const { classes } = this.props;
    return (
      <div>
        <Card variant="outlined">
          <CardContent>
            <h1 className={classes.h1}>Add a new car</h1>
            <form>
              <TextField
                id="CarName"
                label="Car name"
                variant="outlined"
                onChange={this.handelChangeName}
              />
              <TextField
                className={classes.item}
                id="TopSpeed"
                label="Top speed"
                variant="outlined"
                onChange={this.handelChangeSpeed}
              />
              <TextField
                id="Price"
                label="Price"
                variant="outlined"
                onChange={this.handelChangePrice}
              />
              <CardActions
                style={{
                  marginTop: "10px",
                  justifyContent: "center",
                }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={this.handleSaveData}>
                  Add car
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
        <SnackBar
          handleClose={this.handleClose}
          type={this.state.type}
          message={this.state.message}
          open={this.state.open}
        />
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(NewCar);
