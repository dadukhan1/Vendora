/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const accountStatus = [
  {
    status: "Pending",
    title: "Pending Verification",
    description: "The seller's account is pending verification.",
  },
  {
    status: "Active",
    title: "ACTIVE",
    description: "The seller's account is active.",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "The seller's account is suspended.",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description: "The seller's account is deactivated.",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "The seller's account is banned.",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "The seller's account is closed.",
  },
];
export default function SellerTable() {
  const [status, setStatus] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <>
      <div className='pb-5 w-60'>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Status</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={status}
            label='Status'
            onChange={handleChange}
          >
            {accountStatus.map((status) => (
              <MenuItem key={status.status} value={status.status}>
                {status.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell align='right'>Email</StyledTableCell>
              <StyledTableCell align='right'>Mobile</StyledTableCell>
              <StyledTableCell align='right'>GSTIN</StyledTableCell>
              <StyledTableCell align='right'>Bussiness Name</StyledTableCell>
              <StyledTableCell align='right'>Account Status</StyledTableCell>
              <StyledTableCell align='right'>Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component='th' scope='row'>
                  <div className='flex gap-1 flex-wrap'>
                    <p>January 26</p>
                    <p>2004 12:32 AM</p>
                  </div>
                </StyledTableCell>
                <StyledTableCell align='right'>{row.calories}</StyledTableCell>
                <StyledTableCell align='right'>{row.fat}</StyledTableCell>
                <StyledTableCell align='right'>{row.carbs}</StyledTableCell>
                <StyledTableCell align='right'>{row.carbs}</StyledTableCell>
                <StyledTableCell align='right'>{row.carbs}</StyledTableCell>
                <StyledTableCell align='right'>{row.carbs}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
