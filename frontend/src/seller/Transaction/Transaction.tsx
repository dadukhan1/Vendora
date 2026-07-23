/** @format */

import { Box, Typography, Paper } from "@mui/material";
import TransactionTable from "./TransactionTable";

const Transaction = () => {
  return (
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      <Box sx={{ mb: 4 }}>
        <p className="label-overline text-[#c9993a] mb-1">Ledger</p>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0a0a", fontFamily: "Playfair Display", mb: 1 }}>
          Transactions
        </Typography>
        <Typography variant="body2" sx={{ color: "#9ca3af", fontFamily: "Outfit" }}>
          A complete record of all your incoming payouts and fees.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid #f0ece6", borderRadius: "24px", overflow: "hidden", bgcolor: "#fff" }}>
        <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #f0ece6", bgcolor: "#fff" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#0a0a0a" }}>
            All Transactions
          </Typography>
        </Box>
        <TransactionTable />
      </Paper>
    </Box>
  );
};

export default Transaction;
