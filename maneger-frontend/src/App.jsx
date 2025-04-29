import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to={"/contacts"} /> : <Navigate to={"/signup"} />
          }
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/contacts" />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/contacts" />}
        />
        <Route
          path="/contacts"
          element={token ? <Contacts /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
