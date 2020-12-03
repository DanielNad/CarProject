import React from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Roboto",
  },
  h1: {
    color: "#555555",
  },
}));

const Landing = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push("/main");
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center">
        <Grid item xs={12}>
          <h1 className={classes.h1}>Welcome to AUTO!</h1>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleClick} color="primary">
            Check our Cars!
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
