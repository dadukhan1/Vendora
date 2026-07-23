/** @format */

import OrderTable from "./OrderTable";
import { Box, Typography, Paper } from "@mui/material";

const Orders = () => {
  return (
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      <Box sx={{ mb: 4 }}>
        <p className="label-overline text-[#c9993a] mb-1">Fulfillment</p>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0a0a", fontFamily: "Playfair Display", mb: 1 }}>
          Orders
        </Typography>
        <Typography variant="body2" sx={{ color: "#9ca3af", fontFamily: "Outfit" }}>
          Track and process incoming orders from customers.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid #f0ece6", borderRadius: "24px", overflow: "hidden", bgcolor: "#fff" }}>
        <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #f0ece6", bgcolor: "#fff" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#0a0a0a" }}>
            All Orders
          </Typography>
        </Box>
        <OrderTable />
      </Paper>
    </Box>
  );
};

export default Orders;