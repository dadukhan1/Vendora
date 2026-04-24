/** @format */

import {
  Add,
  Category,
  Dashboard,
  ElectricBolt,
  Home,
  IntegrationInstructions,
  LocalOffer,
  Logout,
} from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { logout } from "../../Redux Toolkit/features/auth/authSlice";

const menu = [
  {
    name: "DashBoard",
    path: "/admin",
    icon: <Dashboard sx={{ fontSize: 22 }} />,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: <IntegrationInstructions sx={{ fontSize: 22 }} />,
  },
  {
    name: "Add Coupon",
    path: "/admin/add-coupon",
    icon: <Add sx={{ fontSize: 22 }} />,
  },
  {
    name: "Home Page",
    path: "/admin/home-page",
    icon: <Home sx={{ fontSize: 22 }} />,
  },
  {
    name: "Electronics Category",
    path: "/admin/electronics-category",
    icon: <ElectricBolt sx={{ fontSize: 22 }} />,
  },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <Category sx={{ fontSize: 22 }} />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOffer sx={{ fontSize: 22 }} />,
  },
  {
    name: "Category Management",
    path: "/admin/category-management",
    icon: <Category sx={{ fontSize: 22 }} />,
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
    if (item.name === "Logout") handleLogout();
    navigate(item.path);
    toggleDrawwer(false);
  };

  return (
    <div className='flex flex-col justify-between h-full w-68 bg-white border-r border-gray-200'>
      {/* Top: Menu */}
      <div className='px-3 pt-5 space-y-1'>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.name}
              onClick={() => handleClick(item)}
              className={`flex items-center gap-3 px-5 py-4 rounded-lg cursor-pointer transition-all duration-150 group
                ${
                  isActive
                    ? "bg-[#0F52FF] text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <span
                className={
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-600"
                }
              >
                {item.icon}
              </span>
              <span className='text-[0.925rem] font-medium'>{item.name}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom: User + Logout */}
      <div className='px-3 pb-5'>
        <Divider sx={{ mb: 2 }} />

        <div className='flex items-center gap-3 px-3 py-2.5 mb-1'>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              backgroundColor: "#0F52FF",
              fontSize: "0.875rem",
            }}
          >
            {user?.fullName?.charAt(0) || "A"}
          </Avatar>
          <div className='overflow-hidden'>
            <p className='text-sm font-semibold text-gray-900 truncate'>
              {user?.fullName}
            </p>
            <p className='text-[11px] text-gray-400'>Administrator</p>
          </div>
        </div>

        <div
          onClick={() => handleClick({ name: "Logout", path: "/" })}
          className='flex items-center gap-3 px-5 py-3.5 rounded-lg cursor-pointer text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150'
        >
          <Logout sx={{ fontSize: 22 }} />
          <span className='text-[0.925rem] font-medium'>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDrawerList;
