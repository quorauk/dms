import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Admin } from "./pages/Admin";
import { ScoreBoard } from "./pages/ScoreBoard";

// PALETTE https://paletton.com/#uid=31x0u0knGvnd+KHjkBbtStOuHmw
function App() {
  // useEffect(() => {
  //   const socket = new WebSocket("ws://localhost:3030/echo");

  //   socket.addEventListener("open", () => {
  //     console.log("open");
  //     socket.send("message");
  //   });

  //   // Listen for messages
  //   socket.addEventListener("message", function (event) {
  //     console.log(event);
  //     console.log("Message from server ", event.data);
  //   });
  // });

  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <ScoreBoard />;
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
