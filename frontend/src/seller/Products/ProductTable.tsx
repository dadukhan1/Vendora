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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  deleteProduct,
  fetchSellerProducts,
  updateProduct,
} from "../../Redux Toolkit/features/seller/sellerProductsSlice";
// import { updateSellerProduct } from "../../Redux Toolkit/features/seller/sellerProductSlice"; // ← wire up when ready

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
    console.log("Updated product:", formData);
    dispatch(
      updateProduct({ productId: selectedProduct._id, productData: formData }),
    );
    handleCloseModal();
  };

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId));
    dispatch(fetchSellerProducts());
  };

  return (
    <>
      {/* ── Table ── */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Images</StyledTableCell>
              <StyledTableCell align='right'>Title</StyledTableCell>
              <StyledTableCell align='right'>MRP</StyledTableCell>
              <StyledTableCell align='right'>Selling Price</StyledTableCell>
              <StyledTableCell align='right'>Stock</StyledTableCell>
              <StyledTableCell align='right'>Update</StyledTableCell>
              <StyledTableCell align='right'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProduct?.products?.length > 0 ? (
              sellerProduct.products.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell component='th' scope='row'>
                    <div className='flex gap-1 flex-wrap'>
                      {item?.images?.map((image: string, index: number) => (
                        <img
                          key={index}
                          className='w-20 rounded-md'
                          src={image}
                          alt=''
                        />
                      ))}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align='right'>{item.title}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {item.mrpPrice}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {item.sellingPrice}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Button
                      size='small'
                      color={item.quantity > 0 ? "success" : "error"}
                    >
                      {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <IconButton
                      color='primary'
                      onClick={() => handleOpenModal(item as Product)}
                    >
                      <Edit />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <IconButton
                      color='error'
                      onClick={() => handleDelete(item?._id)}
                    >
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  No Products Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Edit Modal ── */}
      <Dialog
        style={{ borderRadius: 400 }}
        open={open}
        onClose={handleCloseModal}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Edit Product</DialogTitle>

        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 2 }}
        >
          {/* Title */}
          <TextField
            label='Title'
            fullWidth
            value={formData.title ?? ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          {/* Description */}
          <TextField
            label='Description'
            fullWidth
            multiline
            rows={3}
            value={formData.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          {/* MRP + Selling Price */}
          <div style={{ display: "flex", gap: 12 }}>
            <TextField
              label='MRP Price'
              type='number'
              fullWidth
              value={formData.mrpPrice ?? ""}
              onChange={(e) => handleChange("mrpPrice", Number(e.target.value))}
            />
            <TextField
              label='Selling Price'
              type='number'
              fullWidth
              value={formData.sellingPrice ?? ""}
              onChange={(e) =>
                handleChange("sellingPrice", Number(e.target.value))
              }
            />
          </div>

          {/* Quantity + Discount */}
          <div style={{ display: "flex", gap: 12 }}>
            <TextField
              label='Quantity'
              type='number'
              fullWidth
              value={formData.quantity ?? ""}
              onChange={(e) => handleChange("quantity", Number(e.target.value))}
            />
            <TextField
              label='Discount (%)'
              type='number'
              fullWidth
              value={formData.discount ?? ""}
              onChange={(e) => handleChange("discount", Number(e.target.value))}
            />
          </div>

          {/* Color + Size */}
          <div style={{ display: "flex", gap: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                label='Color'
                value={formData.color ?? ""}
                onChange={(e) => handleChange("color", e.target.value)}
              >
                {COLORS.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select
                label='Size'
                value={formData.size ?? ""}
                onChange={(e) => handleChange("size", e.target.value)}
              >
                {SIZES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseModal} color='inherit'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant='contained'>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
