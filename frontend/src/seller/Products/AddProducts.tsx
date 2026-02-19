/** @format */

import { AddPhotoAlternate, Category, Close } from "@mui/icons-material";
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
import { mainCategory } from "../../data/category/mainCategory";
import { menLevel2 } from "../../data/category/level2/menLevel2";
import { womenLevel2 } from "../../data/category/level2/womenLevel2";
import { furnitureLevel2 } from "../../data/category/level2/furnitureLevel2";
import { electronicLevel2 } from "../../data/category/level2/electronicLevel2";
import { menLevel3 } from "../../data/category/level3/menLevel3";
import { womenLevel3 } from "../../data/category/level3/womenLevel3";
import { furnitureLevel3 } from "../../data/category/level3/furnitureLevel3";
import { electronicLevel3 } from "../../data/category/level3/electronicLevel3";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const categoryTwo = {
  men: menLevel2,
  women: womenLevel2,
  kids: [],
  home_furniture: furnitureLevel2,
  beauty: [],
  electornics: electronicLevel2,
};
const categoryThree = {
  men: menLevel3,
  women: womenLevel3,
  kids: [],
  home_furniture: furnitureLevel3,
  beauty: [],
  electornics: electronicLevel3,
};

const AddProducts = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      discountPrice: "",
      sellingPrice: "",
      color: "",
      images: [
        "https://images.unsplash.com/photo-1761839257870-06874bda71b5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
      ],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    onSubmit: (value) => {
      console.log(value);
    },
  });

  const handleImageChange = () => {
    console.log("Image changed");
  };

  const handleRemoveImage = (index: number) => {
    console.log("Remove image at index:", index);
  };

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter(
      (cat: any) => cat.parentCategoryId === parentCategoryId,
    );
  };

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

              {uploadImage && (
                <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center'>
                  <CircularProgress />
                </div>
              )}
            </label>
            <div className='flex flex-wrap gap-2 mt-2'>
              {formik.values.images.map((image, index) => (
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
                value={formik.values.sizes}
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
              <InputLabel id='size-label'>Category</InputLabel>
              <Select
                id='size'
                name='category'
                value={formik.values.category}
                onChange={formik.handleChange}
                labelId='size-label'
                label='Category'
              >
                <MenuItem value='none'>None</MenuItem>
                {mainCategory.map((category, index) => (
                  <MenuItem key={index} value={category.categoryId}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id='size-label'>Second Category</InputLabel>
              <Select
                id='size'
                name='category2'
                value={formik.values.category2}
                onChange={formik.handleChange}
                labelId='size-label'
                label='Second Category'
              >
                <MenuItem value='none'>None</MenuItem>
                {formik.values.category &&
                  categoryTwo[
                    formik.values.category as keyof typeof categoryTwo
                  ]?.map((category: any, index: number) => (
                    <MenuItem key={index} value={category.categoryId}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id='size-label'>Third Category</InputLabel>
              <Select
                id='size'
                name='category3'
                value={formik.values.category3}
                onChange={formik.handleChange}
                labelId='size-label'
                label='Third Category'
              >
                <MenuItem value='none'>None</MenuItem>
                {childCategory(
                  categoryThree[
                    formik.values.category as keyof typeof categoryThree
                  ],
                  formik.values.category2,
                )?.map((category: any, index: any) => (
                  <MenuItem key={index} value={category.categoryId}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              variant='contained'
              sx={{ p: "11px" }}
              fullWidth
              type='submit'
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProducts;
