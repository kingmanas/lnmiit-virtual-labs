import "./App.css";

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import Editor from "./components/code_editor/editor";
import NavBar from "./features/navbar/navbar";
import NotFound from "./features/404/404";
import SignIn from "./features/auth/signin";
import SignUp from "./features/auth/signup";
import { AuthContext, PrivateRoute } from "./contexts/authContext";
import Labs from "./features/labs/labs";
import Home from "./features/home/home";
import ProblemStatement from "./features/editor/problemStatement";
import ProblemEditor from "./features/editor/problemEditor";
import CreateLab from "./features/admin/createLab";
import CreateProblem from "./features/admin/createProblem";

function NavRoute({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default function App() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!currentUser ? <SignIn /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={!currentUser ? <SignUp /> : <Navigate to="/" />}
        />

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
            <NavRoute>
              <PrivateRoute>
                <Labs />
              </PrivateRoute>
            </NavRoute>
          }
        />

        <Route
          path="/lab/:lab_id/problem/:problem_id"
          element={
            <PrivateRoute>
              <ProblemStatement />
            </PrivateRoute>
          }
        />

        <Route
          path="/editor"
          element={
            <PrivateRoute>
              <ProblemEditor />
            </PrivateRoute>
          }
        />

        <Route
          path="/create/lab"
          element={
            <PrivateRoute>
              <CreateLab />
            </PrivateRoute>
          }
        />

        <Route
          path="/create/problem"
          element={
            <PrivateRoute>
              <CreateProblem />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
