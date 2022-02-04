import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useParams } from "react-router";
import { getProblemStatement } from "./editor.client";
import { useState, useEffect } from "react";
import ProblemEditor from "./problemEditor";

function TestCaseView({ test_cases, input, output }) {
  if (!test_cases) return "NOTHING";

  return (
    <>
      <div style={{ fontSize: 30, marginLeft: 30, marginBottom: 15 }}>
        {input == true ? "Input" : "Output"}
      </div>
      {test_cases.map((testCase) => {
        return (
          <div
            style={{
              marginLeft: 32,
              marginBottom: 20,
              fontSize: 15,
              whiteSpace: "pre-line",
            }}
          >
            {testCase.replace(/\\n/g, "\n")}
          </div>
        );
      })}
    </>
  );
}

function StatementView({ statement }) {
  if (!statement) return <CircularProgress />;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: statement }}
      style={{ padding: 30, fontSize: 16, lineHeight: 2 }}
    />
  );
}

function SolutionView({ solution }) {
  if (!solution) return <CircularProgress style={{ margin: "auto" }} />;
  return <div>{solution}</div>;
}

export default function ProblemStatementView() {
  const { problem_id, lab_id } = useParams();
  const [tab, changeTab] = useState(0);
  const [state, setState] = useState({});

  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const eventListener = window.addEventListener("resize", () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      console.log(window.innerWidth, window.innerHeight);
    });

    getProblemStatement(lab_id, problem_id)
      .then((data) => {
        setState(data);
      })
      .catch(console.log);

    return window.removeEventListener("resize", eventListener);
  }, []);

  const handleTabChange = (e, v) => {
    changeTab(v);
    console.log(state);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "row", margin: 0, padding: 0 }}
    >
      <div
        style={{
          minWidth: "500px",
          width:
            screenDimensions.width > 600
              ? screenDimensions.width / 2
              : screenDimensions.width,
        }}
      >
        <div
          style={{
            marginLeft: 12,
            marginTop: 30,
            marginBottom: 20,
            fontSize: 40,
          }}
        >
          {state.problem_id + ". " + state.problem_name}
        </div>
        <Tabs
          onChange={handleTabChange}
          aria-label="Statement and tab switcher."
          value={tab}
        >
          <Tab label="Problem" value={0} />
          <Tab label="Solution" value={1} />
        </Tabs>

        {tab == 0 ? (
          <>
            <StatementView statement={state.problem_statement} />
            <TestCaseView test_cases={state.visible_input} input />
            <TestCaseView test_cases={state.visible_output} output />
          </>
        ) : (
          <SolutionView solution={state.solution} />
        )}
      </div>

      {window.innerWidth > 768 ? (
        <ProblemEditor height={screenDimensions.height} />
      ) : (
        ""
      )}
    </div>
  );
}
