import {
  Pagination,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

// depending on the access permissions the user will be
// given a button to see the problems or a countdown timer
// will be displayed over there

function LabCountdown(props) {}

function LabRow() {}

export default function Labs() {
  // the pagination component
  const [state, setState] = useState({
    pageCount: 5,
    currentPage: 0,
    labs: [],
  });

  useEffect(async () => {
    const instance = axios.create({
      withCredentials: true,
      baseURL: "http://localhost:8001/api/lab",
    });

    const pageCount = await instance.get({ url: "/page_count" });
    if (pageCount) setState({ ...state, pageCount: pageCount });

    const labs = await instance.get({ url: `/${state.currentPage}` });
    if (labs) setState({ ...state, labs: labs });
  }, []);

  return (
    <div className="lab-default">
      <div className="lab-pagination">
        <Pagination
          count={state.pageCount}
          page={state.currentPage + 1}
          onChange={(e, v) => setState({ ...state, currentPage: v - 1 })}
        />
      </div>
      <div className="lab-table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </div>
      <div className="lab-pagination">
        <Pagination
          count={state.pageCount}
          page={state.currentPage + 1}
          onChange={(e, v) => setState({ ...state, currentPage: v - 1 })}
        />
      </div>
    </div>
  );
}
