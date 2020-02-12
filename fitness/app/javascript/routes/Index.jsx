import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import CreateUserForm from "../components/CreateUserForm"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create_user" exact component={CreateUserForm} />
    </Switch>
  </Router>
);
