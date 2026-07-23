/** @format */

import { Box, Typography, Paper } from "@mui/material";
import TransactionTable from "../Transaction/TransactionTable";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { fetchSellerTransactions } from "../../Redux Toolkit/features/seller/transactionSlice";
import { useEffect } from "react";
import { AccountBalanceWallet } from "@mui/icons-material";

const Payment = () => {
  const { totalEarnings, transactions } = useAppSelector(
    (store) => store.transaction,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSellerTransactions());
  }, [dispatch]);

  return (
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      <Box sx={{ mb: 4 }}>
        <p className='label-overline text-[#c9993a] mb-1'>Financials</p>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 800,
            color: "#0a0a0a",
            fontFamily: "Playfair Display",
            mb: 1,
          }}
        >
          Payments & Earnings
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: "#9ca3af", fontFamily: "Outfit" }}
        >
          Monitor your store revenue and recent payouts.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            flex: "1 1 300px",
            border: "1px solid #f0ece6",
            borderRadius: "24px",
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -20,
              right: -20,
              color: "rgba(201, 153, 58, 0.05)",
            }}
          >
            <AccountBalanceWallet sx={{ fontSize: 160 }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                bgcolor: "#0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#c9993a",
              }}
            >
              <AccountBalanceWallet />
            </Box>
            <Typography
              variant='subtitle2'
              sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#9ca3af" }}
            >
              Total Earnings
            </Typography>
          </Box>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 800,
              fontFamily: "Playfair Display",
              color: "#0a0a0a",
              mt: 1,
              position: "relative",
            }}
          >
            ${totalEarnings || "0.00"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 1,
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#2d6a4f",
              }}
            />
            <Typography
              variant='caption'
              sx={{ color: "#2d6a4f", fontFamily: "Outfit", fontWeight: 700 }}
            >
              Available for withdrawal
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            flex: "1 1 300px",
            border: "1px solid #f0ece6",
            borderRadius: "24px",
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant='subtitle2'
            sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#9ca3af" }}
          >
            Last Transaction
          </Typography>
          {transactions && transactions.length > 0 ? (
            <Box>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 800,
                  fontFamily: "Playfair Display",
                  color: "#0a0a0a",
                }}
              >
                +${transactions[0]?.amount}
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  color: "#0a0a0a",
                  fontFamily: "Outfit",
                  fontWeight: 600,
                  mt: 2,
                }}
              >
                Order #
                {transactions[0]?.order?._id?.substring(0, 8).toUpperCase()}
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: "#9ca3af", fontFamily: "Outfit" }}
              >
                {new Date(transactions[0]?.createdAt).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant='body2'
              sx={{ color: "#9ca3af", fontFamily: "Outfit", mt: 2 }}
            >
              No recent transactions
            </Typography>
          )}
        </Paper>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #f0ece6",
          borderRadius: "24px",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: "1px solid #f0ece6",
            bgcolor: "#fff",
          }}
        >
          <Typography
            variant='subtitle2'
            sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#0a0a0a" }}
          >
            Transaction History
          </Typography>
        </Box>
        <TransactionTable />
      </Paper>
    </Box>
  );
};

export default Payment;
