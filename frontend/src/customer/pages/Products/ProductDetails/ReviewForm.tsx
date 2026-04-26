/** @format */

import { useState } from "react";
import { Rating, TextField, Button, Box, Typography } from "@mui/material";
import { useAppDispatch } from "../../../../Redux Toolkit/store";
import { createReview } from "../../../../Redux Toolkit/features/customer/reviewSlice";

const ReviewForm = ({ productId, onCancel }: any) => {
  const [rating, setRating] = useState<number | null>(5);
  const [reviewText, setReviewText] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !reviewText.trim()) return;

    dispatch(createReview({ 
        productId, 
        reviewData: { rating, reviewText } 
    }));
    onCancel(); // Close form after submission
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className='space-y-6 p-6 bg-slate-50 rounded-2xl border border-blue-50'>
      <div className='bg-orange-50 border border-orange-100 p-4 rounded-xl mb-2'>
        <p className='text-orange-800 text-xs font-bold flex items-center gap-2'>
          <span className='w-1.5 h-1.5 bg-orange-500 rounded-full' />
          IMPORTANT: You can only submit one review per product. This action cannot be edited or undone.
        </p>
      </div>
      <div>
        <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#1E293B', mb: 1 }}>
            Rate this product
        </Typography>
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          size="large"
        />
      </div>

      <div>
        <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#1E293B', mb: 1 }}>
            Your Review
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="What did you like or dislike? How was the quality?"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{
            bgcolor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',
            }
          }}
        />
      </div>

      <div className='flex gap-3 pt-2'>
        <Button
          type="submit"
          variant="contained"
          disabled={!rating || !reviewText.trim()}
          sx={{
            bgcolor: '#0F52FF',
            borderRadius: '12px',
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 900,
            '&:hover': { bgcolor: '#0D3ABF' }
          }}
        >
          Submit Review
        </Button>
        <Button
          onClick={onCancel}
          sx={{
            color: '#64748B',
            textTransform: 'none',
            fontWeight: 700
          }}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
};

export default ReviewForm;
