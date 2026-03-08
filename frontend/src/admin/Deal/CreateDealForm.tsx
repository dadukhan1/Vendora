/** @format */

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { createDeal } from "../../Redux Toolkit/features/admin/dealSlice";
import { useEffect } from "react";
import { homeCategoryData } from "../../Redux Toolkit/features/customer/homeCategorySlice";

const CreateDealForm = () => {
  const dispatch = useAppDispatch();

  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(createDeal(values));
    },
  });

  useEffect(() => {
    dispatch(homeCategoryData());
  }, []);

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{ width: 600, margin: "auto", padding: 3 }}
    >
      <Typography variant='h4' sx={{ textAlign: "center" }}>
        Create New Deal
      </Typography>
      <div className='flex flex-col gap-4 mt-5'>
        <TextField
          fullWidth
          name='discount'
          label='Discount'
          value={formik.values.discount}
          onChange={formik.handleChange}
        />
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
            {homeCategories?.map((category, index) => (
              <MenuItem key={index} value={category?.categoryId}>
                {category?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className='mt-5'>
        <Button sx={{ py: "11px" }} fullWidth type='submit' variant='contained'>
          Create Deal
        </Button>
      </div>
    </Box>
  );
};

export default CreateDealForm;
