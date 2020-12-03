import React from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Button, Grid, TablePagination } from "@material-ui/core";

import Config from "../../config";
import Editable from "./Editable";
import NewCar from "./NewCar";
import SnackBar from "./SnackBar";
// Babel optional chainning
const useStyles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  h1: {
    fontFamily: "Roboto",
    textAlign: "center",
    color: "#555555",
  },
});

class CarTable extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDeleteCar = this.handleDeleteCar.bind(this);
    this.handleNewData = this.handleNewData.bind(this);
    this.state = {
      data: [],
      page: 0,
      type: "success",
      message: "",
      open: false,
    };
  }

  handleNewData(newData) {
    this.setState(() => {
      return { data: newData };
    });
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.setState(() => {
      return { open: false };
    });
  }

  handleChangePage(event, newPage) {
    this.setState(() => {
      return { page: newPage };
    });
  }

  async fetchData(shouldOpen) {
    try {
      const res = await axios.get(`${Config._URI}/data`, Config._CONFIG);
      let msg;
      if (!res.data) {
        msg = "Something went wrong...";
      } else {
        msg = "Recived data.";
      }
      if (res && res.status === 200) {
        const newData = res.data ? res.data.data : undefined;
        this.setState(() => {
          return {
            data: newData,
            open: shouldOpen,
            type: "success",
            message: msg,
          };
        });
      } else {
        throw new Error(msg);
      }
    } catch (error) {
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
      this.setState(() => {
        return {
          open: shouldOpen,
          type: "error",
          message: msg,
        };
      });
    }
  }

  async handleUpdate(event, car) {
    try {
      const res = await axios.patch(
        `${Config._URI}/data`,
        {
          _id: car._id,
          data: { name: car.name, topSpeed: car.topSpeed, price: car.price },
        },
        Config._CONFIG
      );
      let msg;
      if (!res.data || !res.data.message) {
        msg = "Success";
      } else {
        msg = res.data.message;
      }
      if (res && res.status === 200) {
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
      setTimeout(this.fetchData, 5000, false);
    }
  }

  async handleDeleteCar(event, _id) {
    try {
      const res = await axios.delete(`${Config._URI}/data`, {
        config: Config._CONFIG,
        data: {
          _id: _id,
        },
      });
      let msg;
      if (!res.data || !res.data.message) {
        msg = "Success";
      } else {
        msg = res.data.message;
      }
      if (res && res.status === 200) {
        if (this.state.data) {
          const newData = this.state.data.filter((car) => car._id !== _id);
          this.setState(() => {
            return {
              data: newData,
              open: true,
              type: "success",
              message: msg,
            };
          });
        }
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

  renderTable() {
    return (
      <TableBody>
        {this.state.data &&
          Array.isArray(this.state.data) &&
          // eslint-disable-next-line
          this.state.data.map((car, index) => {
            if (
              index <= (this.state.page + 1) * 5 - 1 &&
              index >= this.state.page * 5
            ) {
              return (
                <TableRow key={car._id}>
                  <Editable
                    handleNewData={this.handleNewData}
                    data={this.state.data}
                    _id={car._id}
                    index={index}
                    type="name"
                    value={car.name}></Editable>
                  <Editable
                    handleNewData={this.handleNewData}
                    data={this.state.data}
                    index={index}
                    _id={car._id}
                    type="topSpeed"
                    value={car.topSpeed}></Editable>
                  <Editable
                    handleNewData={this.handleNewData}
                    data={this.state.data}
                    index={index}
                    _id={car._id}
                    type="price"
                    value={car.price}></Editable>
                  <TableCell align="center">
                    <Button onClick={(e) => this.handleUpdate(e, car)}>
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={(e) => this.handleDeleteCar(e, car._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          })}
      </TableBody>
    );
  }

  componentDidMount() {
    this.fetchData(true);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={10} direction="column" alignItems="center">
          <Grid item xs={12} lg={8}>
            <Grid item xs={12}>
              <h1 className={classes.h1}>Our Cars</h1>
            </Grid>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Car name</TableCell>
                    <TableCell align="center">Top speed</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Update</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                {this.renderTable()}
              </Table>
              <TablePagination
                component="div"
                rowsPerPageOptions={[5]}
                count={this.state.data.length ? this.state.data.length : 0}
                rowsPerPage={5}
                page={this.state.page}
                onChangePage={this.handleChangePage}
              />
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <NewCar fetchData={this.fetchData} />
          </Grid>
        </Grid>
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

export default withStyles(useStyles, { withTheme: true })(CarTable);
