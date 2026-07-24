/** @format */

import { Route, Routes, useNavigate, useLocation } from "react-router";
import Order from "../Order/Order";
import OrderDetails from "../Order/OrderDetails";
import UserDetails from "./UserDetails";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { clearUser } from "../../../Redux Toolkit/features/customer/userSlice";
import { logout } from "../../../Redux Toolkit/features/auth/authSlice";
import { logoutSeller } from "../../../Redux Toolkit/features/seller/sellerSlice";
import {
  GridView,
  Person,
  LocationOn,
  Logout,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Avatar,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import Addresses from "./Addresses";

const GOLD = "#c9993a";
const DARK = "#0a0a0a";

const menu = [
  {
    name: "Profile",
    path: "/account",
    icon: <Person sx={{ fontSize: 18 }} />,
  },
  {
    name: "Orders",
    path: "/account/orders",
    icon: <GridView sx={{ fontSize: 18 }} />,
  },
  {
    name: "Addresses",
    path: "/account/addresses",
    icon: <LocationOn sx={{ fontSize: 18 }} />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout sx={{ fontSize: 18 }} />,
    isLogout: true,
  },
];

const Profile = () => {
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item: (typeof menu)[0]) => {
    if (item.isLogout) {
      dispatch(logout());
      dispatch(clearUser());
      dispatch(logoutSeller());
    }
    navigate(item.path);
  };

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#fafaf8",
        fontFamily: "Outfit, sans-serif",
        py: { xs: 3, sm: 5, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Breadcrumb - Hidden on very small screens for space */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1.5,
            mb: 5,
            px: 0.5,
          }}
        >
          <Box sx={{ fontSize: "0.85rem", color: "#9ca3af", cursor: "pointer", fontWeight: 500, fontFamily: "Outfit, sans-serif" }}>Home</Box>
          <Box sx={{ fontSize: "0.85rem", color: "#e5e7eb" }}>/</Box>
          <Box sx={{ fontSize: "0.85rem", fontWeight: 700, color: GOLD, fontFamily: "Outfit, sans-serif" }}>My Account</Box>
        </Box>

        {/* Mobile Header: Avatar + User Info */}
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            alignItems: "center",
            gap: 2,
            mb: 4,
            p: 2.5,
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            border: "1px solid #f0ece6",
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              background: DARK,
              color: GOLD,
              fontSize: "1.5rem",
              fontWeight: 800,
              fontFamily: "Outfit, sans-serif",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ fontSize: "1.2rem", fontWeight: 800, color: DARK, fontFamily: "Outfit, sans-serif", mb: 0.5 }}>{user?.fullName}</Box>
            <Box sx={{ fontSize: "0.85rem", color: "#9ca3af", fontWeight: 500, fontFamily: "Outfit, sans-serif" }}>{user?.email}</Box>
          </Box>
          
          <Tooltip title="Logout">
            <IconButton 
              onClick={() => handleClick(menu.find(m => m.isLogout)!)}
              sx={{ 
                background: "#fafaf8", 
                color: "#f43f5e", 
                border: "1px solid #e5e7eb",
                "&:hover": { background: "#fef1f2", borderColor: "#f43f5e" }
              }}
            >
              <Logout sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Mobile Navigation Bar (Horizontal Scroll) */}
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            gap: 1.5,
            overflowX: "auto",
            pb: 2,
            mb: 4,
            px: 0.5,
            "::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                onClick={() => handleClick(item)}
                startIcon={item.icon}
                sx={{
                  borderRadius: "999px",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  minWidth: "auto",
                  px: 3,
                  py: 1.25,
                  flexShrink: 0,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  fontFamily: "Outfit, sans-serif",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  ...(isActive ? {
                    background: "linear-gradient(135deg, #d4a348 0%, #c9993a 100%)",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(201, 153, 58, 0.3)",
                    "&:hover": { opacity: 0.95 }
                  } : {
                    border: "1.5px solid #e5e7eb",
                    color: item.isLogout ? "#f43f5e" : "#5d5d5d",
                    background: "white",
                    "&:hover": { borderColor: item.isLogout ? "#f43f5e" : GOLD, color: item.isLogout ? "#f43f5e" : GOLD }
                  })
                }}
              >
                {item.name}
              </Button>
            );
          })}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "280px 1fr" },
            gap: { xs: 3, lg: 6 },
            alignItems: "start",
          }}
        >
          {/* ── Sidebar Card (Desktop Only) ── */}
          <Card
            sx={{
              display: { xs: "none", lg: "block" },
              borderRadius: "24px",
              border: "1px solid #f0ece6",
              background: "white",
              boxShadow: "0 4px 40px rgba(0, 0, 0, 0.04)",
              position: "sticky",
              top: 120, // Adjusted for typical navbar spacing
              overflow: "hidden",
            }}
          >
            {/* Profile Section */}
            <CardContent
              sx={{
                px: 3,
                pt: 5,
                pb: 4,
                textAlign: "center",
                borderBottom: "1px solid #f0ece6",
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Avatar
                  sx={{
                    width: 96,
                    height: 96,
                    mx: "auto",
                    background: DARK,
                    color: GOLD,
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    fontFamily: "Outfit, sans-serif",
                    boxShadow: "0 8px 24px rgba(10, 10, 10, 0.12)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": { transform: "scale(1.05)" }
                  }}
                >
                  {initials}
                </Avatar>
              </Box>

              <Box sx={{ fontSize: "1.3rem", fontWeight: 800, color: DARK, mb: 0.5, fontFamily: "Outfit, sans-serif" }}>
                {user?.fullName}
              </Box>
              <Box sx={{ fontSize: "0.85rem", color: "#9ca3af", fontWeight: 500, fontFamily: "Outfit, sans-serif" }}>
                {user?.email}
              </Box>
            </CardContent>

            {/* Navigation */}
            <Box sx={{ p: 2 }}>
              {menu.map((item, index) => {
                const isActive = location.pathname === item.path;
                const isLogout = !!item.isLogout;
                const showDivider = index === menu.length - 1;

                return (
                  <Box key={item.path}>
                    {showDivider && <Divider sx={{ my: 2, borderColor: "#f0ece6" }} />}
                    <Box
                      onClick={() => handleClick(item)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        px: 2.5,
                        py: 2,
                        borderRadius: "14px",
                        cursor: "pointer",
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        mb: 0.5,
                        ...(isActive
                          ? {
                            background: "linear-gradient(135deg, #fffcf5 0%, #fff6e5 100%)",
                            color: GOLD,
                            border: "1px solid #fde6b3",
                            boxShadow: "0 2px 8px rgba(201, 153, 58, 0.1)",
                            "& .item-label": { fontWeight: 800 }
                          }
                          : isLogout
                            ? {
                              color: "#f43f5e",
                              "&:hover": { background: "#fef1f2", transform: "translateX(4px)" }
                            }
                            : {
                              color: "#5d5d5d",
                              "&:hover": { background: "#fafaf8", color: DARK, transform: "translateX(4px)" }
                            }),
                      }}
                    >
                      <Box sx={{ display: "flex", color: isActive ? GOLD : 'inherit' }}>{item.icon}</Box>
                      <Box className="item-label" sx={{ flex: 1, fontSize: "0.95rem", fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>
                        {item.name}
                      </Box>
                      {isActive && (
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, boxShadow: "0 0 8px rgba(201,153,58,0.5)" }} />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Card>

          {/* ── Main Content ── */}
          <Box 
            key={location.pathname}
            sx={{ 
              flex: 1, 
              minWidth: 0,
              minHeight: { xs: "400px", lg: "600px" },
              animation: "fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              "@keyframes fadeInUp": {
                "0%": { opacity: 0, transform: "translateY(8px)" },
                "100%": { opacity: 1, transform: "translateY(0)" }
              }
            }}
          >
            <Routes>
              <Route path='/' element={<UserDetails />} />
              <Route path='/orders' element={<Order />} />
              <Route path='/addresses' element={<Addresses />} />
              <Route path='/orders/:orderId/item/:orderItemId' element={<OrderDetails />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
