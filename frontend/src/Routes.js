import React, { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import Homepage from "./components/Pages/Homepage";
import Profile from "./components/Pages/Profile";

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/homepage" element={<Homepage />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
}

export default LoginRoutes;
