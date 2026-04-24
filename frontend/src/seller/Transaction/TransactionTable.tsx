/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { useEffect } from "react";
import { fetchSellerTransactions } from "../../Redux Toolkit/features/seller/transactionSlice";

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





export default function TransactionTable() {
  const { transactions } = useAppSelector((store) => store.transaction);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSellerTransactions());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align='right'>Customer</StyledTableCell>
            <StyledTableCell align='right'>Order</StyledTableCell>
            <StyledTableCell align='right'>Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.map((transaction) => (
            <StyledTableRow key={transaction?._id}>
              <StyledTableCell component='th' scope='row'>
                <div className='flex gap-1 flex-wrap'>
                  {transaction?.createdAt}
                </div>
              </StyledTableCell>
              <StyledTableCell align='right'>
                {transaction?.user?.fullName}
                <br />
                {transaction?.user?.email}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {transaction?.order?._id}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {transaction?.amount}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
