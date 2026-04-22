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
import {
  deleteDeal,
  getAllDeals,
} from "../../Redux Toolkit/features/admin/dealSlice";

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

export default function DealTable() {
  const dispatch = useAppDispatch();
  const { deals } = useAppSelector((store) => store.deal);

  useEffect(() => {
    dispatch(getAllDeals());
  }, []);

  const deleteDealById = (id: string) => {
    dispatch(deleteDeal(id));
  };

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
            <StyledTableRow key={deal?._id}>
              <StyledTableCell component='th' scope='row'>
                {index}
              </StyledTableCell>
              <StyledTableCell>
                <img
                  className='w-20 rounded-md'
                  src={deal?.category?.image}
                  alt=''
                />
              </StyledTableCell>
              <StyledTableCell>{deal?.category?.name}</StyledTableCell>
              <StyledTableCell align='right'>{deal?.discount}</StyledTableCell>
              <StyledTableCell align='right'>
                <IconButton color='warning'>
                  <Edit />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <IconButton
                  onClick={() => deleteDealById(deal._id)}
                  color='error'
                >
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
