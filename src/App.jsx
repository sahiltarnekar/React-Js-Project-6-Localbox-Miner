import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Recipeform from "./components/Recipeform";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './assets/css/main.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Recipeform" element={<Recipeform />} />
      </Routes>
    </Router>
  );
};

export default App;