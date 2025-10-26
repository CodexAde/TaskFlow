import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registering from "../pages/Registering";
import Dashboard from "../pages/Dashboard";
import AllTask from "../pages/AllTask";
import CreateTask from "../pages/CreateTask";
import Hello from "../pages/Hello";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registering />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/allTasks" element={<AllTask />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/hello" element={<Hello />} />

      </Routes>
    </Router>
  );
}
