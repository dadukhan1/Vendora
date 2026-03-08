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
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  deleteCoupon,
  getCoupons,
} from "../../Redux Toolkit/features/admin/couponSlice";

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
export default function Coupon() {
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();

  const { coupons } = useAppSelector((store) => store.adminCoupon);

  useEffect(() => {
    dispatch(getCoupons());
  }, [coupons]);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCoupon(id));
  };

  return (
    <>
      {/* <div className='pb-5 w-60'>
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
      </div> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Coupon Code</StyledTableCell>
              <StyledTableCell align='right'>Start Date</StyledTableCell>
              <StyledTableCell align='right'>End Date</StyledTableCell>
              <StyledTableCell align='right'>Min Order Value</StyledTableCell>
              <StyledTableCell align='right'>Discount</StyledTableCell>
              <StyledTableCell align='right'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <StyledTableRow key={coupon?.code}>
                <StyledTableCell component='th' scope='row'>
                  <div className='flex gap-1 flex-wrap'>{coupon?.code}</div>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {coupon?.validityStartDate}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {coupon?.validityEndDate}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {coupon?.minimumOrderValue}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {coupon?.discountPercentage}%
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <IconButton onClick={() => handleDelete(coupon?._id)}>
                    <Delete color='error' />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
