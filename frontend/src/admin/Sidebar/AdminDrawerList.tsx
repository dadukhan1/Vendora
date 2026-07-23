/** @format */

import {
  Add,
  Category,
  Dashboard,
  Home,
  IntegrationInstructions,
  Logout,
} from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { logout } from "../../Redux Toolkit/features/auth/authSlice";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <Dashboard sx={{ fontSize: 20 }} />,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: <IntegrationInstructions sx={{ fontSize: 20 }} />,
  },
  {
    name: "Add Coupon",
    path: "/admin/add-coupon",
    icon: <Add sx={{ fontSize: 20 }} />,
  },
  {
    name: "Home Page Settings",
    path: "/admin/home-page",
    icon: <Home sx={{ fontSize: 20 }} />,
  },
  {
    name: "Categories",
    path: "/admin/category-management",
    icon: <Category sx={{ fontSize: 20 }} />,
  },
];

const AdminDrawerList = ({ toggleDrawwer }: any) => {
  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  const handleClick = (item: any) => {
    if (item.name === "Logout") {
      handleLogout();
      return;
    }
    navigate(item.path);
    if (toggleDrawwer) toggleDrawwer(false);
  };

  return (
    <div className="flex flex-col justify-between h-full w-full bg-[#0a0a0a] py-6 px-4">
      {/* Top: Menu List */}
      <div className="space-y-1">
        <p className="label-overline text-[#c9993a] px-4 mb-3 font-[Outfit] tracking-widest text-[10px]">
          Admin Panel
        </p>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.name}
              onClick={() => handleClick(item)}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 group font-[Outfit] font-[600] text-[13px]
                ${
                  isActive
                    ? "bg-[#c9993a] text-white"
                    : "text-[#9ca3af] hover:bg-white/5 hover:text-white"
                }`}
            >
              <span
                className={`transition-colors duration-200 ${
                  isActive ? "text-white" : "text-[#9ca3af] group-hover:text-white"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom: Profile + Logout */}
      <div className="space-y-4">
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

        {/* User Card */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/5 border border-white/10">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "#c9993a",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.75rem",
            }}
          >
            {user?.fullName?.charAt(0) || "A"}
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-[12px] font-[700] font-[Outfit] text-white truncate leading-tight">
              {user?.fullName}
            </p>
            <span className="text-[10px] text-[#c9993a] font-[Outfit] uppercase tracking-wider font-semibold">
              Administrator
            </span>
          </div>
        </div>

        {/* Logout */}
        <div
          onClick={() => handleClick({ name: "Logout" })}
          className="flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer font-[Outfit] font-[600] text-[13px] text-[#9ca3af] hover:bg-[#e03c54]/10 hover:text-[#e03c54] transition-all duration-200"
        >
          <Logout sx={{ fontSize: 20 }} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDrawerList;
