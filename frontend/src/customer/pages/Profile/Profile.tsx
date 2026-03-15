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
  CreditCard,
  LocationOn,
  Logout,
} from "@mui/icons-material";

const menu = [
  {
    name: "Orders",
    path: "/account/orders",
    icon: <GridView sx={{ fontSize: 18 }} />,
    badge: 3,
  },
  {
    name: "Profile",
    path: "/account",
    icon: <Person sx={{ fontSize: 18 }} />,
  },
  {
    name: "Saved Cards",
    path: "/account/saved-card",
    icon: <CreditCard sx={{ fontSize: 18 }} />,
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
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();

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
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <span style={{ fontSize: 14, color: "#94A3B8" }}>Home</span>
          <span style={{ fontSize: 14, color: "#94A3B8" }}>/</span>
          <span style={{ fontSize: 14, color: "#0F52FF", fontWeight: 600 }}>
            My Account
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start">

          {/* ── Sidebar ── */}
          <div
            className="lg:sticky lg:top-24"
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {/* Top accent + avatar */}
            <div
              style={{
                padding: "28px 20px 22px",
                borderBottom: "1px solid #E2E8F0",
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* Blue→orange top bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 4,
                  background: "linear-gradient(90deg, #0F52FF, #FF4F00)",
                  borderRadius: "20px 20px 0 0",
                }}
              />

              {/* Avatar */}
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    background: "#0F52FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: 700,
                    margin: "0 auto",
                  }}
                >
                  {initials}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 2, right: 2,
                    width: 16, height: 16,
                    background: "#22c55e",
                    border: "3px solid #fff",
                    borderRadius: "50%",
                  }}
                />
              </div>

              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0F172A",
                  marginTop: 14,
                }}
              >
                {user?.fullName}
              </p>
              <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>
                {user?.email}
              </p>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  background: "rgba(15,82,255,0.08)",
                  color: "#0F52FF",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "4px 14px",
                  borderRadius: 99,
                  letterSpacing: "0.03em",
                }}
              >
                Premium
              </span>
            </div>

            {/* Nav items */}
            <nav style={{ padding: "12px 10px 16px" }}>
              {menu.map((item, i) => {
                const isActive  = location.pathname === item.path;
                const isLogout  = !!item.isLogout;
                const isDivider = i === menu.length - 1;

                return (
                  <div key={item.path}>
                    {isDivider && (
                      <div
                        style={{
                          height: 1,
                          background: "#E2E8F0",
                          margin: "8px 6px 10px",
                        }}
                      />
                    )}
                    <div
                      onClick={() => handleClick(item)}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                        marginBottom: 3,
                        background: isActive
                          ? "rgba(15,82,255,0.08)"
                          : isLogout
                          ? "rgba(255,79,0,0.03)"
                          : "transparent",
                        border: isLogout
                          ? "1px solid rgba(255,79,0,0.18)"
                          : "1px solid transparent",
                        transition: "background 0.15s",
                      }}
                    >
                      <span
                        style={{
                          color: isActive
                            ? "#0F52FF"
                            : isLogout
                            ? "#FF4F00"
                            : "#94A3B8",
                          display: "flex",
                        }}
                      >
                        {item.icon}
                      </span>
                      <span
                        style={{
                          fontSize: 14.5,
                          fontWeight: isActive ? 700 : 500,
                          color: isActive
                            ? "#0F52FF"
                            : isLogout
                            ? "#FF4F00"
                            : "#94A3B8",
                          flex: 1,
                        }}
                      >
                        {item.name}
                      </span>
                      {"badge" in item && item.badge && (
                        <span
                          style={{
                            background: "#0F52FF",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 700,
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* ── Main content ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Routes>
              <Route path="/"       element={<UserDetails />} />
              <Route path="/orders" element={<Order />} />
              <Route
                path="/orders/:orderId/item/:orderItemId"
                element={<OrderDetails />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;