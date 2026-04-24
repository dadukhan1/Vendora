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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const accountStatus = [
  { status: "PENDING_VERIFICATION", title: "Pending Verification" },
  { status: "ACTIVE", title: "Active" },
  { status: "SUSPENDED", title: "Suspended" },
  { status: "DEACTIVATED", title: "Deactivated" },
  { status: "BANNED", title: "Banned" },
  { status: "CLOSED", title: "Closed" },
];

export default function SellerTable() {
  const dispatch = useAppDispatch();
  const { sellers } = useAppSelector((store) => store.seller);
  const [status, setStatus] = useState(accountStatus[0].status);

  // Menu and Selection State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedSellerId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedSellerId(null);
  };

  const handleUpdateSeller = async (newStatus: string) => {
    if (selectedSellerId) {
      await dispatch(
        updateSellerAccountStatus({ id: selectedSellerId, status: newStatus }),
      );
      dispatch(fetchSellers(status));
      handleCloseMenu();
    }
  };

  useEffect(() => {
    dispatch(fetchSellers(status));
  }, [status, dispatch]);

  return (
    <>
      <div className='pb-5 w-60'>
        <FormControl fullWidth>
          <InputLabel id='status-filter-label'>Filter Status</InputLabel>
          <Select
            labelId='status-filter-label'
            id='status-filter'
            value={status}
            label='Filter Status'
            onChange={handleStatusFilterChange}
          >
            {accountStatus.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='seller table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell align='right'>Email</StyledTableCell>
              <StyledTableCell align='right'>Mobile</StyledTableCell>
              <StyledTableCell align='right'>GSTIN</StyledTableCell>
              <StyledTableCell align='right'>Business Name</StyledTableCell>
              <StyledTableCell align='right'>Account Status</StyledTableCell>
              <StyledTableCell align='right'>Change Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.map((seller) => (
              <StyledTableRow key={seller?._id}>
                <StyledTableCell component='th' scope='row'>
                  {seller?.sellerName}
                </StyledTableCell>
                <StyledTableCell align='right'>{seller?.email}</StyledTableCell>
                <StyledTableCell align='right'>
                  {seller?.mobile}
                </StyledTableCell>
                <StyledTableCell align='right'>{seller?.GSTIN}</StyledTableCell>
                <StyledTableCell align='right'>
                  {seller?.businessDetails?.businessName}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {seller?.accountStatus}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <IconButton onClick={(e) => handleOpenMenu(e, seller?._id)}>
                    <Edit color='warning' />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Single Menu Instance Shared by All Rows */}
      <Menu
        id='status-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {accountStatus.map((item) => (
          <MenuItem
            key={item.status}
            onClick={() => handleUpdateSeller(item.status)}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
