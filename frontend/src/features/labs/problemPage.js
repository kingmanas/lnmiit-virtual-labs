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
import { fetchLabProblems } from "./lab.client";
import { useNavigate, useParams } from "react-router";

function ProblemPageRow(props) {
  const problem = props.problem;
  const lab_id = props.lab_id;
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      onClick={() => navigate(`/lab/${lab_id}/problem/${problem.problem_id}`)}
    >
      <TableCell align="center">{problem.problem_id}</TableCell>
      <TableCell>{problem.problem_name}</TableCell>
      <TableCell align="right">{problem.score}</TableCell>
    </TableRow>
  );
}

export default function ProblemPage(props) {
  const lab_id = useParams().lab_id;

  // the pagination component
  const [state, setState] = useState({
    problems: [],
  });

  useEffect(() => {
    // Fetch the labs for the current page
    fetchLabProblems(lab_id)
      .then((res) => {
        setState({ state, problems: res.data });
      })
      .catch(console.log);
  }, []);

  return (
    <div className="lab-default">
      <Fade in={true} timeout={300}>
        <TableContainer className="lab-table" component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Problem Name</b>
                </TableCell>
                <TableCell align="right">
                  <b>Score</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.problems.map((problem, i) => (
                <ProblemPageRow problem={problem} key={i} lab_id={lab_id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fade>
    </div>
  );
}
