/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Box, Typography, Chip } from "@mui/material";
import { useEffect } from "react";
import { Delete, LocalOffer, CalendarToday, Savings } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  deleteCoupon,
  getCoupons,
} from "../../Redux Toolkit/features/admin/couponSlice";

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

export default function Coupon() {
  const dispatch = useAppDispatch();
  const { coupons } = useAppSelector((store) => store.adminCoupon);

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      dispatch(deleteCoupon(id));
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      <Box sx={{ mb: 5, display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { sm: "flex-end" }, gap: 3 }}>
        <Box>
          <Typography variant="overline" sx={{ color: "#c9993a", fontWeight: 700, letterSpacing: 1.5, fontFamily: "Outfit" }}>
            Promotions
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: "Playfair Display", color: "#0a0a0a", mt: 0.5 }}>
            Active Coupons
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ca3af", fontFamily: "Outfit", mt: 1, maxWidth: 500 }}>
            Manage discount codes, track validity periods, and monitor active promotional campaigns.
          </Typography>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid #f0ece6", borderRadius: "24px", overflow: "hidden", bgcolor: "#fff" }}>
        <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid #f0ece6", bgcolor: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#0a0a0a" }}>
            All Coupons
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, fontFamily: "Outfit", color: "#9ca3af", bgcolor: "#f5f3ef", px: 1.5, py: 0.5, borderRadius: "999px" }}>
            {coupons.length} {coupons.length === 1 ? 'Active' : 'Active'}
          </Typography>
        </Box>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 900 }} aria-label="coupon table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#fafaf8" }}>
                <StyledTableCell>Coupon Code</StyledTableCell>
                <StyledTableCell>Validity Period</StyledTableCell>
                <StyledTableCell>Requirements</StyledTableCell>
                <StyledTableCell>Discount</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <LocalOffer sx={{ fontSize: 48, color: "#f0ece6", mb: 2 }} />
                    <Typography sx={{ color: "#9ca3af", fontFamily: "Outfit", fontWeight: 600 }}>
                      No coupons found. Create one to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                coupons.map((coupon) => (
                  <StyledTableRow key={coupon._id}>
                    <TableCell sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}>
                      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 2, py: 1, borderRadius: "8px", bgcolor: "rgba(201,153,58,0.08)", border: "1px dashed rgba(201,153,58,0.3)" }}>
                        <LocalOffer sx={{ fontSize: 14, color: "#c9993a" }} />
                        <Typography sx={{ fontWeight: 800, fontFamily: "Outfit", color: "#c9993a", fontSize: 14, letterSpacing: 1 }}>
                          {coupon.code}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, color: "#0a0a0a", fontSize: 13 }}>
                            {formatDate(coupon.validityStartDate)}
                          </Typography>
                          <Typography sx={{ fontFamily: "Outfit", color: "#9ca3af", fontSize: 12 }}>
                            to
                          </Typography>
                          <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, color: "#0a0a0a", fontSize: 13 }}>
                            {formatDate(coupon.validityEndDate)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <CalendarToday sx={{ fontSize: 12, color: "#9ca3af" }} />
                          <Typography sx={{ fontFamily: "Outfit", color: "#9ca3af", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>
                            Active Timeline
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography sx={{ fontFamily: "Outfit", color: "#9ca3af", fontSize: 13 }}>
                          Min Spend:
                        </Typography>
                        <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, color: "#0a0a0a", fontSize: 14 }}>
                          ${coupon.minimumOrderValue}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}>
                      <Chip 
                        icon={<Savings sx={{ fontSize: 16 }} />} 
                        label={`${coupon.discountPercentage}% OFF`}
                        size="small"
                        sx={{ 
                          fontFamily: "Outfit", 
                          fontWeight: 800, 
                          fontSize: "0.8rem",
                          bgcolor: 'rgba(45,106,79,0.08)',
                          color: '#2d6a4f',
                          border: 'none',
                          px: 1,
                          "& .MuiChip-icon": { color: "inherit", ml: 0.5 }
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}>
                      <IconButton
                        onClick={() => handleDelete(coupon._id)}
                        size="small"
                        sx={{ 
                          color: "#e03c54", 
                          "&:hover": { bgcolor: "rgba(224,60,84,0.08)" } 
                        }}
                      >
                        <Delete sx={{ fontSize: 20 }} />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
