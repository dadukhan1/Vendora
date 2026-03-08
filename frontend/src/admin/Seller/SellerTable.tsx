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
  Menu,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  fetchSellers,
  updateSellerAccountStatus,
} from "../../Redux Toolkit/features/seller/sellerSlice";
import { Edit } from "@mui/icons-material";

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

const accountStatus = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "The seller's account is pending verification.",
  },
  {
    status: "ACTIVE",
    title: "Active",
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
  const dispatch = useAppDispatch();
  const { sellers } = useAppSelector((store) => store.seller);
  const [status, setStatus] = useState(accountStatus[0].status);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateSeller = (id: any, status: any) => {
    console.log("update item", id, status);
    dispatch(updateSellerAccountStatus({ id, status }));
    handleClose();
  };

  useEffect(() => {
    // dispatch(fetchSellerOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSellers(status));
  }, [status]);

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
            {sellers.map((seller) => (
              <StyledTableRow key={seller?._id}>
                <StyledTableCell component='th' scope='row'>
                  <div className='flex gap-1 flex-wrap'>
                    <p>{seller?.sellerName}</p>
                  </div>
                </StyledTableCell>
                <StyledTableCell align='right'>{seller?.email}</StyledTableCell>
                <StyledTableCell align='right'>{seller.mobile}</StyledTableCell>
                <StyledTableCell align='right'>{seller.GSTIN}</StyledTableCell>
                <StyledTableCell align='right'>
                  {seller?.bussinessDetails?.bussinessName}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {seller?.accountStatus}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <IconButton onClick={handleClick}>
                    <Edit color='warning' />
                  </IconButton>
                  <Menu
                    id='fade-menu'
                    slotProps={{
                      list: {
                        "aria-labelledby": "fade-button",
                      },
                    }}
                    // slots={{ transition: Fade }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    {accountStatus.map((status) => (
                      <MenuItem
                        onClick={() =>
                          handleUpdateSeller(seller?._id, status.status)
                        }
                      >
                        {status.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
