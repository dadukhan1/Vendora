/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { useEffect } from "react";
import { fetchSellerTransactions } from "../../Redux Toolkit/features/seller/transactionSlice";

const StyledTableCell = styled(TableCell)(() => ({
  fontFamily: "Outfit, sans-serif",
  fontWeight: 700,
  fontSize: 13,
  color: "#0a0a0a",
  borderBottom: "1px solid #f0ece6",
  padding: "16px 24px",
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#fafaf8 !important",
  },
}));

export default function TransactionTable() {
  const { transactions } = useAppSelector((store) => store.transaction);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSellerTransactions());
  }, [dispatch]);

  return (
    <TableContainer sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 700 }} aria-label='transaction table'>
        <TableHead>
          <TableRow sx={{ bgcolor: "#fafaf8" }}>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Customer</StyledTableCell>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell align='right'>Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.length > 0 ? (
            transactions.map((transaction) => (
              <StyledTableRow key={transaction?._id}>
                <TableCell
                  sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontFamily: "Outfit",
                      color: "#0a0a0a",
                      fontSize: 13,
                    }}
                  >
                    {new Date(transaction?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontFamily: "Outfit",
                      fontSize: 12,
                    }}
                  >
                    {new Date(transaction?.createdAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontFamily: "Outfit",
                      color: "#0a0a0a",
                      fontSize: 13,
                    }}
                  >
                    {transaction?.user?.fullName || "Guest User"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontFamily: "Outfit",
                      fontSize: 12,
                    }}
                  >
                    {transaction?.user?.email || "No email provided"}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "6px",
                      bgcolor: "#f5f3ef",
                      border: "1px solid #f0ece6",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontFamily: "Outfit",
                        color: "#9ca3af",
                        fontSize: 12,
                      }}
                    >
                      #{transaction?.order?._id?.substring(0, 8).toUpperCase()}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                >
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontFamily: "Outfit",
                      color: "#2d6a4f",
                      fontSize: 14,
                    }}
                  >
                    +${transaction?.amount}
                  </Typography>
                </TableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                align='center'
                sx={{ py: 6, color: "#9ca3af", fontFamily: "Outfit" }}
              >
                No Transactions Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
