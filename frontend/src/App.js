import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Admin } from "./pages/Admin";
import { ScoreBoard } from "./pages/ScoreBoard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <ScoreBoard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
