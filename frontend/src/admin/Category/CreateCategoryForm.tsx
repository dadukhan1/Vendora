import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { createCategory, updateCategory, type Category } from "../../Redux Toolkit/features/category/categorySlice.ts";
import toast from "react-hot-toast";
import { Button, TextField, MenuItem, Typography, Box, FormControlLabel, Switch } from "@mui/material";

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
    order: 0,
    isActive: true,
    showOnHomepage: false,
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
        order: editCategory.order || 0,
        isActive: editCategory.isActive !== undefined ? editCategory.isActive : true,
        showOnHomepage: editCategory.showOnHomepage || false,
      });
    }
  }, [editCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    });
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
        setFormData({ name: "", categoryId: "", image: "", parentCategory: "", order: 0, isActive: true, showOnHomepage: false });
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

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      fontSize: "0.85rem",
      "& fieldset": { borderColor: "#f0ece6" },
      "&:hover fieldset": { borderColor: "#d4c4a8" },
      "&.Mui-focused fieldset": { borderColor: "#c9993a" },
    },
    "& .MuiInputLabel-root": { fontSize: "0.85rem", color: "#9ca3af" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#c9993a" },
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, borderRadius: '24px', border: editCategory ? 'none' : '1px solid #f0ece6', bgcolor: '#ffffff' }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: '#0a0a0a', fontFamily: 'Outfit, sans-serif' }}>
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
            slotProps={{ inputLabel: { shrink: true } }}
            sx={textFieldSx}
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
            slotProps={{ inputLabel: { shrink: true } }}
            sx={textFieldSx}
          />

          <TextField
            fullWidth
            label="Display Order"
            name="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
            required
            variant="outlined"
            placeholder="0"
            slotProps={{ inputLabel: { shrink: true } }}
            sx={textFieldSx}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0.5, border: '1px solid #f0ece6', borderRadius: '14px', bgcolor: formData.isActive ? 'transparent' : '#fff5f7' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={handleChange}
                    name="isActive"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": { color: "#c9993a" },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#c9993a" }
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="700" sx={{ fontFamily: "Outfit", color: "#0a0a0a" }}>Category Active</Typography>
                    <Typography variant="caption" sx={{ color: "#9ca3af", fontFamily: "Outfit" }}>Currently {formData.isActive ? 'Visible' : 'Hidden'}</Typography>
                  </Box>
                }
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0.5, border: '1px solid #f0ece6', borderRadius: '14px', bgcolor: formData.showOnHomepage ? 'rgba(201, 153, 58, 0.04)' : 'transparent' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.showOnHomepage}
                    onChange={handleChange}
                    name="showOnHomepage"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": { color: "#c9993a" },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#c9993a" }
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="700" sx={{ fontFamily: "Outfit", color: "#0a0a0a" }}>Promote to Home</Typography>
                    <Typography variant="caption" sx={{ color: "#9ca3af", fontFamily: "Outfit" }}>{formData.showOnHomepage ? 'Featured on Landing' : 'Standard Category'}</Typography>
                  </Box>
                }
              />
            </Box>
          </Box>

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
            slotProps={{ inputLabel: { shrink: true } }}
            sx={textFieldSx}
          >
            <MenuItem value="" sx={{ fontFamily: "Outfit", fontSize: 13 }}>
              <em>Root Level (No Parent)</em>
            </MenuItem>
            {categories
              .filter((cat) => (cat.level || 1) < 3 && cat._id !== editCategory?._id)
              .map((cat) => (
                <MenuItem key={cat._id} value={cat._id} sx={{ py: 1.5, fontFamily: "Outfit", fontSize: 13 }}>
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
            slotProps={{ inputLabel: { shrink: true } }}
            sx={textFieldSx}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 5,
            py: 1.8,
            borderRadius: '9999px',
            backgroundColor: '#0a0a0a',
            fontWeight: 800,
            fontFamily: 'Outfit',
            fontSize: '0.85rem',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#c9993a', boxShadow: 'none' }
          }}
        >
          {editCategory ? "Apply Transformations" : "Initialize Category"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateCategoryForm;
