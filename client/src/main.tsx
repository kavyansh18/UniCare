import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Donors from "./Pages/Donors";
import Register from "./Pages/Register";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
