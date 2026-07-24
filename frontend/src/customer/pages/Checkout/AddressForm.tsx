/** @format */

import { Grid, TextField, IconButton, Box, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../Redux Toolkit/store";
import { addAddress } from "../../../Redux Toolkit/features/customer/addressSlice";

const GOLD = "#c9993a";
const DARK = "#0a0a0a";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    fontSize: 15,
    fontFamily: "Outfit, sans-serif",
    backgroundColor: "#fafaf8",
    "& fieldset": { borderColor: "#f0ece6" },
    "&:hover fieldset": { borderColor: "#e5e7eb" },
    "&.Mui-focused fieldset": { borderColor: GOLD, borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: GOLD },
  "& .MuiInputLabel-root": { fontSize: 15, color: "#9ca3af", fontFamily: "Outfit, sans-serif" },
};

const AddressForm = ({ onClose }: any) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      locality: "",
    },
    onSubmit: (value) => {
      dispatch(addAddress(value));
      if (onClose) onClose();
    },
  });

  return (
    <Box sx={{ width: "100%", fontFamily: "Outfit, sans-serif" }}>
      {/* Heading */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 4,
              height: 20,
              background: GOLD,
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: DARK,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Contact Details
          </Box>
        </Box>
        {onClose && (
          <IconButton
            onClick={onClose}
            size='small'
            sx={{
              color: "#9ca3af",
              "&:hover": {
                color: "#f43f5e",
                background: "rgba(244,63,94,0.08)",
              },
              transition: "all 0.2s",
            }}
          >
            <Close fontSize='small' />
          </IconButton>
        )}
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2.5}>
          {/* Name */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='name'
              label='Full Name'
              value={formik.values.name}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </Grid>

          {/* Mobile + PinCode */}
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='mobile'
              label='Mobile Number'
              inputMode='numeric'
              value={formik.values.mobile}
              onChange={(e) =>
                formik.setFieldValue(
                  "mobile",
                  e.target.value.replace(/[^0-9]/g, ""),
                )
              }
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='pinCode'
              label='Pin Code'
              inputMode='numeric'
              value={formik.values.pinCode}
              onChange={(e) =>
                formik.setFieldValue(
                  "pinCode",
                  e.target.value.replace(/[^0-9]/g, ""),
                )
              }
              onBlur={formik.handleBlur}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
              sx={fieldSx}
            />
          </Grid>

          {/* Address */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='address'
              label='Address (House No, Building, Street)'
              value={formik.values.address}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </Grid>

          {/* Locality */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='locality'
              label='Locality / Town'
              value={formik.values.locality}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </Grid>

          {/* City + State */}
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='city'
              label='City'
              value={formik.values.city}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='state'
              label='State'
              value={formik.values.state}
              onChange={formik.handleChange}
              sx={fieldSx}
            />
          </Grid>

          {/* Submit */}
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                background: "linear-gradient(135deg, #d4a348 0%, #c9993a 100%)",
                color: "white",
                py: 1.75,
                fontSize: "0.95rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                borderRadius: "14px",
                fontFamily: "Outfit, sans-serif",
                boxShadow: "0 8px 24px rgba(201,153,58,0.25)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #c9993a 0%, #b88a34 100%)",
                  boxShadow: "0 12px 32px rgba(201,153,58,0.35)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              Save Address
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;
