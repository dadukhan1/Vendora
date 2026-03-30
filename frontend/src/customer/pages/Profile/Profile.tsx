/** @format */

import { Route, Routes, useNavigate, useLocation } from "react-router";
import Order from "../Order/Order";
import OrderDetails from "../Order/OrderDetails";
import UserDetails from "./UserDetails";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { clearUser } from "../../../Redux Toolkit/features/customer/userSlice";
import { logout } from "../../../Redux Toolkit/features/auth/authSlice";
import {
  GridView,
  Person,
  // CreditCard,  // Removed as we don't need saved card anymore
  LocationOn,
  Logout,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
} from "@mui/material";
import { useState } from "react";
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
  // Removed 'Saved Cards' menu entry
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleClick = (item: (typeof menu)[0]) => {
    if (item.isLogout) {
      dispatch(logout());
      dispatch(clearUser());
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
        {/* Breadcrumb */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 4,
            px: 0.5,
          }}
        >
          <Box
            sx={{ fontSize: "0.875rem", color: "#94a3b8", cursor: "pointer" }}
          >
            Home
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "#cbd5e1" }}>/</Box>
          <Box
            sx={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#1976d2",
            }}
          >
            My Account
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "280px 1fr" },
            gap: { xs: 3, lg: 4 },
            alignItems: "start",
          }}
        >
          {/* ── Sidebar Card ── */}
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #e8eef7",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
              position: "sticky",
              top: 24,
              overflow: "hidden",
            }}
          >
            {/* Profile Section */}
            <CardContent
              sx={{
                px: 2.5,
                pt: 3,
                pb: 2,
                textAlign: "center",
                borderBottom: "1px solid #e8eef7",
              }}
            >
              {/* Avatar */}
              <Box sx={{ mb: 2 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    background:
                      "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    boxShadow: "0 8px 20px rgba(25, 118, 210, 0.25)",
                  }}
                >
                  {initials}
                </Avatar>
              </Box>

              {/* User Info */}
              <Box
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  mb: 0.75,
                  letterSpacing: "-0.3px",
                }}
              >
                {user?.fullName}
              </Box>
              <Box
                sx={{
                  fontSize: "0.8125rem",
                  color: "#64748b",
                  wordBreak: "break-all",
                  fontWeight: 500,
                }}
              >
                {user?.email}
              </Box>

              {/* Online Indicator */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.75,
                  mt: 1.5,
                  fontSize: "0.75rem",
                  color: "#22c55e",
                  fontWeight: 600,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                Active Now
              </Box>
            </CardContent>

            {/* Navigation */}
            <Box sx={{ px: 1.5, py: 2 }}>
              {menu.map((item, index) => {
                const isActive = location.pathname === item.path;
                const isLogout = !!item.isLogout;
                const showDivider = index === menu.length - 1;

                return (
                  <Box key={item.path}>
                    {showDivider && (
                      <Divider
                        sx={{
                          my: 1.5,
                          opacity: 0.4,
                        }}
                      />
                    )}

                    <Box
                      onClick={() => handleClick(item)}
                      onMouseEnter={() => setHoveredItem(item.path)}
                      onMouseLeave={() => setHoveredItem(null)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2.5,
                        px: 2.5,
                        py: 2.25,
                        borderRadius: 2,
                        cursor: "pointer",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        mb: 0.75,
                        ...(isActive
                          ? {
                              background:
                                "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                              borderLeft: "3px solid #1976d2",
                              pl: "calc(2.5rem - 3px)",
                              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.12)",
                            }
                          : isLogout
                            ? {
                                background:
                                  hoveredItem === item.path
                                    ? "linear-gradient(135deg, #fff7ed 0%, #fee2e2 100%)"
                                    : "transparent",
                                borderLeft: "3px solid transparent",
                                "&:hover": {
                                  pl: "calc(2.5rem - 3px)",
                                  borderLeftColor: "#ea580c",
                                  boxShadow:
                                    "0 2px 8px rgba(234, 88, 12, 0.08)",
                                },
                              }
                            : {
                                background:
                                  hoveredItem === item.path
                                    ? "#f1f5ff"
                                    : "transparent",
                                borderLeft: "3px solid transparent",
                                "&:hover": {
                                  pl: "calc(2.5rem - 3px)",
                                  borderLeftColor: "#cbd5e1",
                                },
                              }),
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isActive
                            ? "#1976d2"
                            : isLogout
                              ? "#ea580c"
                              : "#64748b",
                          transition: "color 0.2s",
                        }}
                      >
                        {item.icon}
                      </Box>

                      {/* Label */}
                      <Box
                        sx={{
                          flex: 1,
                          fontSize: "0.9375rem",
                          fontWeight: isActive ? 700 : 600,
                          color: isActive
                            ? "#1976d2"
                            : isLogout
                              ? "#ea580c"
                              : "#475569",
                          transition: "color 0.2s",
                        }}
                      >
                        {item.name}
                      </Box>

                      {/* Hover indicator dot */}
                      {hoveredItem === item.path && !isActive && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#cbd5e1",
                            animation:
                              "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                            "@keyframes pulse": {
                              "0%, 100%": { opacity: 0.6 },
                              "50%": { opacity: 1 },
                            },
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Card>

          {/* ── Main Content ── */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Routes>
              <Route path='/' element={<UserDetails />} />
              <Route path='/orders' element={<Order />} />
              <Route path='/addresses' element={<Addresses />} />
              <Route
                path='/orders/:orderId/item/:orderItemId'
                element={<OrderDetails />}
              />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
