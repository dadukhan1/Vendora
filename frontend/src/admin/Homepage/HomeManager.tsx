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

const HomeManager = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  // Categories from Redux
  const { categories, loading: categoriesLoading } = useAppSelector((state) => state.category);

  // Products Local State (Admin specific fetch)
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
    <Box sx={{ p: 4, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0F172A', mb: 1, tracking: '-0.02em' }}>
          Storefront Manager
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Promote products and categories to the homepage sections.
        </Typography>
      </Box>

      <Paper sx={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2, bgcolor: '#fff' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
              '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', minWidth: 160 }
            }}
          >
            <Tab label="Product Banners" />
            <Tab label="Category Highlights" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3, bgcolor: '#fff' }}>
          <TextField
            fullWidth
            placeholder={activeTab === 0 ? "Search products by name or seller..." : "Search categories..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: { borderRadius: '16px', bgcolor: '#f1f5f9', border: 'none', '& fieldset': { border: 'none' } }
            }}
            sx={{ mb: 4 }}
          />

          {activeTab === 0 ? (
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    <TableCell sx={{ fontWeight: 800 }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>Seller</TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>Price</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 800 }}>Hero Banner</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 800 }}>Staff Pick</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productsLoading ? (
                    <TableRow><TableCell colSpan={5} align="center" sx={{ py: 8 }}><CircularProgress /></TableCell></TableRow>
                  ) : filteredProducts.map((p) => (
                    <TableRow key={p._id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img src={p.images[0]} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover' }} />
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{p.title}</Typography>
                            <Typography variant="caption" color="text.secondary">{p.category?.name}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{p.seller?.sellerName}</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>₹{p.sellingPrice}</TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={p.isBanner}
                          onChange={() => toggleProductBanner(p._id, "isBanner")}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={p.isFeatured}
                          onChange={() => toggleProductBanner(p._id, "isFeatured")}
                          color="error"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    <TableCell sx={{ fontWeight: 800 }}>Category Name</TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>Reference ID</TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>Level</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 800 }}>Show on Home</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoriesLoading ? (
                    <TableRow><TableCell colSpan={4} align="center" sx={{ py: 8 }}><CircularProgress /></TableCell></TableRow>
                  ) : filteredCategories.map((c) => (
                    <TableRow key={c._id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ width: 40, height: 40, bgcolor: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="caption" fontWeight="900" color="primary">{c.name.charAt(0)}</Typography>
                          </Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{c.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{c.categoryId}</TableCell>
                      <TableCell>
                        <Box sx={{ px: 1.5, py: 0.5, bgcolor: '#e0e7ff', color: '#4338ca', borderRadius: '8px', width: 'fit-content', fontSize: '0.75rem', fontWeight: 800 }}>
                          Level {c.level}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={c.showOnHomepage}
                          onChange={() => toggleCategoryHome(c._id)}
                          color="error"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
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
