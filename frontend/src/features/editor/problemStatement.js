import { Chip, Divider, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ProblemStatement() {
  const { problem_id, lab_id } = useParams();

  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tabState, setTabState] = useState(0);

  useEffect(async () => {
    if (state) return;
    const res = axios({
      method: "POST",
      url: "http://localhost:1001/api/lab",
      data: {
        type: "problem/get",
        problem_id: problem_id,
        lab_id: lab_id,
      },
      withCredentials: true,
    });
    if (res.data) {
      setIsLoading(false);
      setState(res.data);
    } else {
      console.log("Error fetching problem!");
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabState(newValue);
  };

  function allyProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  // if (isLoading) return <div>{/* Skeleton */}</div>;
  return (
    <div className="problem-statement">
      <div className="problem-name">state.name</div>
      <div className="problem-stats">state.stats</div>
      <div className="problem-setters">
        {state.problem_setter.map((setter) => {
          return <Chip label={setter} className="problem-setter-chip" />;
        })}
      </div>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabState} onChange={handleTabChange}>
          <Tab label="Problem" {...allyProps(0)} />
          <Tab label="Solution" {...allyProps(1)} />
        </Tabs>
      </Box>

      <div className="problem-statement">state.problem_statement</div>
      <Divider />
      <div className="problem-tests">
        {state.test_cases.map((test_case) => {
          return (
            <>
              <div className="problem-test-no">Test #</div>
              <div className="problem-test-input">{test_case.input}</div>
              <div className="problem-test-output">{test_case.output}</div>
            </>
          );
        })}
      </div>
    </div>
  );
}
