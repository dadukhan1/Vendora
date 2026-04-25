/** @format */

import { GppBad, Home, ArrowBack } from "@mui/icons-material";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            textAlign: "center",
            borderRadius: "32px",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "white",
            boxShadow: "0 20px 50px rgba(0,0,0,0.05)"
          }}
        >
          {/* Animated Icon Container */}
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
              boxShadow: "0 10px 20px rgba(244, 63, 94, 0.1)"
            }}
          >
            <GppBad sx={{ fontSize: 50, color: "#e11d48" }} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "#0F172A",
              mb: 2,
              letterSpacing: "-0.02em"
            }}
          >
            Access Denied
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 6,
              lineHeight: 1.6,
              fontSize: "1.1rem"
            }}
          >
            Oops! You don't have the required permissions to access this page. 
            Please check your account role or contact the administrator.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate("/")}
              startIcon={<Home />}
              sx={{
                bgcolor: "#0F52FF",
                boxShadow: "0 10px 20px rgba(15, 82, 255, 0.2)",
                borderRadius: "14px",
                py: 1.8,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#0644e1",
                  boxShadow: "0 12px 25px rgba(15, 82, 255, 0.3)"
                }
              }}
            >
              Back to Home
            </Button>
            
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate(-1)}
              startIcon={<ArrowBack />}
              sx={{
                borderRadius: "14px",
                py: 1.8,
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
              Previous Page
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotAuthorized;
