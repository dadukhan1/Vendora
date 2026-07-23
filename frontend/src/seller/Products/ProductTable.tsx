/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { Delete, Edit, Close } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  deleteProduct,
  fetchSellerProducts,
  updateProduct,
} from "../../Redux Toolkit/features/seller/sellerProductsSlice";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  _id: string;
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  discount: number;
  quantity: number;
  color: string;
  size: string;
  images: string[];
  category: string;
  seller: string;
}

// ─── Styled Components ────────────────────────────────────────────────────────

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

// ─── Constants ────────────────────────────────────────────────────────────────

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = [
  "Red",
  "Blue",
  "Green",
  "Black",
  "White",
  "Yellow",
  "Pink",
  "Gray",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const { sellerProduct } = useAppSelector((store) => store);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({ ...product });
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedProduct(null);
    setFormData({});
  };

  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!selectedProduct) return;
    dispatch(
      updateProduct({ productId: selectedProduct._id, productData: formData }),
    );
    handleCloseModal();
  };

  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
      dispatch(fetchSellerProducts());
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      fontSize: "0.85rem",
      "& fieldset": { borderColor: "#f0ece6" },
      "&:hover fieldset": { borderColor: "#d4c4a8" },
      "&.Mui-focused fieldset": { borderColor: "#c9993a" },
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.85rem",
      color: "#9ca3af",
      fontFamily: "Outfit",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#c9993a" },
    "& .MuiInputBase-input": { fontFamily: "Outfit" },
  };

  return (
    <>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 700 }} aria-label='product table'>
          <TableHead>
            <TableRow sx={{ bgcolor: "#fafaf8" }}>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell align='right'>Pricing</StyledTableCell>
              <StyledTableCell align='right'>Stock</StyledTableCell>
              <StyledTableCell align='center'>Edit</StyledTableCell>
              <StyledTableCell align='center'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProduct?.products?.length > 0 ? (
              sellerProduct.products.map((item) => (
                <StyledTableRow key={item._id}>
                  {/* Product Details Cell */}
                  <TableCell
                    sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "10px",
                          bgcolor: "#f5f3ef",
                          border: "1px solid #f0ece6",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {item?.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
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
                            sx={{ fontFamily: "Outfit" }}
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
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant='caption'
                          sx={{ color: "#9ca3af", fontFamily: "Outfit" }}
                        >
                          {item.color} • {item.size}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Pricing Cell */}
                  <TableCell
                    align='right'
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
                      ${item.sellingPrice}
                    </Typography>
                    {item.mrpPrice > item.sellingPrice && (
                      <Typography
                        sx={{
                          textDecoration: "line-through",
                          color: "#9ca3af",
                          fontFamily: "Outfit",
                          fontSize: 12,
                        }}
                      >
                        ${item.mrpPrice}
                      </Typography>
                    )}
                  </TableCell>

                  {/* Stock Status Cell */}
                  <TableCell
                    align='right'
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
                        bgcolor:
                          item.quantity > 0
                            ? "rgba(45, 106, 79, 0.08)"
                            : "rgba(224, 60, 84, 0.08)",
                        color: item.quantity > 0 ? "#2d6a4f" : "#e03c54",
                        fontFamily: "Outfit",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {item.quantity > 0
                        ? `${item.quantity} in stock`
                        : "Out of Stock"}
                    </Box>
                  </TableCell>

                  {/* Actions */}
                  <TableCell
                    align='center'
                    sx={{ borderBottom: "1px solid #f0ece6" }}
                  >
                    <IconButton
                      onClick={() => handleOpenModal(item as Product)}
                      size='small'
                      sx={{
                        color: "#c9993a",
                        "&:hover": { bgcolor: "rgba(201,153,58,0.08)" },
                      }}
                    >
                      <Edit sx={{ fontSize: 18 }} />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{ borderBottom: "1px solid #f0ece6" }}
                  >
                    <IconButton
                      onClick={() => handleDelete(item?._id)}
                      size='small'
                      sx={{
                        color: "#e03c54",
                        "&:hover": { bgcolor: "rgba(224,60,84,0.05)" },
                      }}
                    >
                      <Delete sx={{ fontSize: 18 }} />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align='center'
                  sx={{ py: 6, color: "#9ca3af", fontFamily: "Outfit" }}
                >
                  No Products Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Edit Modal ── */}
      <Dialog
        open={open}
        onClose={handleCloseModal}
        maxWidth='sm'
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 1,
            boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
          }}
        >
          <Box>
            <Typography
              variant='h6'
              sx={{ fontWeight: 800, fontFamily: "Outfit", color: "#0a0a0a" }}
            >
              Edit Product
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: "#9ca3af", fontFamily: "Outfit" }}
            >
              Update pricing, inventory, and details.
            </Typography>
          </Box>
          <IconButton onClick={handleCloseModal} sx={{ color: "#9ca3af" }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            pt: "16px !important",
          }}
        >
          <TextField
            label='Title'
            fullWidth
            value={formData.title ?? ""}
            onChange={(e) => handleChange("title", e.target.value)}
            sx={inputSx}
          />

          <TextField
            label='Description'
            fullWidth
            multiline
            rows={3}
            value={formData.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
            sx={inputSx}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label='MRP Price ($)'
              type='number'
              fullWidth
              value={formData.mrpPrice ?? ""}
              onChange={(e) => handleChange("mrpPrice", Number(e.target.value))}
              sx={inputSx}
            />
            <TextField
              label='Selling Price ($)'
              type='number'
              fullWidth
              value={formData.sellingPrice ?? ""}
              onChange={(e) =>
                handleChange("sellingPrice", Number(e.target.value))
              }
              sx={inputSx}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label='Quantity (Stock)'
              type='number'
              fullWidth
              value={formData.quantity ?? ""}
              onChange={(e) => handleChange("quantity", Number(e.target.value))}
              sx={inputSx}
            />
            <TextField
              label='Discount (%)'
              type='number'
              fullWidth
              value={formData.discount ?? ""}
              onChange={(e) => handleChange("discount", Number(e.target.value))}
              sx={inputSx}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth sx={inputSx}>
              <InputLabel>Color</InputLabel>
              <Select
                label='Color'
                value={formData.color ?? ""}
                onChange={(e) => handleChange("color", e.target.value)}
              >
                {COLORS.map((c) => (
                  <MenuItem
                    key={c}
                    value={c}
                    sx={{ fontFamily: "Outfit", fontSize: 14 }}
                  >
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={inputSx}>
              <InputLabel>Size</InputLabel>
              <Select
                label='Size'
                value={formData.size ?? ""}
                onChange={(e) => handleChange("size", e.target.value)}
              >
                {SIZES.map((s) => (
                  <MenuItem
                    key={s}
                    value={s}
                    sx={{ fontFamily: "Outfit", fontSize: 14 }}
                  >
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 3 }}>
          <Button
            onClick={handleCloseModal}
            sx={{
              color: "#9ca3af",
              fontFamily: "Outfit",
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant='contained'
            sx={{
              borderRadius: "9999px",
              bgcolor: "#0a0a0a",
              textTransform: "none",
              fontWeight: 700,
              fontFamily: "Outfit",
              px: 4,
              boxShadow: "none",
              "&:hover": { bgcolor: "#c9993a", boxShadow: "none" },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
