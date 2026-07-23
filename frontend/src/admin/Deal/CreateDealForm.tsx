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
import toast from "react-hot-toast";

interface DealCategory {
  _id?: string;
  name?: string;
  categoryId?: string;
}

interface CreateDealFormProps {
  onSuccess?: () => void;
}

const CreateDealForm = ({ onSuccess }: CreateDealFormProps) => {
  const dispatch = useAppDispatch();

  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
    },
    onSubmit: async (values) => {
      if (!values.category) {
        toast.error("Please select a category");
        return;
      }
      if (values.discount <= 0 || values.discount > 100) {
        toast.error("Please enter a valid discount percentage (1-100)");
        return;
      }
      
      const result = await dispatch(
        createDeal({
          discount: values.discount,
          category: {
            _id: values.category,
            name: "",
            image: "",
          },
        }),
      );
      
      if (createDeal.fulfilled.match(result)) {
        toast.success("Deal created successfully");
        formik.resetForm();
        if (onSuccess) onSuccess();
      } else {
        toast.error("Failed to create deal");
      }
    },
  });

  useEffect(() => {
    dispatch(homeCategoryData());
  }, [dispatch]);

  const categoriesArray =
    (Array.isArray(homeCategories) && homeCategories) || [];

  const uniqueCategories = categoriesArray.filter(
    (value: any, index: number, self: any[]) =>
      index === self.findIndex((t: any) => t._id === value._id),
  );

  const inputSx = {
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
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{ width: { xs: "100%", md: 500 }, margin: "auto" }}
    >
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "Outfit", color: "#0a0a0a" }}>
          Launch a Deal
        </Typography>
        <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5, fontFamily: "Outfit" }}>
          Apply a platform-wide discount to a specific category.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          fullWidth
          type='number'
          name='discount'
          label='Discount Percentage (%)'
          value={formik.values.discount}
          onChange={formik.handleChange}
          sx={inputSx}
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />
        
        <FormControl fullWidth sx={inputSx}>
          <InputLabel id='category-label'>Select Category</InputLabel>
          <Select
            labelId='category-label'
            id='category'
            name='category'
            value={formik.values.category}
            onChange={formik.handleChange}
            label='Select Category'
            sx={{ fontFamily: "Outfit" }}
          >
            <MenuItem value='' sx={{ fontFamily: "Outfit", fontSize: 13, fontStyle: "italic" }}>
              None
            </MenuItem>
            {uniqueCategories.map((category: DealCategory) => (
              <MenuItem key={category._id} value={category._id} sx={{ py: 1.5 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body2" fontWeight="700" sx={{ fontFamily: "Outfit" }}>{category.name}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "Outfit" }}>ID: {category.categoryId}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Box sx={{ mt: 5 }}>
        <Button 
          fullWidth 
          type='submit' 
          variant='contained'
          sx={{
            py: "14px",
            borderRadius: "9999px",
            bgcolor: "#0a0a0a",
            textTransform: "none",
            fontWeight: 700,
            fontFamily: "Outfit",
            fontSize: "0.85rem",
            boxShadow: "none",
            "&:hover": { bgcolor: "#c9993a", boxShadow: "none" },
          }}
        >
          Create Deal
        </Button>
      </Box>
    </Box>
  );
};

export default CreateDealForm;
