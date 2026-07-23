/** @format */

import { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Switch,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../Redux Toolkit/store";
import { fetchAllCategories } from "../../Redux Toolkit/features/category/categorySlice";
import api from "../../config/api";
import toast from "react-hot-toast";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(() => ({
  fontFamily: "Outfit, sans-serif",
  fontWeight: 700,
  fontSize: 13,
  color: "#0a0a0a",
  borderBottom: "1px solid #f0ece6",
  padding: "16px 20px",
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#fafaf8 !important",
  },
}));

const HomeManager = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  // Categories from Redux
  const { categories, loading: categoriesLoading } = useAppSelector((state) => state.category);

  // Products Local State
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());
    fetchAdminProducts();
  }, [dispatch]);

  const fetchAdminProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await api.get("/admin/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setProductsLoading(false);
    }
  };

  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
    setSearchTerm("");
  };

  const toggleCategoryHome = async (id: string) => {
    try {
      await api.patch(`/admin/categories/${id}/homepage`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(fetchAllCategories()); // Refresh
      toast.success("Home status updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const toggleProductBanner = async (id: string, field: string) => {
    try {
      await api.patch(`/admin/products/${id}/toggle`, { field }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchAdminProducts(); // Refresh
      toast.success(`${field} status updated`);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.categoryId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.seller?.sellerName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      <Box sx={{ mb: 4 }}>
        <p className="label-overline text-[#c9993a] mb-1">Layout Settings</p>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0a0a", fontFamily: "Playfair Display", mb: 1 }}>
          Storefront Manager
        </Typography>
        <Typography variant="body2" sx={{ color: "#9ca3af", fontFamily: "Outfit" }}>
          Promote products and categories directly to the homepage carousel and grids.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid #f0ece6", borderRadius: "24px", overflow: "hidden", bgcolor: "#fff" }}>
        <Box sx={{ borderBottom: 1, borderColor: "#f0ece6", px: 3, pt: 2, bgcolor: "#fff" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTabs-indicator": { height: 2, bgcolor: "#c9993a", borderRadius: "2px" },
              "& .MuiTab-root": {
                fontWeight: 700,
                fontFamily: "Outfit",
                textTransform: "none",
                fontSize: "13px",
                minWidth: 160,
                color: "#9ca3af",
                "&.Mui-selected": { color: "#0a0a0a" }
              }
            }}
          >
            <Tab label="Product Banners" />
            <Tab label="Category Highlights" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3, bgcolor: "#fff" }}>
          <TextField
            fullWidth
            placeholder={activeTab === 0 ? "Search products by name or seller..." : "Search categories..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#9ca3af", fontSize: 18 }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "14px",
                bgcolor: "#f5f3ef",
                fontSize: "13px",
                fontFamily: "Outfit",
                border: "none",
                "& fieldset": { border: "none" }
              }
            }}
            sx={{ mb: 4 }}
          />

          {activeTab === 0 ? (
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#fafaf8" }}>
                    <StyledTableCell>Product</StyledTableCell>
                    <StyledTableCell>Seller</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                    <StyledTableCell align="center">Hero Banner</StyledTableCell>
                    <StyledTableCell align="center">Staff Pick</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productsLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                        <CircularProgress size={24} sx={{ color: "#c9993a" }} />
                      </TableCell>
                    </TableRow>
                  ) : filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6, color: "#9ca3af", fontFamily: "Outfit" }}>
                        No products found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((p) => (
                      <StyledTableRow key={p._id}>
                        <TableCell sx={{ borderBottom: "1px solid #f0ece6" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <img src={p.images[0]} style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover", border: "1px solid #f0ece6" }} />
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#0a0a0a" }}>{p.title}</Typography>
                              <Typography variant="caption" sx={{ color: "#9ca3af", fontFamily: "Outfit" }}>{p.category?.name}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontFamily: "Outfit", color: "#1a1a1a", borderBottom: "1px solid #f0ece6" }}>{p.seller?.sellerName}</TableCell>
                        <TableCell sx={{ fontWeight: 750, fontFamily: "Outfit", color: "#0a0a0a", borderBottom: "1px solid #f0ece6" }}>${p.sellingPrice}</TableCell>
                        <TableCell align="center" sx={{ borderBottom: "1px solid #f0ece6" }}>
                          <Switch
                            checked={p.isBanner}
                            onChange={() => toggleProductBanner(p._id, "isBanner")}
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": { color: "#c9993a" },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#c9993a" }
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: "1px solid #f0ece6" }}>
                          <Switch
                            checked={p.isFeatured}
                            onChange={() => toggleProductBanner(p._id, "isFeatured")}
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": { color: "#e03c54" },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#e03c54" }
                            }}
                          />
                        </TableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#fafaf8" }}>
                    <StyledTableCell>Category Name</StyledTableCell>
                    <StyledTableCell>Reference ID</StyledTableCell>
                    <StyledTableCell>Level</StyledTableCell>
                    <StyledTableCell align="center">Show on Home</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoriesLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                        <CircularProgress size={24} sx={{ color: "#c9993a" }} />
                      </TableCell>
                    </TableRow>
                  ) : filteredCategories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 6, color: "#9ca3af", fontFamily: "Outfit" }}>
                        No categories found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCategories.map((c) => (
                      <StyledTableRow key={c._id}>
                        <TableCell sx={{ borderBottom: "1px solid #f0ece6" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{ width: 36, height: 36, bgcolor: "#f5f3ef", border: "1px solid #f0ece6", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Typography variant="caption" fontWeight="800" color="#c9993a" sx={{ fontFamily: "Outfit" }}>{c.name.charAt(0)}</Typography>
                            </Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#0a0a0a" }}>{c.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontFamily: "monospace", color: "#9ca3af", fontSize: "11px", borderBottom: "1px solid #f0ece6" }}>{c.categoryId}</TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #f0ece6" }}>
                          <Box sx={{ px: 1.5, py: 0.5, bgcolor: "rgba(201,153,58,0.08)", color: "#c9993a", borderRadius: "8px", width: "fit-content", fontSize: "0.75rem", fontWeight: 800, fontFamily: "Outfit" }}>
                            Level {c.level}
                          </Box>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: "1px solid #f0ece6" }}>
                          <Switch
                            checked={c.showOnHomepage}
                            onChange={() => toggleCategoryHome(c._id)}
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": { color: "#e03c54" },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#e03c54" }
                            }}
                          />
                        </TableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default HomeManager;
