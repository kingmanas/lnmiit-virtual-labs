import "./navbar.css";
import logo from "../../assets/lnmiit_logo-01.png";
import "@fontsource/roboto";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import axios from "axios";

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ScienceIcon from "@mui/icons-material/Science";
import { AuthContext } from "../../authContext";
function NavBarMid() {
  return (
    <div className="navbar-middle">
      <ul>
        <li className="nav-element">
          <Link to="/home">Home</Link>
        </li>
        <li className="nav-element">
          <Link to="/labs">Labs</Link>
        </li>
        <li className="nav-element">
          <Link to="/discuss">Discussions</Link>
        </li>
        <li className="nav-element">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}
export default function NavBar(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { setCurrentUser, setIsLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // sidebar utility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  // responsive utility
  useEffect(() => {
    setWindowWidth(getWindowWidth());
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function logout() {
    axios({
      url: "http://api_server/auth/logout",
      method: "get",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    setCurrentUser(null);
    setIsLoading(false);
    navigate("/", { replace: true });
  }

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="navbar">
      {windowWidth < 748 ? (
        <>
          <SwipeableDrawer
            anchor="left"
            open={sidebarOpen}
            onClose={toggleSidebar}
            onOpen={toggleSidebar}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            transitionDuration={160}
          >
            <Box sx={{ width: 200 }} role="presentation">
              <img src={logo} className="lnmiit-logo-sidebar" />
              <Divider />
              <List>
                <ListItem
                  button
                  key="Home"
                  onClick={() => {
                    toggleSidebar();
                    navigate("/home", { replace: false });
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>

                <ListItem
                  button
                  key="Labs"
                  onClick={() => {
                    toggleSidebar();
                    navigate("/labs", { replace: false });
                  }}
                >
                  <ListItemIcon>
                    <ScienceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Labs" />
                </ListItem>

                <ListItem
                  button
                  key="Discuss"
                  onClick={() => {
                    toggleSidebar();
                    navigate("/discuss", { replace: false });
                  }}
                >
                  <ListItemIcon>
                    <ForumIcon />
                  </ListItemIcon>
                  <ListItemText primary="Discussions" />
                </ListItem>

                <ListItem
                  button
                  key="About"
                  onClick={() => {
                    toggleSidebar();
                    navigate("/about", { replace: true });
                  }}
                >
                  <ListItemIcon>
                    <AutoStoriesIcon />
                  </ListItemIcon>
                  <ListItemText primary="About" />
                </ListItem>
              </List>
            </Box>
          </SwipeableDrawer>
          <MenuIcon
            style={{
              paddingTop: "20px",
              fontSize: "3em",
              color: "#6e6e6e",
              marginRight: "10px",
            }}
            onClick={toggleSidebar}
          />
        </>
      ) : (
        ""
      )}
      <img
        src={logo}
        className="lnmiit-logo"
        style={{ display: windowWidth < 600 ? "none" : "block" }}
      />
      <div className="navbar-left">
        <div style={{ fontSize: "1.5em", paddingTop: "10px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Virtual Labs
          </Link>
          {windowWidth > 748 ? <>&nbsp;&nbsp; | &nbsp;</> : ""}
        </div>
      </div>
      {(() => {
        if (windowWidth > 748) {
          return <NavBarMid />;
        } else return;
      })()}
      <div className="navbar-right">
        <AccountCircleIcon />
        &nbsp; &nbsp;
        <LogoutIcon onClick={logout} />
      </div>
    </div>
  );
}

function getWindowWidth() {
  const width = window.innerWidth;
  return width;
}
