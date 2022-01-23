import { useState } from "react";

import TextField from "@mui/material/TextField";

// date picker utils
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import axios from "axios";

export default function CreateProblem() {
  const [state, setState] = useState({
    lab_id: 0,

    problem_id: "A",

    problem_name: "Demo Problem",

    problem_setter: "18ucs016",

    difficulty: "HARD",

    memory_limit: 256,

    time_limit: 2000,
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  }

  function handleSubmit() {
    axios({
      method: "post",
      url: "http://localhost:8001/api/problem/create",
      data: state,
      withCredentials: true,
    })
      .then(() => alert("Problem Created!"))
      .catch(console.log);
  }

  return (
    <>
      <Stack
        spacing={3}
        style={{
          paddingRight: "200px",
          paddingLeft: "200px",
          paddingTop: "100px",
        }}
      >
        <div style={{ fontSize: 40 }}>Create a Problem</div>
        <TextField
          name="lab_id"
          required
          id="outlined-required"
          label="Lab ID"
          value={state.lab_id}
          onChange={handleChange}
        />

        <TextField
          name="problem_id"
          required
          id="outlined-required"
          label="Problem ID"
          value={state.problem_id}
          onChange={handleChange}
        />

        <TextField
          name="problem_name"
          required
          id="outlined-required"
          label="Problem Name"
          value={state.problem_name}
          onChange={handleChange}
        />

        <TextField
          name="Setter"
          required
          id="outlined-required"
          label="Problem Setter"
          value={state.problem_setter}
          onChange={handleChange}
        />

        <FormControl fullWidth>
          <InputLabel>Difficulty</InputLabel>
          <Select
            labelId="difficulty"
            value={state.difficulty}
            label="Difficulty"
            onChange={(e) => setState({ ...state, difficulty: e.target.value })}
          >
            <MenuItem value={"EASY"}>Easy</MenuItem>
            <MenuItem value={"MEDIUM"}>Medium</MenuItem>
            <MenuItem value={"HARD"}>Hard</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="memory_limit"
          required
          id="outlined-required"
          label="Memory Limit"
          value={state.memory_limit}
          onChange={handleChange}
        />

        <TextField
          name="time_limit"
          required
          id="outlined-required"
          label="Time Limit"
          value={state.time_limit}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit} variant="contained" color="success">
          Submit
        </Button>
      </Stack>
    </>
  );
}
