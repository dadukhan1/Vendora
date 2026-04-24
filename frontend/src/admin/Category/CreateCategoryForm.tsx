import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { createCategory, updateCategory, type Category } from "../../Redux Toolkit/features/category/categorySlice.ts";
import toast from "react-hot-toast";
import { Button, TextField, MenuItem, Typography, Box } from "@mui/material";

interface CreateCategoryFormProps {
  categories: Category[];
  onSuccess: () => void;
  editCategory?: Category | null;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ categories, onSuccess, editCategory }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    image: "",
    parentCategory: "",
  });

  useEffect(() => {
    if (editCategory) {
      setFormData({
        name: editCategory.name || "",
        categoryId: editCategory.categoryId || "",
        image: editCategory.image || "",
        parentCategory: typeof editCategory.parentCategory === 'object' && editCategory.parentCategory !== null 
          ? editCategory.parentCategory._id 
          : (editCategory.parentCategory as string || ""),
      });
    }
  }, [editCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      parentCategory: formData.parentCategory === "" ? null : formData.parentCategory,
    };
    
    if (editCategory) {
      const resultAction = await dispatch(updateCategory({ id: editCategory._id, data: payload }));
      if (updateCategory.fulfilled.match(resultAction)) {
        toast.success("Category updated successfully");
        onSuccess();
      } else {
        toast.error("Failed to update category");
      }
    } else {
      const resultAction = await dispatch(createCategory(payload));
      if (createCategory.fulfilled.match(resultAction)) {
        setFormData({ name: "", categoryId: "", image: "", parentCategory: "" });
        toast.success("Category created successfully");
        onSuccess();
      } else if (createCategory.rejected.match(resultAction)) {
        toast.error(resultAction.payload || "Failed to create category");
      }
    }
  };

  const hasChildren = categories.some((cat) => {
    if (typeof cat.parentCategory === 'object' && cat.parentCategory !== null) {
      return cat.parentCategory._id === editCategory?._id;
    }
    return cat.parentCategory === editCategory?._id;
  });

  return (
    <Box sx={{ p: 4, borderRadius: '24px', border: editCategory ? 'none' : '1px solid #edf2f7', bgcolor: '#ffffff' }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: '#2d3748' }}>
        {editCategory ? "Update Category Node" : "Configure Category Node"}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <TextField
            fullWidth
            label="Visible Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            variant="outlined"
            placeholder="e.g. Mens Wear"
            slotProps={{
               inputLabel: { shrink: true }
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
          <TextField
            fullWidth
            label="Internal Reference (Slug)"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            variant="outlined"
            placeholder="e.g. mens_clothing"
            slotProps={{
               inputLabel: { shrink: true }
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
          <TextField
            fullWidth
            select
            label="Parent Attachment"
            name="parentCategory"
            value={formData.parentCategory}
            onChange={handleChange}
            variant="outlined"
            disabled={hasChildren}
            helperText={hasChildren ? "Cannot change parent because this category already has sub-categories." : ""}
            slotProps={{
               inputLabel: { shrink: true }
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          >
            <MenuItem value="">
              <em>Root Level (No Parent)</em>
            </MenuItem>
            {categories
              .filter((cat) => (cat.level || 1) < 3 && cat._id !== editCategory?._id)
              .map((cat) => (
                <MenuItem key={cat._id} value={cat._id} sx={{ py: 1.5 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" fontWeight="700">{cat.name}</Typography>
                    <Typography variant="caption" color="text.secondary">ID: {cat.categoryId} • Level {cat.level || 1}</Typography>
                  </Box>
                </MenuItem>
              ))}
          </TextField>
          <TextField
            fullWidth
            label="Cover Image Link"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            variant="outlined"
            placeholder="https://..."
            slotProps={{
               inputLabel: { shrink: true }
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ 
            mt: 5, 
            py: 1.8, 
            borderRadius: '16px', 
            backgroundColor: '#0F52FF', 
            fontWeight: 800,
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: '0 10px 15px -3px rgba(15, 82, 255, 0.2)',
            '&:hover': { backgroundColor: '#0042E0' } 
          }}
        >
          {editCategory ? "Apply Transformations" : "Initialize Category"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateCategoryForm;
