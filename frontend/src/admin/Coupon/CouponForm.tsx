/** @format */

import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { createCoupon } from "../../Redux Toolkit/features/admin/couponSlice";
import toast from "react-hot-toast";
import { LocalOffer } from "@mui/icons-material";

const CouponForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null as Dayjs | null,
      validityEndDate: null as Dayjs | null,
      minimumOrderValue: 0,
    },
    onSubmit: async (values) => {
      if (!values.code.trim()) {
        toast.error("Please enter a coupon code");
        return;
      }
      const payload = {
        ...values,
        code: values.code.trim().toUpperCase(),
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString(),
      };

      const resultAction = await dispatch(createCoupon(payload));
      if (createCoupon.fulfilled.match(resultAction)) {
        toast.success("Coupon created successfully");
        formik.resetForm();
      } else {
        toast.error("Failed to create coupon");
      }
    },
  });

  // Shared style for MUI text fields
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      fontSize: "0.85rem",
      backgroundColor: "#fafaf8",
      "& fieldset": { borderColor: "#f0ece6" },
      "&:hover fieldset": { borderColor: "#d4c4a8" },
      "&.Mui-focused fieldset": { borderColor: "#c9993a", borderWidth: "2px" },
    },
    "& .MuiInputLabel-root": { fontSize: "0.85rem", color: "#9ca3af", fontFamily: "Outfit" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#c9993a" },
    "& .MuiInputBase-input": { fontFamily: "Outfit", color: "#0a0a0a", fontWeight: 500 },
  };

  return (
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      {/* Header */}
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Typography
          variant="overline"
          sx={{ color: "#c9993a", fontWeight: 700, letterSpacing: 1.5, fontFamily: "Outfit" }}
        >
          Promotions
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, fontFamily: "Playfair Display", color: "#0a0a0a", mt: 0.5 }}
        >
          Create Coupon
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#9ca3af", fontFamily: "Outfit", mt: 1, maxWidth: 560, mx: "auto" }}
        >
          Generate a discount code for your customers. Define validity dates and minimum spend
          requirements.
        </Typography>
      </Box>

      {/* Form Card */}
      <Paper
        elevation={0}
        sx={{
          maxWidth: 800,
          mx: "auto",
          border: "1px solid #f0ece6",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        {/* Card Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid #f0ece6",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              bgcolor: "rgba(201,153,58,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c9993a",
            }}
          >
            <LocalOffer />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, color: "#0a0a0a" }}>
              Coupon Configuration
            </Typography>
            <Typography sx={{ fontFamily: "Outfit", color: "#9ca3af" }}>
              Define the rules and discount logic for this code.
            </Typography>
          </Box>
        </Box>

        {/* Form Body */}
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            {/* Coupon Code */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, color: "#0a0a0a", mb: 0.5 }}>
                  Coupon Code
                </Typography>
                <Typography sx={{ fontFamily: "Outfit", color: "#9ca3af", fontSize: 12, mb: 1 }}>
                  Upper‑case, customers will enter this at checkout.
                </Typography>
                <TextField
                  fullWidth
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  placeholder="e.g. SUMMER24"
                  sx={{
                    ...textFieldSx,
                    "& .MuiInputBase-input": {
                      ...textFieldSx["& .MuiInputBase-input"],
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      fontWeight: 700,
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* Discount Percentage */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, color: "#0a0a0a", mb: 0.5 }}>
                Discount (%)
              </Typography>
              <TextField
                fullWidth
                name="discountPercentage"
                type="number"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                sx={textFieldSx}
              />
            </Grid>

            {/* Minimum Order Value */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, color: "#0a0a0a", mb: 0.5 }}>
                Minimum Order ($)
              </Typography>
              <TextField
                fullWidth
                name="minimumOrderValue"
                type="number"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                sx={textFieldSx}
              />
            </Grid>

            {/* Validity Dates */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, color: "#0a0a0a", mb: 0.5 }}>
                Start Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%", ...textFieldSx }}
                  value={formik.values.validityStartDate}
                  onChange={(date) => formik.setFieldValue("validityStartDate", date)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, color: "#0a0a0a", mb: 0.5 }}>
                End Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%", ...textFieldSx }}
                  value={formik.values.validityEndDate}
                  onChange={(date) => formik.setFieldValue("validityEndDate", date)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            p: 3,
            bgcolor: "#fafaf8",
            borderTop: "1px solid #f0ece6",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            onClick={() => formik.resetForm()}
            sx={{
              borderRadius: "9999px",
              color: "#9ca3af",
              fontFamily: "Outfit",
              fontWeight: 700,
              textTransform: "none",
              px: 3,
              "&:hover": { bgcolor: "#f5f3ef" },
            }}
          >
            Clear
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: "9999px",
              bgcolor: "#0a0a0a",
              color: "#fff",
              textTransform: "none",
              fontWeight: 700,
              fontFamily: "Outfit",
              fontSize: "0.85rem",
              px: 4,
              boxShadow: "none",
              "&:hover": { bgcolor: "#c9993a", boxShadow: "none" },
            }}
            onClick={() => formik.handleSubmit()}
          >
            Create Coupon
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CouponForm;
