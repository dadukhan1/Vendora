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
import { menLevel2 } from "../../data/category/level2/menLevel2";

const CreateDealForm = () => {
  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
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
            {menLevel2.map((category, index) => (
              <MenuItem key={index} value={category.categoryId}>
                {category.name}
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
