/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Chip, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../Redux Toolkit/features/seller/sellerOrderSlice";

const orderStatus = [
  { color: "#ffa500", label: "PENDING" },
  { color: "#f5bcba", label: "PLACED" },
  { color: "#F5BCBA", label: "CONFIRMED" },
  { color: "#1E90FF", label: "SHIPPED" },
  { color: "#32CD32", label: "DELIVERED" },
  { color: "#FF0000", label: "CANCELLED" },
  { color: "green", label: "PAID" },
];

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

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.sellerOrder);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateItem = (id: any, status: any) => {
    console.log("update item", id, status);
    dispatch(updateOrderStatus({ orderId: id, status }));
    handleClose();
  };

  useEffect(() => {
    dispatch(fetchSellerOrders());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id </StyledTableCell>
            <StyledTableCell>Prodcuts</StyledTableCell>
            <StyledTableCell align='right'>Shopping Address</StyledTableCell>
            <StyledTableCell align='right'>Order Status</StyledTableCell>
            <StyledTableCell align='right'>Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order?._id}>
              <StyledTableCell component='th' scope='row'>
                {order?._id}
              </StyledTableCell>
              <StyledTableCell align='right'>
                <div className='flex gap-1 flex-wrap'>
                  {order?.orderItems?.map((orderItem, index) => (
                    <div key={index} className='flex gap-3 flex-wrap'>
                      <img
                        className='w-20 rounded-md'
                        src={orderItem?.product?.images[0]}
                        alt=''
                      />
                      <div className='flex flex-col items-start py-2'>
                        <h1>Title: {orderItem?.product?.title}</h1>
                        <h1>Price: {orderItem?.product?.sellingPrice}</h1>
                        <h1>Color: {orderItem?.product?.color}</h1>
                        <h1>Size: {orderItem?.product?.size}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </StyledTableCell>
              <StyledTableCell align='right'>
                {`${order?.shippingAddress?.address ?? ""} ${order?.shippingAddress?.locality ?? ""}`}
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Chip color='secondary' label={order.orderStatus} />
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Button onClick={handleClick}>Status</Button>
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
                  {orderStatus.map((status) => (
                    <MenuItem
                      onClick={() => handleUpdateItem(order?._id, status.label)}
                    >
                      {status.label}
                    </MenuItem>
                  ))}
                </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
