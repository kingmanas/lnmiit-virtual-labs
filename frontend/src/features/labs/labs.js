import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { useEffect, useState } from "react";

const ax = axios.create({
  baseURL: "http://localhost:8001/api/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    username: localStorage.getItem("username"),
  },
  withCredentials: true,
});

export default function Labs() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [num, setNum] = useState(10);
  /*
  useEffect(() => {
    const numberOfLabs = async () => {
      const num = await ax.post("/labs", {
        data: {
          type: "number",
        },
      });
    };

    numberOfLabs();
  });
*/

  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }}>
        <TableBody>Hello</TableBody>
      </Table>
    </TableContainer>
  );
}
