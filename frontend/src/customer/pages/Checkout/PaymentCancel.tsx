/** @format */

import { ErrorOutline, ShoppingCart, Refresh } from "@mui/icons-material";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            textAlign: "center",
            borderRadius: "40px",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "white",
            boxShadow: "0 25px 60px rgba(0,0,0,0.05)"
          }}
        >
          {/* Error Icon */}
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              bgcolor: "#fff1f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 4,
              border: "4px solid #fff",
              boxShadow: "0 10px 20px rgba(244, 63, 94, 0.15)"
            }}
          >
            <ErrorOutline sx={{ fontSize: 60, color: "#e11d48" }} />
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: "#0F172A",
              mb: 2,
              letterSpacing: "-0.03em"
            }}
          >
            Payment Canceled
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#64748B",
              mb: 6,
              fontSize: "1.15rem",
              lineHeight: 1.6,
              maxWidth: "400px",
              mx: "auto"
            }}
          >
            Your payment was not completed. No funds were deducted from your account. 
            If you experienced an issue, you can try again below.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate("/cart")}
              startIcon={<ShoppingCart />}
              sx={{
                bgcolor: "#0F52FF",
                py: 2,
                borderRadius: "16px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 800,
                "&:hover": { 
                  bgcolor: "#0644e1",
                  boxShadow: "0 10px 25px rgba(15, 82, 255, 0.3)"
                }
              }}
            >
              Back to Cart
            </Button>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => window.history.back()}
              startIcon={<Refresh />}
              sx={{
                py: 2,
                borderRadius: "16px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#1e293b",
                borderColor: "#e2e8f0",
                "&:hover": { 
                  borderColor: "#cbd5e1",
                  bgcolor: "#f8fafc"
                }
              }}
            >
              Retry Payment
            </Button>
          </Box>

          <Box sx={{ mt: 8, pt: 4, borderTop: "1px solid", borderColor: "divider" }}>
             <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 600 }}>
              Need help? Contact our support team 24/7.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PaymentCancel;
