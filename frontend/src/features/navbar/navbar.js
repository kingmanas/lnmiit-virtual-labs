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
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Fade,
} from "@mui/material";

import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ScienceIcon from "@mui/icons-material/Science";
import { AuthContext } from "../../contexts/authContext";

function NavBarMid() {
  const { currentUser, role } = useContext(AuthContext);

  useEffect(() => console.log(currentUser, role));

  return (
    <div className="navbar-middle">
      <Fade in>
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
          {role === "ADMIN" ? (
            <li className="nav-element">
              <Link to="/admin">Admin</Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </Fade>
    </div>
  );
}

export default function NavBar(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { role } = useContext(AuthContext);
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

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const { logout } = useContext(AuthContext);

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
            <Box sx={{ width: "100%", maxwidth: 300 }} role="presentation">
              <img
                src={logo}
                className="lnmiit-logo-sidebar"
                style={{ height: "80px" }}
              />
              <Divider />
              <List sx={{ paddingRight: 8 }}>
                <ListItem key="Home">
                  <ListItemButton
                    sx={{ padding: 0 }}
                    onClick={() => {
                      toggleSidebar();
                      navigate("/home", { replace: false });
                    }}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>

                <ListItem key="Labs">
                  <ListItemButton
                    sx={{ padding: 0 }}
                    onClick={() => {
                      toggleSidebar();
                      navigate("/labs", { replace: false });
                    }}
                  >
                    <ListItemIcon>
                      <ScienceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Labs" />
                  </ListItemButton>
                </ListItem>

                <ListItem key="Discuss">
                  <ListItemButton
                    sx={{ padding: 0 }}
                    onClick={() => {
                      toggleSidebar();
                      navigate("/discuss", { replace: false });
                    }}
                  >
                    <ListItemIcon>
                      <ForumIcon />
                    </ListItemIcon>
                    <ListItemText primary="Discussions" />
                  </ListItemButton>
                </ListItem>

                <ListItem key="About">
                  <ListItemButton
                    sx={{ padding: 0 }}
                    onClick={() => {
                      toggleSidebar();
                      navigate("/about", { replace: true });
                    }}
                  >
                    <ListItemIcon>
                      <AutoStoriesIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                  </ListItemButton>
                </ListItem>

                <ListItem key="Admin">
                  <ListItemButton
                    sx={{ padding: 0 }}
                    onClick={() => {
                      toggleSidebar();
                      navigate("/admin", { replace: true });
                    }}
                  >
                    <ListItemIcon>
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </SwipeableDrawer>
          <MenuIcon
            sx={{
              fontSize: 30,
              marginTop: 2,
              marginRight: 2.5,
              color: "#6e6e6e",
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
