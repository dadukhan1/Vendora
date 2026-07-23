/** @format */

import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#c9993a",
      light: "#e8b84b",
      dark: "#a67c2e",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#e03c54",
      light: "#f05570",
      dark: "#c02040",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#fafaf8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0a0a0a",
      secondary: "#9ca3af",
    },
    divider: "#f0ece6",
  },
  typography: {
    fontFamily: "\"Inter\", \"Outfit\", sans-serif",
    h1: { fontWeight: 700, fontFamily: "Playfair Display, serif", letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, fontFamily: "Playfair Display, serif", letterSpacing: "-0.015em" },
    h3: { fontWeight: 700, fontFamily: "Outfit, sans-serif", letterSpacing: "-0.01em" },
    h4: { fontWeight: 700, fontFamily: "Outfit, sans-serif" },
    h5: { fontWeight: 700, fontFamily: "Outfit, sans-serif" },
    h6: { fontWeight: 700, fontFamily: "Outfit, sans-serif" },
    button: {
      fontFamily: "\"Outfit\", sans-serif",
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "9999px",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        containedPrimary: {
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#c9993a" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
        elevation1: {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
          border: "1px solid #f0ece6",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "14px",
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#d4c4a8" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#c9993a" },
        },
        notchedOutline: { borderColor: "#f0ece6" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: "9999px" },
      },
    },
  },
});
