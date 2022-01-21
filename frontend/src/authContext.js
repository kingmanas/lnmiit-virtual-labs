import axios from "axios";
import { Box } from "@mui/system";
import { LinearProgress } from "@mui/material";
import { Navigate } from "react-router";
import React, { useEffect, useState, useContext } from "react";

export const AuthContext = React.createContext();

// The Auth Provider will provide the online status of
// the user whenever we try to access a private route
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const res = await axios({
      method: "post",
      url: "http://localhost:8001/auth/verify",
      timeout: 2000,
      retries: 3,
      withCredentials: true,
    });
    if (res) {
      console.log(res.data.username);
      setCurrentUser(res.data.username);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, setCurrentUser, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// PrivateRoute encloses all protected pages which need authentication
export const PrivateRoute = ({ children }) => {
  const { currentUser, isLoading } = useContext(AuthContext);
  console.log(currentUser);

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", marginTop: "0" }}>
        <LinearProgress />
      </Box>
    );
  }

  return currentUser ? children : <Navigate to="/login" replace="true" />;
};
