/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Menu, MenuItem, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../Redux Toolkit/features/seller/sellerOrderSlice";

const orderStatusOptions = [
  { color: "#c9993a", label: "PENDING", bg: "rgba(201, 153, 58, 0.08)" },
  { color: "#3b82f6", label: "CONFIRMED", bg: "rgba(59, 130, 246, 0.08)" },
  { color: "#8b5cf6", label: "PROCESSING", bg: "rgba(139, 92, 246, 0.08)" },
  { color: "#0ea5e9", label: "SHIPPED", bg: "rgba(14, 165, 233, 0.08)" },
  { color: "#2d6a4f", label: "DELIVERED", bg: "rgba(45, 106, 79, 0.08)" },
  { color: "#e03c54", label: "CANCELLED", bg: "rgba(224, 60, 84, 0.08)" },
];

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

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
    <TableContainer sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 800 }} aria-label='order table'>
        <TableHead>
          <TableRow sx={{ bgcolor: "#fafaf8" }}>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell>Product Details</StyledTableCell>
            <StyledTableCell>Shipping</StyledTableCell>
            <StyledTableCell align='center'>Status</StyledTableCell>
            <StyledTableCell align='right'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.length > 0 ? (
            orders.map((order) => {
              const currentStatus =
                orderStatusOptions.find((s) => s.label === order.orderStatus) ||
                orderStatusOptions[0];
              return (
                <StyledTableRow key={order?._id}>
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
                      #{order?._id?.substring(0, 8).toUpperCase()}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {order?.orderItems?.map(
                        (orderItem: any, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: "10px",
                                bgcolor: "#f5f3ef",
                                border: "1px solid #f0ece6",
                                overflow: "hidden",
                                flexShrink: 0,
                              }}
                            >
                              {orderItem?.product?.images?.[0] ? (
                                <img
                                  src={orderItem.product.images[0]}
                                  alt={orderItem.product.title}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <Typography
                                  variant='caption'
                                  fontWeight='800'
                                  color='#c9993a'
                                  sx={{
                                    fontFamily: "Outfit",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                  }}
                                >
                                  Img
                                </Typography>
                              )}
                            </Box>
                            <Box>
                              <Typography
                                variant='subtitle2'
                                sx={{
                                  fontWeight: 700,
                                  fontFamily: "Outfit",
                                  color: "#0a0a0a",
                                  maxWidth: 200,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {orderItem?.product?.title}
                              </Typography>
                              <Typography
                                variant='caption'
                                sx={{ color: "#9ca3af", fontFamily: "Outfit" }}
                              >
                                {orderItem?.product?.color} •{" "}
                                {orderItem?.product?.size} • $
                                {orderItem?.product?.sellingPrice}
                              </Typography>
                            </Box>
                          </Box>
                        ),
                      )}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontFamily: "Outfit",
                        color: "#0a0a0a",
                        fontSize: 13,
                        maxWidth: 200,
                      }}
                    >
                      {order?.shippingAddress?.name ?? "Customer"}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontFamily: "Outfit",
                        fontSize: 12,
                        maxWidth: 200,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {`${order?.shippingAddress?.address ?? ""} ${order?.shippingAddress?.locality ?? ""}`}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 2,
                        py: 0.5,
                        borderRadius: "999px",
                        bgcolor: currentStatus.bg,
                        color: currentStatus.color,
                        fontFamily: "Outfit",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                      }}
                    >
                      {order?.orderStatus}
                    </Box>
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                  >
                    <Button
                      variant='outlined'
                      size='small'
                      disabled={
                        ALLOWED_TRANSITIONS[order.orderStatus]?.length === 0
                      }
                      onClick={(e) => handleClick(e, order._id)}
                      sx={{
                        borderRadius: "999px",
                        textTransform: "none",
                        fontFamily: "Outfit",
                        fontWeight: 700,
                        borderColor: "#f0ece6",
                        color: "#0a0a0a",
                        "&:hover": {
                          borderColor: "#c9993a",
                          bgcolor: "transparent",
                        },
                        "&.Mui-disabled": {
                          borderColor: "#f0ece6",
                          color: "#d1d5db",
                        },
                      }}
                    >
                      Update
                    </Button>
                    <Menu
                      anchorEl={anchorEls[order._id]}
                      open={Boolean(anchorEls[order._id])}
                      onClose={() => handleClose(order._id)}
                      PaperProps={{
                        sx: {
                          borderRadius: "16px",
                          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                          border: "1px solid #f0ece6",
                          mt: 1,
                        },
                      }}
                    >
                      {orderStatusOptions
                        .filter((s) =>
                          (
                            ALLOWED_TRANSITIONS[order.orderStatus] ?? []
                          ).includes(s.label),
                        )
                        .map((status) => (
                          <MenuItem
                            key={status.label}
                            onClick={() =>
                              handleUpdateItem(order._id, status.label)
                            }
                            sx={{
                              gap: 1.5,
                              fontFamily: "Outfit",
                              fontSize: 14,
                              py: 1.5,
                              px: 2,
                            }}
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
                            <span style={{ fontWeight: 600, color: "#0a0a0a" }}>
                              {status.label}
                            </span>
                          </MenuItem>
                        ))}
                    </Menu>
                  </TableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                align='center'
                sx={{ py: 6, color: "#9ca3af", fontFamily: "Outfit" }}
              >
                No Orders Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
