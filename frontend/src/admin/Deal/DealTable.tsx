/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { useEffect } from "react";
import { getAllDeals } from "../../Redux Toolkit/features/admin/dealSlice";

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

export default function DealTable() {
  const dispatch = useAppDispatch();
  const { deals } = useAppSelector((store) => store.deal);

  useEffect(() => {
    dispatch(getAllDeals());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell align='right'>Discount</StyledTableCell>
            <StyledTableCell align='right'>Edit</StyledTableCell>
            <StyledTableCell align='right'>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deals.map((deal, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component='th' scope='row'>
                {index}
              </StyledTableCell>
              <StyledTableCell>
                <img className='w-20 rounded-md' src='/img1.jpg' alt='' />
              </StyledTableCell>
              <StyledTableCell>{deal?.category}</StyledTableCell>
              <StyledTableCell align='right'>{deal?.discount}</StyledTableCell>
              <StyledTableCell align='right'>
                <IconButton color='warning'>
                  <Edit />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <IconButton color='error'>
                  <Delete />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
