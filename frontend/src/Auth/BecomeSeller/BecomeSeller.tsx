import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import {
  ArrowBack,
  People,
  Star,
  TrendingUp,
  Storefront,
  LocalShipping,
  Insights,
  SupportAgent,
} from "@mui/icons-material";
import SellerSignin from "./SellerSignin";
import SellerAccountForm from "./SellerAccountForm";
import { useNavigate } from "react-router";
import { useState } from "react";

/* ─── Design tokens ─────────────────────────────────────────────── */
const P = {
  bg: "#060608",
  gold: "#c9993a",
  goldDim: "rgba(201,153,58,0.15)",
  goldGlow: "rgba(201,153,58,0.08)",
  glass: "rgba(255,255,255,0.055)",
  glassBorder: "rgba(255,255,255,0.1)",
  glassBorderHover: "rgba(201,153,58,0.5)",
  text: "#f2efe9",
  muted: "#6b6b7e",
  subtle: "#c8c4bc",
};

/* ─── Static data ────────────────────────────────────────────────── */
const STATS = [
  { icon: <People sx={{ fontSize: 14 }} />, value: "50K+", label: "Active Sellers" },
  { icon: <TrendingUp sx={{ fontSize: 14 }} />, value: "₹2M+", label: "Monthly Sales" },
  { icon: <Star sx={{ fontSize: 14 }} />, value: "4.9", label: "Seller Rating" },
];

const PERKS = [
  { icon: <LocalShipping sx={{ fontSize: 17 }} />, text: "Free shipping integration & logistics support" },
  { icon: <Insights sx={{ fontSize: 17 }} />, text: "Real-time analytics & sales dashboard" },
  { icon: <SupportAgent sx={{ fontSize: 17 }} />, text: "Dedicated 24/7 seller growth team" },
];

const TESTIMONIAL = {
  name: "Arjun Mehra",
  role: "Electronics Seller · Mumbai",
  quote: "My revenue tripled in 6 months. Vendora's platform just works.",
  avatar: "A",
};

/* ─── Component ──────────────────────────────────────────────────── */
const BecomeSeller = () => {
  const [isSignin, setIsSignin] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: P.bg,
        color: P.text,
        fontFamily: "'Outfit', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Ambient glow blobs ─────────────────────────────────────── */}
      <Box
        sx={{
          position: "fixed",
          top: "10%",
          right: "30%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,153,58,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "fixed",
          bottom: "5%",
          left: "5%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,153,58,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── LEFT — Hero panel ─────────────────────────────────────── */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: "0 0 50%",
          position: "relative",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Hero image */}
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1170&auto=format&fit=crop"
          alt="Become a seller"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.28) saturate(0.6)",
          }}
        />

        {/* Layered gradients */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: [
              "linear-gradient(135deg, rgba(201,153,58,0.22) 0%, transparent 55%)",
              "linear-gradient(to bottom, rgba(6,6,8,0.5) 0%, transparent 30%)",
              "linear-gradient(to top, rgba(6,6,8,1) 0%, rgba(6,6,8,0.7) 40%, transparent 80%)",
            ].join(", "),
          }}
        />

        {/* Vertical gold line accent */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "1px",
            background: "linear-gradient(to bottom, transparent, rgba(201,153,58,0.3) 40%, rgba(201,153,58,0.3) 60%, transparent)",
          }}
        />

        {/* Decorative rings */}
        {[
          { size: 420, offset: -140 },
          { size: 280, offset: -70 },
        ].map(({ size, offset }) => (
          <Box
            key={size}
            sx={{
              position: "absolute",
              top: offset,
              left: offset,
              width: size,
              height: size,
              borderRadius: "50%",
              border: "1px solid rgba(201,153,58,0.12)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Content layer */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: { md: 5, lg: 6 },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: P.goldDim,
                border: "1px solid rgba(201,153,58,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Storefront sx={{ fontSize: 20, color: P.gold }} />
            </Box>
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 19,
                color: P.text,
                letterSpacing: 0.5,
              }}
            >
              Vendora
            </Typography>
          </Box>

          {/* Main content pushed to bottom */}
          <Box sx={{ mt: "auto" }}>
            {/* Eyebrow */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.6,
                mb: 2.5,
                borderRadius: "999px",
                background: P.goldDim,
                border: "1px solid rgba(201,153,58,0.25)",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: P.gold,
                  boxShadow: `0 0 6px ${P.gold}`,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  color: P.gold,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Seller Programme
              </Typography>
            </Box>

            {/* Headline */}
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: { md: "2.5rem", lg: "3rem" },
                lineHeight: 1.15,
                color: P.text,
                mb: 1.5,
              }}
            >
              Grow your{" "}
              <Box
                component="span"
                sx={{
                  color: P.gold,
                  fontStyle: "italic",
                }}
              >
                business
              </Box>
              <br />
              with Vendora.
            </Typography>

            <Typography
              sx={{
                fontSize: "0.92rem",
                color: P.muted,
                mb: 3.5,
                maxWidth: 380,
                lineHeight: 1.75,
              }}
            >
              Join India's fastest-growing seller community and unlock tools
              built to scale your store.
            </Typography>

            {/* Perks */}
            <Stack spacing={2} sx={{ mb: 4 }}>
              {PERKS.map((p) => (
                <Box key={p.text} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "9px",
                      background: P.goldDim,
                      border: "1px solid rgba(201,153,58,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: P.gold,
                      flexShrink: 0,
                    }}
                  >
                    {p.icon}
                  </Box>
                  <Typography sx={{ fontSize: "0.875rem", color: P.subtle, lineHeight: 1.5 }}>
                    {p.text}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Stats bar */}
            <Box
              sx={{
                display: "flex",
                gap: 0,
                borderRadius: "16px",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${P.glassBorder}`,
                overflow: "hidden",
                width: "fit-content",
                mb: 4,
              }}
            >
              {STATS.map((s, i) => (
                <Box key={s.label}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      px: 3,
                      py: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.25, color: P.gold }}>
                      {s.icon}
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "1.05rem",
                          color: P.text,
                          fontFamily: "'Outfit', sans-serif",
                          lineHeight: 1,
                        }}
                      >
                        {s.value}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.68rem",
                        color: P.muted,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {s.label}
                    </Typography>
                  </Box>
                  {i < STATS.length - 1 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ borderColor: P.glassBorder, display: "inline-flex" }}
                    />
                  )}
                </Box>
              ))}
            </Box>

            {/* Testimonial */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                borderRadius: "14px",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${P.glassBorder}`,
                maxWidth: 400,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: P.goldDim,
                  color: P.gold,
                  border: "1px solid rgba(201,153,58,0.3)",
                  width: 38,
                  height: 38,
                  fontSize: "0.95rem",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {TESTIMONIAL.avatar}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: "0.82rem", color: P.subtle, lineHeight: 1.5, mb: 0.5, fontStyle: "italic" }}>
                  "{TESTIMONIAL.quote}"
                </Typography>
                <Typography sx={{ fontSize: "0.72rem", color: P.muted, fontWeight: 600 }}>
                  {TESTIMONIAL.name} · {TESTIMONIAL.role}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── RIGHT — Form panel ────────────────────────────────────── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 4, md: 5, lg: 7 },
          py: { xs: 5, md: 6 },
          position: "relative",
          overflowY: "auto",
          zIndex: 1,
        }}
      >
        {/* Back button */}
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
            color: P.muted,
            border: `1px solid ${P.glassBorder}`,
            borderRadius: "12px",
            px: 2,
            py: 0.9,
            gap: 0.75,
            fontSize: "0.8rem",
            fontFamily: "'Outfit', sans-serif",
            transition: "all 0.2s ease",
            "&:hover": {
              color: P.gold,
              borderColor: "rgba(201,153,58,0.45)",
              background: P.goldGlow,
            },
          }}
        >
          <ArrowBack sx={{ fontSize: 15 }} />
          <Typography variant="caption" sx={{ fontFamily: "inherit", fontWeight: 600 }}>
            Home
          </Typography>
        </IconButton>

        {/* Mobile logo */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1, mb: 5 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              background: P.goldDim,
              border: "1px solid rgba(201,153,58,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Storefront sx={{ fontSize: 18, color: P.gold }} />
          </Box>
          <Typography
            sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: P.text }}
          >
            Vendora
          </Typography>
        </Box>

        {/* Card */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 448,
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            border: `1px solid ${P.glassBorder}`,
            borderRadius: "28px",
            p: { xs: 3, sm: "36px" },
            boxShadow: "0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Card inner top-right glow */}
          <Box
            sx={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,153,58,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Heading */}
          <Box sx={{ mb: 3, position: "relative" }}>
            <Typography
              sx={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: P.gold,
                mb: 1,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {isSignin ? "Welcome back" : "Get started — it's free"}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: { xs: "1.55rem", sm: "1.85rem" },
                color: P.text,
                lineHeight: 1.2,
                mb: 0.75,
              }}
            >
              {isSignin ? "Sign in to your store" : "Create seller account"}
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", color: P.muted, lineHeight: 1.65 }}>
              {isSignin
                ? "Access your dashboard, orders & live analytics."
                : "Join 50,000+ sellers reaching millions of buyers daily."}
            </Typography>
          </Box>

          {/* Segmented toggle */}
          <Box
            sx={{
              display: "flex",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "14px",
              p: "4px",
              mb: 3.5,
              border: `1px solid ${P.glassBorder}`,
              gap: "4px",
            }}
          >
            {[
              { label: "Register", active: !isSignin },
              { label: "Sign In", active: isSignin },
            ].map(({ label, active }) => (
              <Box
                key={label}
                onClick={() => setIsSignin(label === "Sign In")}
                sx={{
                  flex: 1,
                  py: 1.1,
                  textAlign: "center",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.84rem",
                  transition: "all 0.22s ease",
                  background: active
                    ? "linear-gradient(135deg, #d4a843 0%, #c9993a 100%)"
                    : "transparent",
                  color: active ? "#0a0a0a" : P.muted,
                  boxShadow: active ? "0 4px 16px rgba(201,153,58,0.35)" : "none",
                  "&:hover": !active ? { color: P.text, background: "rgba(255,255,255,0.04)" } : {},
                }}
              >
                {label}
              </Box>
            ))}
          </Box>

          {/* Form */}
          <Box>{isSignin ? <SellerSignin /> : <SellerAccountForm />}</Box>
        </Paper>

        {/* Social proof row below card */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/* Stacked avatars */}
          <Box sx={{ display: "flex" }}>
            {["R", "S", "M"].map((l, i) => (
              <Avatar
                key={l}
                sx={{
                  width: 26,
                  height: 26,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  bgcolor: ["#2d4a2d", "#4a2d2d", "#2d2d4a"][i],
                  border: `2px solid ${P.bg}`,
                  ml: i === 0 ? 0 : "-8px",
                  color: P.subtle,
                }}
              >
                {l}
              </Avatar>
            ))}
          </Box>
          <Typography sx={{ fontSize: "0.75rem", color: P.muted }}>
            <Box component="span" sx={{ color: P.gold, fontWeight: 700 }}>
              1,200+
            </Box>{" "}
            sellers joined this week
          </Typography>
        </Box>

        {/* Footer */}
        <Typography
          sx={{
            mt: 2,
            fontSize: "0.72rem",
            color: P.muted,
            textAlign: "center",
            maxWidth: 340,
            lineHeight: 1.7,
          }}
        >
          By continuing, you agree to our{" "}
          <Box
            component="span"
            sx={{ color: P.gold, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          >
            Terms
          </Box>{" "}
          and{" "}
          <Box
            component="span"
            sx={{ color: P.gold, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          >
            Privacy Policy
          </Box>
          .
        </Typography>
      </Box>
    </Box>
  );
};

export default BecomeSeller;
