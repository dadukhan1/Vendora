/** @format */

import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  Storefront,
  Inventory,
  Receipt,
  AttachMoney,
} from "@mui/icons-material";

const StatCard = ({
  title,
  value,
  icon,
  subtitle,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle: string;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      border: "1px solid #f0ece6",
      borderRadius: "24px",
      bgcolor: "#fff",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "12px",
          bgcolor: "rgba(201, 153, 58, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c9993a",
        }}
      >
        {icon}
      </Box>
      <Typography
        variant='body2'
        sx={{
          color: "#2d6a4f",
          fontWeight: 700,
          fontFamily: "Outfit",
          bgcolor: "rgba(45, 106, 79, 0.08)",
          px: 1.5,
          py: 0.5,
          borderRadius: "999px",
        }}
      >
        +12.5%
      </Typography>
    </Box>
    <Box>
      <Typography
        variant='h4'
        sx={{
          fontWeight: 800,
          fontFamily: "Playfair Display",
          color: "#0a0a0a",
        }}
      >
        {value}
      </Typography>
      <Typography
        variant='body2'
        sx={{ color: "#9ca3af", fontFamily: "Outfit", fontWeight: 600 }}
      >
        {title}
      </Typography>
    </Box>
    <Typography
      variant='caption'
      sx={{ color: "#d1d5db", fontFamily: "Outfit" }}
    >
      {subtitle}
    </Typography>
  </Paper>
);

const Homepage = () => {
  return (
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      <Box sx={{ mb: 5 }}>
        <p className='label-overline text-[#c9993a] mb-1'>Overview</p>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 800,
            color: "#0a0a0a",
            fontFamily: "Playfair Display",
            mb: 1,
          }}
        >
          Seller Dashboard
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: "#9ca3af", fontFamily: "Outfit" }}
        >
          Welcome back. Here's what's happening with your store today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title='Total Revenue'
            value='$124,500'
            icon={<AttachMoney />}
            subtitle='Compared to last month'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title='Active Orders'
            value='42'
            icon={<Receipt />}
            subtitle='Requires fulfillment'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title='Total Products'
            value='156'
            icon={<Inventory />}
            subtitle='Active listings'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title='Store Views'
            value='8,405'
            icon={<Storefront />}
            subtitle='Across all categories'
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
