import { useState } from "react";

import TextField from "@mui/material/TextField";

// date picker utils
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Autocomplete, Button, Stack } from "@mui/material";
import axios from "axios";

export default function CreateLab() {
  const [state, setState] = useState({
    lab_id: 0,
    lab_title: "Demo Lab",
    start_time: Date.now() + 5 * 60 * 1000,
    end_time: Date.now() + 65 * 60 * 1000,
    admins: ["18ucs016, 18ucc082, 18ucc088, preety, sunil"],
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  }

  function handleSubmit() {
    axios({
      method: "post",
      url: "http://localhost:8001/api/create/lab",
      data: state,
      withCredentials: true,
    })
      .then(() => alert("Lab Created!"))
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
        <div style={{ fontSize: 40 }}>Create a Lab Session</div>
        <TextField
          name="lab_id"
          required
          id="outlined-required"
          label="Lab ID"
          value={state.lab_id}
          onChange={handleChange}
        />

        <TextField
          name="lab_title"
          required
          id="outlined-required"
          label="Title"
          value={state.lab_title}
          onChange={handleChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Start Time"
            value={state.start_time}
            onChange={(newValue) => {
              setState({ ...state, start_time: newValue });
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <DateTimePicker
            label="End Time"
            value={state.end_time}
            onChange={(newValue) => {
              setState({ ...state, end_time: newValue });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          name="admins"
          required
          value={state.admins}
          id="outlined-required"
          label="Admins (separated by commas)"
          onChange={(e) => {
            const newAdmins = e.target.value.split(/\s*,\s*/);
            setState({ ...state, admins: newAdmins });
          }}
        />

        <Button onClick={handleSubmit} variant="contained" color="secondary">
          Submit
        </Button>
      </Stack>
    </>
  );
}
