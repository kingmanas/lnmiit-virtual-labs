import axios from "axios";
import { Box } from "@mui/system";
import { LinearProgress } from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import React, { useEffect, useState, useContext } from "react";

export const AuthContext = React.createContext();

// The Auth Provider will provide the online status of
// the user whenever we try to access a private route
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  const checkAuth = async () => {
    const res = await axios({
      method: "post",
      url: "http://localhost:8001/auth/verify",
      timeout: 2000,
      withCredentials: true,
    });
    if (res) {
      return res;
    } else {
      throw new Error("USER_VERIFICATION_FAILED");
    }
  };

  const googleLogin = (response) => {
    setIsLoading(true);
    axios({
      method: "post",
      url: "http://localhost:8001/auth/login",
      data: {
        google_token: response.tokenId,
      },
      withCredentials: true,
    })
      .then((res) => {
        setCurrentUser(res.data.username);
        setRole(res.data.role);
        setIsLoading(false);
        console.log(res.data.username + " logged in.");
      })
      .catch(() => {
        console.log("GOOGLE_LOGIN_FAILED");
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    axios({
      url: "http://localhost:8001/auth/logout",
      method: "post",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    setCurrentUser(null);
    setRole(null);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth()
      .then((res) => {
        setCurrentUser(res.data.username);
        setRole(res.data.role);
      })
      .catch(() => {
        setCurrentUser(null);
        setRole(null);
      })
      .then(() => setIsLoading(false));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        role,
        currentUser,
        isLoading,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// PrivateRoute encloses all protected pages which need authentication
export const PrivateRoute = ({ children }) => {
  const { currentUser, isLoading } = useContext(AuthContext);

  console.log(`Private route allowed for user: ${currentUser}`);

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", marginTop: "0" }}>
        <LinearProgress />
      </Box>
    );
  }

  return currentUser ? children : <Navigate to="/login" replace="true" />;
};
