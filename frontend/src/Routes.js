import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
  import React from 'react';
  import Landing from './Components/landing/Landing'
  import CarTable from './Components/main/CarTabel'

const routes = (
  <Router>
      <Route path = "/" component = {Landing} exact = {true} />
      <Route path = "/main" component = {CarTable} exact = {true} />
  </Router>
);

export default routes;