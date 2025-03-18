import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage.jsx";
import AdminPage from "./pages/Admin/AdminPage.jsx";

import "./App.css";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeaderboardPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to='/' /> } />
      </Routes>
    </Router>
  );
};

export default App;
