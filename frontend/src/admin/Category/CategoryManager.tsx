/** @format */

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { fetchAllCategories, deleteCategory, type Category } from "../../Redux Toolkit/features/category/categorySlice.ts";
import CategoryTree from "./CategoryTree";
import CreateCategoryForm from "./CreateCategoryForm";
import { Alert, CircularProgress, Typography, IconButton, Box, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { AddCircleOutline, Refresh, Category as CategoryIcon } from "@mui/icons-material";
import toast from "react-hot-toast";

const CategoryManager = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector((state) => state.category);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category? All its sub-categories might become unreachable.")) {
      const result = await dispatch(deleteCategory(id));
      if (deleteCategory.fulfilled.match(result)) {
        toast.success("Category deleted");
      } else {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setIsEditDialogOpen(true);
  };

  return (
    <Box sx={{ p: { xs: 0, md: 2 }, maxWidth: 1200, mx: "auto" }}>
      {/* Header Section */}
      <Box sx={{ 
        mb: 4, 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" }, 
        justifyContent: "between",
        gap: 2
      }}>
        <Box sx={{ flex: 1 }}>
          <p className="label-overline text-[#c9993a] mb-1">Structure</p>
          <Typography variant="h4" sx={{ 
            fontWeight: 800, 
            color: "#0a0a0a", 
            fontFamily: "Playfair Display",
            fontSize: { xs: "1.75rem", md: "2.125rem" } 
          }}>
            Category Hub
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", gap: 1.5, width: { xs: "100%", sm: "auto" } }}>
          <IconButton
            onClick={() => dispatch(fetchAllCategories())}
            sx={{ 
              bgcolor: "white", 
              border: "1px solid #f0ece6",
              borderRadius: "12px",
              "&:hover": { bgcolor: "#f5f3ef" }
            }}
          >
            <Refresh className={loading ? "animate-spin" : ""} sx={{ fontSize: 18, color: "#0a0a0a" }} />
          </IconButton>
          
          <Button
            variant="contained"
            disableElevation
            onClick={() => setShowForm(!showForm)}
            startIcon={showForm ? undefined : <AddCircleOutline />}
            sx={{ 
              flex: { xs: 1, sm: "none" },
              borderRadius: "9999px",
              textTransform: "none",
              fontWeight: 700,
              fontFamily: "Outfit",
              fontSize: "0.85rem",
              px: 3,
              bgcolor: "#0a0a0a",
              "&:hover": { bgcolor: "#c9993a" }
            }}
          >
            {showForm ? "View Hierarchy" : "New Category"}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 4, borderRadius: "14px", border: "1px solid #f0ece6", bgcolor: "#fff5f7", color: "#e03c54" }}
        >
          {error}
        </Alert>
      )}

      {/* Main Content Area */}
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: "24px", 
          border: "1px solid #f0ece6",
          bgcolor: "#ffffff",
          minHeight: 500,
        }}
      >
        {showForm ? (
          <Box sx={{ maxWidth: 700, mx: "auto" }}>
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="800" sx={{ fontFamily: "Outfit", color: "#0a0a0a" }}>Assign New Branch</Typography>
              <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5, fontFamily: "Outfit" }}>Fill in the details to expand your category tree</Typography>
            </Box>
            <CreateCategoryForm 
              categories={categories} 
              onSuccess={() => setShowForm(false)} 
            />
          </Box>
        ) : (
          <Box>
            <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ p: 1, bgcolor: "rgba(201,153,58,0.08)", borderRadius: "10px", color: "#c9993a" }}>
                <CategoryIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="700" sx={{ fontFamily: "Outfit", color: "#0a0a0a" }}>Store Hierarchy</Typography>
                <Typography variant="caption" sx={{ color: "#9ca3af", fontFamily: "Outfit" }}>
                  Showing {categories.length} organized elements across all nesting levels
                </Typography>
              </Box>
            </Box>
            
            {loading && categories.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress size={30} thickness={5} sx={{ color: "#c9993a" }} />
              </Box>
            ) : (
              <Box sx={{ bgcolor: "#fafaf8", p: { xs: 1.5, md: 3 }, borderRadius: "20px", border: "1px solid #f0ece6" }}>
                <CategoryTree 
                  categories={categories} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Box>
            )}

            {!loading && categories.length === 0 && (
              <Box sx={{ textAlign: "center", py: 12 }}>
                <Typography variant="body1" sx={{ fontStyle: "italic", color: "#9ca3af", fontFamily: "Outfit" }}>
                  No categories defined yet.
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Paper>

      {/* Update Dialog */}
      <Dialog 
        open={isEditDialogOpen} 
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: "24px", border: "1px solid #f0ece6" } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontFamily: "Outfit", px: 4, pt: 4, color: "#0a0a0a" }}>Refine Category Node</DialogTitle>
        <DialogContent sx={{ px: 0 }}>
          <CreateCategoryForm 
            categories={categories} 
            editCategory={editCategory}
            onSuccess={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 1 }}>
          <Button onClick={() => setIsEditDialogOpen(false)} sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#9ca3af", textTransform: "none" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManager;
