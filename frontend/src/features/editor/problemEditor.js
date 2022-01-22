import { require } from "ace-builds";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "./editor.css";

import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import axios from "axios";
import { Box } from "@mui/system";

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

export default function ProblemEditor() {
  const [settings, changeSetting] = useState({
    mode: "c_cpp",
    fontSize: "14",
    keybindings: "sublime",
    theme: "dracula",
    tabsize: "4",
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
    syncCode()
      .then(() => setIsLoading(false))
      .catch(console.log);

    return setInterval(() => {
      syncCode();
    }, 10000);
  });

  function EditorSettings() {
    return (
      <>
        <Box sx={{ width: "100%", padding: "10px" }}>daf</Box>
      </>
    );
  }

  return (
    <>
      <EditorSettings className="editor-settings" />
      <AceEditor
        className="editor"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          tabSize: settings.tabSize,
          showGutter: true,
        }}
      />
    </>
  );
}
