import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import JobDetails from "./components/JobDetails";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/jobdetail/:id">
          <JobDetails />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
