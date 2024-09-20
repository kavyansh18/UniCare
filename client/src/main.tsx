import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Donors from "./Pages/Donors";
import Register from "./Pages/Register";
import UpdateInfo from "./Pages/UpdateInfo";
import ReactGA from 'react-ga'

ReactGA.initialize('G-C95XH16LSK')
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updateInfo" element={<UpdateInfo />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
