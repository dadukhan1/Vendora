/** @format */

import { Grid, TextField, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../Redux Toolkit/store";
import { addAddress } from "../../../Redux Toolkit/features/customer/addressSlice";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    fontSize: 14,
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: "#94A3B8" },
    "&.Mui-focused fieldset": { borderColor: "#0F52FF", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0F52FF" },
  "& .MuiInputLabel-root": { fontSize: 14, color: "#64748B" },
};

const AddressForm = ({ paymentGateway, onClose }: any) => {
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
    },
  });

  return (
    <div className='max-w-[600px] mx-auto'>
      {/* Heading */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <span className='inline-block w-1 h-6 bg-gradient-to-b from-[#0F52FF] to-[#FF4F00]' />
          <h2 className='text-lg font-bold text-[#0F172A]'>Contact Details</h2>
        </div>
        {onClose && (
          <IconButton
            onClick={onClose}
            size='small'
            sx={{
              color: "#94A3B8",
              "&:hover": {
                color: "#FF4F00",
                background: "rgba(255,79,0,0.08)",
              },
            }}
          >
            <Close fontSize='small' />
          </IconButton>
        )}
      </div>

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
              label='Mobile'
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
          <Grid size={{ xs: 12 }}>
            <button
              type='submit'
              className='w-full py-3.5 bg-[#0F52FF] text-white text-sm font-bold
                rounded-xl tracking-wide shadow-[0_4px_20px_rgba(15,82,255,0.28)]
                hover:opacity-90 active:scale-[.98] transition-all duration-150'
            >
              Save Address
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddressForm;
