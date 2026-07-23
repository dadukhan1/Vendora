/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, Box, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { useEffect } from "react";
import {
  deleteDeal,
  getAllDeals,
} from "../../Redux Toolkit/features/admin/dealSlice";
import toast from "react-hot-toast";

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

interface Deal {
  _id?: string;
  discount?: number;
  category?: {
    _id: string;
    name: string;
    image: string;
  };
}

export default function DealTable() {
  const dispatch = useAppDispatch();
  const { deals } = useAppSelector((store) => store.deal);

  useEffect(() => {
    dispatch(getAllDeals());
  }, [dispatch]);

  const deleteDealById = (id: string) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      dispatch(deleteDeal(id));
      toast.success("Deal deleted");
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label='deal table'>
        <TableHead>
          <TableRow sx={{ bgcolor: "#fafaf8" }}>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 6, color: "#9ca3af", fontFamily: "Outfit" }}>
                No active deals found.
              </TableCell>
            </TableRow>
          ) : (
            deals.map((deal: Deal) => (
              <StyledTableRow key={deal?._id}>
                <TableCell sx={{ borderBottom: "1px solid #f0ece6", px: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "10px",
                      bgcolor: "#f5f3ef",
                      border: "1px solid #f0ece6",
                      overflow: "hidden"
                    }}>
                      {deal?.category?.image ? (
                        <img src={deal.category.image} alt={deal.category.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Typography variant="caption" fontWeight="800" color="#c9993a" sx={{ fontFamily: "Outfit" }}>
                            {deal?.category?.name?.charAt(0)}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#0a0a0a" }}>
                        {deal?.category?.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", fontFamily: "Outfit" }}>
                        Category Deal
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 800, fontFamily: "Outfit", color: "#2d6a4f", borderBottom: "1px solid #f0ece6", px: 3 }}>
                  {deal?.discount}% OFF
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: "1px solid #f0ece6" }}>
                  <IconButton
                    size="small"
                    sx={{ color: "#c9993a", "&:hover": { bgcolor: "rgba(201,153,58,0.08)" } }}
                  >
                    <Edit sx={{ fontSize: 16 }} />
                  </IconButton>
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: "1px solid #f0ece6" }}>
                  <IconButton
                    onClick={() => deleteDealById(deal._id!)}
                    size="small"
                    sx={{ color: "#e03c54", "&:hover": { bgcolor: "rgba(224,60,84,0.05)" } }}
                  >
                    <Delete sx={{ fontSize: 16 }} />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
