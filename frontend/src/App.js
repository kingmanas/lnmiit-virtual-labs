import "./App.css";

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import Editor from "./components/code_editor/editor";
import NavBar from "./features/navbar/navbar";
import NotFound from "./features/404/404";
import SignIn from "./features/auth/signin";
import SignUp from "./features/auth/signup";
import { PrivateRoute } from "./authContext";
import Labs from "./features/labs/labs";
import Home from "./features/home/home";
import ProblemStatement from "./features/editor/problemStatement";

function NavRoute({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {/* HOME */}
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/home" />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <NavRoute>
                <Home />
              </NavRoute>
            </PrivateRoute>
          }
        />

        {/* PROBLEM FETCHER */}
        <Route
          path="/labs"
          element={
            <PrivateRoute>
              <NavRoute>
                <Labs />
              </NavRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/lab/:lab_id/problem/:problem_id"
          element={<PrivateRoute><ProblemStatement /></PrivateRoute>}
        />

        {/* 404 */}
        <Route element={<NotFound />} />
      </Routes>
    </>
  );
}
