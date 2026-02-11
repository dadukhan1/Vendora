/** @format */

import { Box, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";

const AddressForm = () => {
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
      console.log("values: ", value);
    },
  });

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <p className='text-xl font-bold text-center pb-5'>Contact Details</p>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='name'
              label='Name'
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='mobile'
              label='Mobile'
              inputMode='numeric'
              value={formik.values.mobile}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                formik.setFieldValue("mobile", onlyNums);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='pinCode'
              label='PinCode'
              inputMode='numeric'
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                formik.setFieldValue("pinCode", onlyNums);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              value={formik.values.pinCode}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='address'
              label='Address (House No, Building, Street)'
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name='locality'
              label='Locality/Town'
              value={formik.values.locality}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='city'
              label='City'
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name='state'
              label='State'
              value={formik.values.state}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;
