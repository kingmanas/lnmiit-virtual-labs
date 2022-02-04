import { require } from "ace-builds";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "./editor.css";

import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, Menu, MenuItem } from "@mui/material";

// load assets
const languages = ["c_cpp", "python", "java"];
const themes = ["github", "monokai", "tomorrow", "twilight", "dracula"];
languages.forEach((lang) => {
  require(`ace-builds/src-min-noconflict/mode-${lang}`);
  require(`ace-builds/src-min-noconflict/snippets/${lang}`);
});
themes.forEach((theme) => {
  require(`ace-builds/src-min-noconflict/theme-${theme}`);
});

export default function ProblemEditor({ width, height }) {
  const [settings, changeSetting] = useState({
    mode: "c_cpp",
    fontSize: "18",
    keybindings: "sublime",
    theme: "dracula",
    tabsize: "4",
    width: width,
    height: height,
  });

  const [state, setState] = useState({
    code: "",
    syncStatus: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  const syncCode = async () => {
    axios
      .post({
        method: "post",
        url: "http://localhost:8001/api/sync",
        data: {
          problem_id: state.problem_id,
          code: state.code,
        },
      })
      .then((res) => {
        setState({ syncStatus: true, code: res.data.code });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const interval_id = setInterval(
      () =>
        syncCode()
          .then((res) => {
            if (res.code.length > 0) {
            }
          })
          .then(() => setIsLoading(false))
          .catch(console.log),
      10000
    );
    return () => clearInterval(interval_id);
  });

  // function EditorSettings() {
  //   return (
  //     <>k
  //       <Box sx={{ width: "100%", padding: "10px" }}>daf</Box>
  //     </>
  //   );
  // }

  // settings menu utility
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, v) => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        flexGrow: 1,
        height: settings.height + "px",
        margin: 0,
      }}
    >
      <div
        style={{
          padding: 5,
          marginTop: 0,
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        {/* menu buttons */}
        <Button onClick={handleClick}>{settings.mode}</Button>
        <Button onClick={handleClick}>{settings.theme}</Button>
        <Button onClick={handleClick}>{settings.keybindings}</Button>
        <Button onClick={handleClick}>{settings.fontSize}</Button>
        <Button onClick={handleClick}>{settings.tab}</Button>

        {/* language selection menu */}
        <Menu id="basic-menu" anchorEl={anchorEl} open={open}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

        {/* tabsize menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

        {/* theme selection menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

        {/* keybinding menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

        {/* font size menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
      <AceEditor
        mode={settings.mode}
        keybindings={settings.keybindings}
        theme={settings.theme}
        tabsize={settings.tabsize}
        className="editor"
        width="100%"
        height={settings.height - 100 + "px"}
        style={{ fontSize: settings.fontSize, overflowY: "scroll" }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          tabSize: settings.tabSize,
          showGutter: true,
        }}
      />
      <div style={{ padding: 10 }}>
        <Button
          onClick={console.log}
          sx={{ backgroundColor: "#0063cc", borderColor: "#0063cc" }}
          variant="contained"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
