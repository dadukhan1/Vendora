/** @format */

import { CheckCircleOutline, ShoppingBag, ArrowForward } from "@mui/icons-material";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect } from "react";
// import confetti from 'canvas-confetti'; // Optional: add if available

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Basic success celebration could go here if library was available
    window.scrollTo(0, 0);
  }, []);

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
            boxShadow: "0 25px 60px rgba(0,0,0,0.05)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Decorative Background Element */}
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 150,
              height: 150,
              borderRadius: "50%",
              bgcolor: "rgba(15, 82, 255, 0.03)",
              zIndex: 0
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            {/* Success Icon */}
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                bgcolor: "#f0fdf4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 4,
                border: "4px solid #fff",
                boxShadow: "0 10px 20px rgba(34, 197, 94, 0.15)"
              }}
            >
              <CheckCircleOutline sx={{ fontSize: 60, color: "#22c55e" }} />
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
              Payment Successful!
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
              Thank you for your purchase. Your order is being processed and will be delivered shortly.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => navigate("/account/orders")}
                startIcon={<ShoppingBag />}
                sx={{
                  bgcolor: "#0F172A",
                  py: 2,
                  borderRadius: "16px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 800,
                  "&:hover": { bgcolor: "#1E293B" }
                }}
              >
                View My Orders
              </Button>

              <Button
                variant="text"
                size="large"
                fullWidth
                onClick={() => navigate("/")}
                endIcon={<ArrowForward />}
                sx={{
                  py: 1.5,
                  borderRadius: "16px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#0F52FF"
                }}
              >
                Continue Shopping
              </Button>
            </Box>

            <Box sx={{ mt: 8, pt: 4, borderTop: "1px solid", borderColor: "divider" }}>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 600 }}>
                A confirmation email has been sent to your inbox.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PaymentSuccess;
