import {
  Pagination,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
  Chip,
  Fade,
} from "@mui/material";
import "./lab.css";
import { useEffect, useState } from "react";
import { fetchLabs, labPageCount } from "./lab.client";
import { useNavigate } from "react-router-dom";

// depending on the access permissions the user will be
// given a button to see the problems or a countdown timer
// will be displayed over there

function LabRow(props) {
  const lab = props.lab;

  const navigate = useNavigate();

  return (
    <TableRow
      hover
      onClick={() => {
        navigate(`/lab/${lab.lab_id}/problems`);
      }}
    >
      <TableCell>{lab.title}</TableCell>
      <TableCell align="right">{lab.subject}</TableCell>
      <TableCell align="right">
        {lab.admins.map((admin, i) => (
          <Chip key={i} label={admin} style={{ marginRight: "2px" }} />
        ))}
      </TableCell>
      <TableCell align="right">{new Date(lab.start_time).toString()}</TableCell>
      <TableCell align="right">
        {(new Date(lab.end_time).getTime() -
          new Date(lab.start_time).getTime()) /
          (60 * 60 * 1000)}{" "}
        h
      </TableCell>
    </TableRow>
  );
}

export default function Labs() {
  // the pagination component
  const [state, setState] = useState({
    pageCount: 0,
    currentPage: 0,
    labs: [],
  });

  useEffect(() => {
    // Get the page count
    labPageCount()
      .then((res) => setState({ ...state, pageCount: res.data.pageCount }))
      .catch(console.log);
  }, []);

  useEffect(() => {
    // Fetch the labs for the current page
    fetchLabs(state.currentPage)
      .then((res) => {
        setState({ state, labs: res.data });
      })
      .catch(console.log);
  }, [state.currentPage]);

  return (
    <div className="lab-default">
      <Fade in={true} timeout={300}>
        <TableContainer
          className="lab-table"
          component={Paper}
          style={{ minHeight: "700px" }}
        >
          <Table sx={{ minWidth: 400 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Lab Title</b>
                </TableCell>
                <TableCell align="right">
                  <b>Subject</b>
                </TableCell>
                <TableCell align="right">
                  <b>Writers</b>
                </TableCell>
                <TableCell align="right">
                  <b>Start Time</b>
                </TableCell>
                <TableCell align="right">
                  <b>Length</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.labs.map((lab, i) => (
                <LabRow lab={lab} key={i} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fade>
      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}
        count={state.pageCount}
        page={state.currentPage + 1}
        onChange={(e, v) => setState({ ...state, currentPage: v - 1 })}
      />
    </div>
  );
}
