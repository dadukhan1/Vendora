/** @format */

import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { colors } from "../../data/filters/colors";
import { createProduct } from "../../Redux Toolkit/features/seller/sellerProductsSlice";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { fetchAllCategories } from "../../Redux Toolkit/features/category/categorySlice.ts";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const AddProducts = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      discountPrice: "",
      sellingPrice: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      size: "",
      quantity: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("quantity", values.quantity);
      formData.append("mrpPrice", values.mrpPrice);
      formData.append("sellingPrice", values.sellingPrice);
      formData.append("color", values.color);
      formData.append("size", values.size);
      formData.append("category", values.category);
      formData.append("category2", values.category2);
      formData.append("category3", values.category3);

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      const result = await dispatch(createProduct(formData));

      if (result.type.endsWith("/fulfilled")) {
        formik.resetForm();
        setImageFiles([]);
      }
    },
  });

  const { loading } = useAppSelector((store) => store.sellerProduct);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    formik.setFieldValue("images", [...formik.values.images, ...previews]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue("images", newImages);

    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
  };

  const getCategoriesByParentId = (parentCategorySlug: string | null) => {
    return categories.filter((cat) => {
      let catParentSlug: string | null = null;
      if (
        typeof cat.parentCategory === "object" &&
        cat.parentCategory !== null
      ) {
        catParentSlug = (cat.parentCategory as any).categoryId;
      } else {
        catParentSlug =
          categories.find((c) => c._id === cat.parentCategory)?.categoryId ||
          null;
      }
      return (catParentSlug || null) === parentCategorySlug;
    });
  };

  const level1Categories = getCategoriesByParentId(null);
  const level2Categories = formik.values.category
    ? getCategoriesByParentId(formik.values.category)
    : [];
  const level3Categories = formik.values.category2
    ? getCategoriesByParentId(formik.values.category2)
    : [];

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
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      <Box sx={{ mb: 4 }}>
        <p className='label-overline text-[#c9993a] mb-1'>Catalog</p>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 800,
            color: "#0a0a0a",
            fontFamily: "Playfair Display",
            mb: 1,
          }}
        >
          Add Product
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: "#9ca3af", fontFamily: "Outfit" }}
        >
          Create a new product listing for your store.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #f0ece6",
          borderRadius: "24px",
          overflow: "hidden",
          bgcolor: "#fff",
          p: { xs: 3, md: 5 },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant='subtitle2'
                sx={{
                  fontWeight: 700,
                  fontFamily: "Outfit",
                  color: "#0a0a0a",
                  mb: 2,
                }}
              >
                Product Images
              </Typography>
              <Box className='flex flex-wrap gap-4 items-center'>
                <input
                  type='file'
                  accept='image/*'
                  id='fileInput'
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  multiple
                />
                <label htmlFor='fileInput' className='relative'>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      border: "1px dashed #c9993a",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      bgcolor: "rgba(201, 153, 58, 0.05)",
                      transition: "all 0.2s",
                      "&:hover": { bgcolor: "rgba(201, 153, 58, 0.1)" },
                    }}
                  >
                    <AddPhotoAlternate sx={{ color: "#c9993a" }} />
                  </Box>
                </label>

                {formik.values.images.length > 0 &&
                  formik.values.images.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "16px",
                        position: "relative",
                        overflow: "hidden",
                        border: "1px solid #f0ece6",
                      }}
                    >
                      <img
                        src={image}
                        alt={`Product ${index}`}
                        className='w-full h-full object-cover'
                      />
                      <IconButton
                        size='small'
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          bgcolor: "rgba(255,255,255,0.8)",
                          "&:hover": { bgcolor: "#fff" },
                          width: 24,
                          height: 24,
                        }}
                      >
                        <Close sx={{ fontSize: "14px", color: "#e03c54" }} />
                      </IconButton>
                    </Box>
                  ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                id='title'
                name='title'
                label='Title'
                value={formik.values.title}
                onChange={formik.handleChange}
                required
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                id='description'
                name='description'
                label='Description'
                value={formik.values.description}
                onChange={formik.handleChange}
                required
                sx={inputSx}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                fullWidth
                id='quantity'
                name='quantity'
                label='Quantity'
                type='number'
                value={formik.values.quantity}
                onChange={formik.handleChange}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                fullWidth
                id='mrp_price'
                name='mrpPrice'
                label='MRP Price ($)'
                type='number'
                value={formik.values.mrpPrice}
                onChange={formik.handleChange}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                fullWidth
                id='selling_price'
                name='sellingPrice'
                label='Selling Price ($)'
                type='number'
                value={formik.values.sellingPrice}
                onChange={formik.handleChange}
                sx={inputSx}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <FormControl fullWidth required sx={inputSx}>
                <InputLabel id='color-label'>Color</InputLabel>
                <Select
                  id='color'
                  name='color'
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  labelId='color-label'
                  label='Color'
                >
                  <MenuItem
                    value='none'
                    sx={{ fontFamily: "Outfit", fontStyle: "italic" }}
                  >
                    None
                  </MenuItem>
                  {colors.map((color, index) => (
                    <MenuItem
                      key={index}
                      value={color.name}
                      sx={{ fontFamily: "Outfit" }}
                    >
                      {color.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <FormControl fullWidth required sx={inputSx}>
                <InputLabel id='size-label'>Size</InputLabel>
                <Select
                  id='size'
                  name='size'
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  labelId='size-label'
                  label='Size'
                >
                  <MenuItem
                    value='none'
                    sx={{ fontFamily: "Outfit", fontStyle: "italic" }}
                  >
                    None
                  </MenuItem>
                  {sizes.map((size, index) => (
                    <MenuItem
                      key={index}
                      value={size}
                      sx={{ fontFamily: "Outfit" }}
                    >
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <FormControl fullWidth required sx={inputSx}>
                <InputLabel id='category-label'>Main Category</InputLabel>
                <Select
                  id='category'
                  name='category'
                  value={formik.values.category}
                  onChange={(e) => {
                    formik.setFieldValue("category", e.target.value);
                    formik.setFieldValue("category2", "");
                    formik.setFieldValue("category3", "");
                  }}
                  labelId='category-label'
                  label='Main Category'
                >
                  <MenuItem
                    value=''
                    sx={{ fontFamily: "Outfit", fontStyle: "italic" }}
                  >
                    None
                  </MenuItem>
                  {level1Categories.map((category) => (
                    <MenuItem
                      key={category._id}
                      value={category.categoryId}
                      sx={{ fontFamily: "Outfit" }}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <FormControl fullWidth required sx={inputSx}>
                <InputLabel id='category2-label'>Sub Category</InputLabel>
                <Select
                  id='category2'
                  name='category2'
                  value={formik.values.category2}
                  onChange={(e) => {
                    formik.setFieldValue("category2", e.target.value);
                    formik.setFieldValue("category3", "");
                  }}
                  labelId='category2-label'
                  label='Sub Category'
                  disabled={!formik.values.category}
                >
                  <MenuItem
                    value=''
                    sx={{ fontFamily: "Outfit", fontStyle: "italic" }}
                  >
                    None
                  </MenuItem>
                  {level2Categories.map((category) => (
                    <MenuItem
                      key={category._id}
                      value={category.categoryId}
                      sx={{ fontFamily: "Outfit" }}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <FormControl fullWidth required sx={inputSx}>
                <InputLabel id='category3-label'>Final Category</InputLabel>
                <Select
                  id='category3'
                  name='category3'
                  value={formik.values.category3}
                  onChange={formik.handleChange}
                  labelId='category3-label'
                  label='Final Category'
                  disabled={!formik.values.category2}
                >
                  <MenuItem
                    value=''
                    sx={{ fontFamily: "Outfit", fontStyle: "italic" }}
                  >
                    None
                  </MenuItem>
                  {level3Categories.map((category) => (
                    <MenuItem
                      key={category._id}
                      value={category.categoryId}
                      sx={{ fontFamily: "Outfit" }}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Button
                variant='contained'
                type='submit'
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.8,
                  borderRadius: "9999px",
                  bgcolor: "#0a0a0a",
                  textTransform: "none",
                  fontWeight: 700,
                  fontFamily: "Outfit",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#c9993a", boxShadow: "none" },
                  "&.Mui-disabled": { bgcolor: "#f0ece6", color: "#9ca3af" },
                }}
              >
                {loading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <CircularProgress
                      size={20}
                      thickness={4}
                      sx={{ color: "#9ca3af" }}
                    />
                    <span>Saving Product...</span>
                  </div>
                ) : (
                  "Create Listing"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProducts;
