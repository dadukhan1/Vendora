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
        background: "linear-gradient(135deg, #f5f7ff 0%, #fafbff 100%)",
        py: { xs: 2, sm: 4, md: 6 },
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
            mb: 4,
            px: 0.5,
          }}
        >
          <Box sx={{ fontSize: "0.875rem", color: "#94a3b8", cursor: "pointer" }}>Home</Box>
          <Box sx={{ fontSize: "0.875rem", color: "#cbd5e1" }}>/</Box>
          <Box sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#0F52FF" }}>My Account</Box>
        </Box>

        {/* Mobile Header: Avatar + User Info */}
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            alignItems: "center",
            gap: 2,
            mb: 3,
            p: 2,
            background: "white",
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              background: "#0F52FF",
              fontSize: "1.5rem",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(15, 82, 255, 0.25)",
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>{user?.fullName}</Box>
            <Box sx={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>{user?.email}</Box>
          </Box>
          
          <Tooltip title="Logout">
            <IconButton 
              onClick={() => handleClick(menu.find(m => m.isLogout)!)}
              sx={{ 
                background: "#fffafb", 
                color: "#ea580c", 
                border: "1px solid #fee2e2",
                "&:hover": { background: "#fee2e2" }
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
            mb: 3,
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
                  borderRadius: "14px",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  minWidth: "auto",
                  px: 3,
                  py: 1.25,
                  flexShrink: 0,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  ...(isActive ? {
                    background: "#0F52FF",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.25)",
                    "&:hover": { background: "#0F52FF" }
                  } : {
                    border: "1.5px solid #e2e8f0",
                    color: item.isLogout ? "#ea580c" : "#64748b",
                    background: "white",
                    "&:hover": { borderColor: item.isLogout ? "#ea580c" : "#0F52FF", color: item.isLogout ? "#ea580c" : "#0F52FF" }
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
            gridTemplateColumns: { xs: "1fr", lg: "300px 1fr" },
            gap: { xs: 3, lg: 5 },
            alignItems: "start",
          }}
        >
          {/* ── Sidebar Card (Desktop Only) ── */}
          <Card
            sx={{
              display: { xs: "none", lg: "block" },
              borderRadius: 4,
              border: "1px solid #e8eef7",
              background: "white",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
              position: "sticky",
              top: 100, // Adjusted for typical navbar spacing
              overflow: "hidden",
            }}
          >
            {/* Profile Section */}
            <CardContent
              sx={{
                px: 3,
                pt: 4,
                pb: 3,
                textAlign: "center",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <Box sx={{ mb: 2.5 }}>
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    mx: "auto",
                    background: "#0F52FF",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    boxShadow: "0 10px 25px rgba(15, 82, 255, 0.2)",
                  }}
                >
                  {initials}
                </Avatar>
              </Box>

              <Box sx={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", mb: 0.5 }}>
                {user?.fullName}
              </Box>
              <Box sx={{ fontSize: "0.875rem", color: "#64748b", fontWeight: 500 }}>
                {user?.email}
              </Box>
            </CardContent>

            {/* Navigation */}
            <Box sx={{ p: 1.5 }}>
              {menu.map((item, index) => {
                const isActive = location.pathname === item.path;
                const isLogout = !!item.isLogout;
                const showDivider = index === menu.length - 1;

                return (
                  <Box key={item.path}>
                    {showDivider && <Divider sx={{ my: 1.5, opacity: 0.5 }} />}
                    <Box
                      onClick={() => handleClick(item)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        px: 2.5,
                        py: 2,
                        borderRadius: 3,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        mb: 0.5,
                        ...(isActive
                          ? {
                            background: "#eff6ff",
                            color: "#0F52FF",
                            "& .item-label": { fontWeight: 800 }
                          }
                          : isLogout
                            ? {
                              color: "#ea580c",
                              "&:hover": { background: "#fff7ed" }
                            }
                            : {
                              color: "#475569",
                              "&:hover": { background: "#f8fafc", color: "#1e293b" }
                            }),
                      }}
                    >
                      <Box sx={{ display: "flex", color: 'inherit' }}>{item.icon}</Box>
                      <Box className="item-label" sx={{ flex: 1, fontSize: "0.95rem", fontWeight: 600 }}>
                        {item.name}
                      </Box>
                      {isActive && (
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#0F52FF" }} />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Card>

          {/* ── Main Content ── */}
          <Box sx={{ flex: 1 }}>
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
