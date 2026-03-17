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

const orderStatusOptions = [
  { color: "#ffa500", label: "PENDING" },
  { color: "#3b82f6", label: "CONFIRMED" }, // ✅ ADD
  { color: "#8b5cf6", label: "PROCESSING" }, // ✅ ADD
  { color: "#1E90FF", label: "SHIPPED" },
  { color: "#32CD32", label: "DELIVERED" },
  { color: "#FF0000", label: "CANCELLED" },
];

// 2. Update ALLOWED_TRANSITIONS - FIX the flow
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"], // ✅ CHANGE: was PAID
  CONFIRMED: ["PROCESSING", "CANCELLED"], // ✅ ADD
  PROCESSING: ["SHIPPED"], // ✅ ADD
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

// 3. Update status color map - ADD all statuses
const statusColorMap: Record<string, string> = {
  PENDING: "#ffa500",
  CONFIRMED: "#3b82f6",
  PROCESSING: "#8b5cf6",
  SHIPPED: "#1E90FF",
  DELIVERED: "#32CD32",
  CANCELLED: "#FF0000",
};

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

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.sellerOrder);
  const [anchorEls, setAnchorEls] = useState<
    Record<string, HTMLElement | null>
  >({});
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    orderId: string,
  ) => {
    setAnchorEls((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId: string) => {
    setAnchorEls((prev) => ({ ...prev, [orderId]: null }));
  };

  const handleUpdateItem = (orderId: string, status: string) => {
    dispatch(updateOrderStatus({ orderId, status }));
    handleClose(orderId);
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
                <Chip
                  label={order?.orderStatus}
                  size='small'
                  sx={{
                    backgroundColor:
                      statusColorMap[order.orderStatus] ?? "#ccc",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                />
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Button
                  variant='outlined'
                  size='small'
                  disabled={
                    ALLOWED_TRANSITIONS[order.orderStatus]?.length === 0
                  }
                  onClick={(e) => handleClick(e, order._id)}
                >
                  Status
                </Button>
                <Menu
                  anchorEl={anchorEls[order._id]}
                  open={Boolean(anchorEls[order._id])}
                  onClose={() => handleClose(order._id)}
                >
                  {orderStatusOptions
                    .filter((s) =>
                      (ALLOWED_TRANSITIONS[order.orderStatus] ?? []).includes(
                        s.label,
                      ),
                    )
                    .map((status) => (
                      <MenuItem
                        key={status.label}
                        onClick={() =>
                          handleUpdateItem(order._id, status.label)
                        }
                        sx={{ gap: 1.5 }}
                      >
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: status.color,
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontWeight: 500 }}>{status.label}</span>
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
