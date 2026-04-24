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
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#1a202c', letterSpacing: '-0.02em' }}>
            Category Hub
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Organize and manage your store's hierarchical structure
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <IconButton
            onClick={() => dispatch(fetchAllCategories())}
            sx={{ 
              bgcolor: 'white', 
              border: '1px solid #e2e8f0',
              '&:hover': { bgcolor: '#f7fafc' }
            }}
          >
            <Refresh className={loading ? "animate-spin" : ""} sx={{ fontSize: 20 }} />
          </IconButton>
          
          <Button
            variant="contained"
            disableElevation
            onClick={() => setShowForm(!showForm)}
            startIcon={showForm ? undefined : <AddCircleOutline />}
            sx={{ 
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 700,
              px: 3,
              bgcolor: showForm ? '#4a5568' : '#0F52FF',
              '&:hover': { bgcolor: showForm ? '#2d3748' : '#0042E0' }
            }}
          >
            {showForm ? "View Hierarchy" : "New Category"}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 4, borderRadius: '12px', border: '1px solid #fed7d7' }}
        >
          {error}
        </Alert>
      )}

      {/* Main Content Area */}
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 2, md: 5 }, 
          borderRadius: '24px', 
          border: '1px solid #edf2f7',
          bgcolor: '#ffffff',
          minHeight: 600,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        }}
      >
        {showForm ? (
          <Box sx={{ maxWidth: 700, mx: 'auto' }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight="800">Assign New Branch</Typography>
              <Typography variant="body2" color="text.secondary">Fill in the details to expand your category tree</Typography>
            </Box>
            <CreateCategoryForm 
              categories={categories} 
              onSuccess={() => setShowForm(false)} 
            />
          </Box>
        ) : (
          <Box>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1, bgcolor: '#ebf4ff', borderRadius: '10px', color: '#0F52FF' }}>
                <CategoryIcon sx={{ fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="800">Store Hierarchy</Typography>
                <Typography variant="caption" color="text.secondary">
                  Showing {categories.length} organized elements across all nesting levels
                </Typography>
              </Box>
            </Box>
            
            {loading && categories.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress size={30} thickness={5} sx={{ color: '#0F52FF' }} />
              </Box>
            ) : (
              <Box sx={{ bgcolor: '#f8fafc', p: { xs: 2, md: 4 }, borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                <CategoryTree 
                  categories={categories} 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Box>
            )}

            {!loading && categories.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 12 }}>
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
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
        PaperProps={{ sx: { borderRadius: '28px' } }}
      >
        <DialogTitle sx={{ fontWeight: 900, px: 4, pt: 4 }}>Refine Category Node</DialogTitle>
        <DialogContent sx={{ px: 0 }}>
          <CreateCategoryForm 
            categories={categories} 
            editCategory={editCategory}
            onSuccess={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 1 }}>
          <Button onClick={() => setIsEditDialogOpen(false)} sx={{ fontWeight: 700, color: 'text.secondary' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManager;
