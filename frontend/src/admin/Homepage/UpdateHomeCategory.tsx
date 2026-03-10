/** @format */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { updateHomeCategory } from "../../Redux Toolkit/features/admin/adminSlice";
// import { updateCategory, getCategoryById } from "../../Redux Toolkit/features/admin/homeCategorySlice";

const UpdateHomeCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { homeCategories, loading } = useAppSelector(
    (state) => state.homeCategory,
  );

  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<File | string>("");

  // Load category data
  useEffect(() => {
    if (!Array.isArray(homeCategories)) return;

    const cat = homeCategories.find((c) => c._id === categoryId);

    if (cat) {
      setCategoryName(cat.categoryId || "");
      setImage(cat.image || "");
    }
  }, [homeCategories, categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryId", categoryName);
    if (image instanceof File) {
      formData.append("image", image);
    }

    const resultAction = await dispatch(
      updateHomeCategory({ categoryId, data: formData }),
    );
    if (updateHomeCategory.fulfilled.match(resultAction)) {
      navigate("/admin/home-page"); // back to table
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box maxWidth='500px' mx='auto' mt={5}>
      <Typography variant='h5' mb={3}>
        Update Home Category
      </Typography>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <TextField
          fullWidth
          label='Category Name'
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          margin='normal'
        />
        <Box mt={2} mb={2}>
          <Typography>Category Image</Typography>
          {typeof image === "string" && image && (
            <img src={image} alt='preview' className='w-40 rounded-md mb-2' />
          )}
          <input
            type='file'
            accept='image/*'
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
          />
        </Box>
        <Button type='submit' variant='contained' fullWidth>
          Update Category
        </Button>
      </form>
    </Box>
  );
};

export default UpdateHomeCategory;
