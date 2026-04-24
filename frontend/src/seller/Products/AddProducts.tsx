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
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { colors } from "../../data/filters/colors";
import { createProduct } from "../../Redux Toolkit/features/seller/sellerProductsSlice";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { fetchAllCategories } from "../../Redux Toolkit/features/category/categorySlice.ts";
import { useEffect } from "react";
// import Loader from "../../components/Loader";

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

      // Clear form after successful creation
      if (result.type.endsWith("/fulfilled")) {
        formik.resetForm();
        setImageFiles([]);
      }

      console.log(formData);
    },
  });

  const { loading } = useAppSelector(store => store.sellerProduct);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // store real files for upload
    setImageFiles((prev) => [...prev, ...files]);

    // preview only
    const previews = files.map((file) => URL.createObjectURL(file));

    formik.setFieldValue("images", [...formik.values.images, ...previews]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue("images", newImages);
  };

  const getCategoriesByParentId = (parentCategorySlug: string | null) => {
    return categories.filter((cat) => {
      let catParentSlug: string | null = null;
      
      if (typeof cat.parentCategory === "object" && cat.parentCategory !== null) {
        catParentSlug = (cat.parentCategory as any).categoryId;
      } else {
        catParentSlug = categories.find(c => c._id === cat.parentCategory)?.categoryId || null;
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

  return (
    <div>
      <h1 className='text-3xl font-bold text-center py-5'>Add Product</h1>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid className='flex flex-wrap gap-5 items-center' size={{ xs: 12 }}>
            <input
              type='file'
              accept='image/*'
              id='fileInput'
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor='fileInput' className='relative'>
              <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
                <AddPhotoAlternate className='text-gray-700' />
              </span>


            </label>
            <div className='flex flex-wrap gap-2 mt-2'>
              {formik.values.images.length > 0 &&
                formik.values.images.map((image, index) => (
                  <div
                    key={index}
                    className='w-24 h-24 border rounded-md overflow-hidden relative'
                  >
                    <img
                      src={image}
                      alt={`Product ${index}`}
                      className='w-full h-full object-cover'
                    />
                    <IconButton
                      size='small'
                      color='error'
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                    >
                      <Close
                        sx={{ fontSize: "1rem" }}
                        className='text-gray-700'
                      />
                    </IconButton>
                  </div>
                ))}
            </div>
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
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id='description'
              name='description'
              label='Description'
              value={formik.values.description}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id='quantity'
              name='quantity'
              label='quantity'
              type='number'
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id='mrp_price'
              name='mrpPrice'
              label='MRP Price'
              type='number'
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id='selling_price'
              name='sellingPrice'
              label='Selling Price'
              type='number'
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth required>
              <InputLabel id='color-label'>Color</InputLabel>
              <Select
                id='color'
                name='color'
                value={formik.values.color}
                onChange={formik.handleChange}
                labelId='color-label'
                label='Color'
              >
                <MenuItem value='none'>None</MenuItem>
                {colors.map((color, index) => (
                  <MenuItem key={index} value={color.name}>
                    {color.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth required>
              <InputLabel id='size-label'>Size</InputLabel>
              <Select
                id='size'
                name='size'
                value={formik.values.size}
                onChange={formik.handleChange}
                labelId='size-label'
                label='Size'
              >
                <MenuItem value='none'>None</MenuItem>
                {sizes.map((size, index) => (
                  <MenuItem key={index} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
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
                <MenuItem value=''>None</MenuItem>
                {level1Categories.map((category) => (
                  <MenuItem key={category._id} value={category.categoryId}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id='category2-label'>Second Category</InputLabel>
              <Select
                id='category2'
                name='category2'
                value={formik.values.category2}
                onChange={(e) => {
                  formik.setFieldValue("category2", e.target.value);
                  formik.setFieldValue("category3", "");
                }}
                labelId='category2-label'
                label='Second Category'
                disabled={!formik.values.category}
              >
                <MenuItem value=''>None</MenuItem>
                {level2Categories.map((category) => (
                  <MenuItem key={category._id} value={category.categoryId}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id='category3-label'>Third Category</InputLabel>
              <Select
                id='category3'
                name='category3'
                value={formik.values.category3}
                onChange={formik.handleChange}
                labelId='category3-label'
                label='Third Category'
                disabled={!formik.values.category2}
              >
                <MenuItem value=''>None</MenuItem>
                {level3Categories.map((category) => (
                  <MenuItem key={category._id} value={category.categoryId}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              variant='contained'
              type='submit'
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
            >
              {loading ? (
                <div className='flex items-center justify-center gap-2'>
                  <CircularProgress size={20} thickness={4} />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save product"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProducts;
