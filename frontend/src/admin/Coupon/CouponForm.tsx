/** @format */

import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";

const CouponForm = () => {
  const formik = useFormik({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null as Dayjs | null,
      validityEndDate: null as Dayjs | null,
      minimumOrderValue: 0,
    },
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });
  return (
    <div className='max-w-3xl'>
      <Box sx={{ mt: 3 }} component={"form"} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label='Coupon Code'
              name='code'
              value={formik.values.code}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label='Discount Percentage'
              name='discountPercentage'
              type='number'
              value={formik.values.discountPercentage}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                value={formik.values.validityStartDate}
                onChange={(date) =>
                  formik.setFieldValue("validityStartDate", date)
                }
                label='Validity Start Date'
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                value={formik.values.validityEndDate}
                onChange={(date) =>
                  formik.setFieldValue("validityEndDate", date)
                }
                label='Validity End Date'
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <TextField
              fullWidth
              label='Minimum Order Value'
              name='minimumOrderValue'
              type='number'
              value={formik.values.minimumOrderValue}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ py: "12px" }}
              fullWidth
              variant='contained'
              type='submit'
            >
              Save Coupon
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CouponForm;
