/** @format */

import {
  AccountBalanceWallet,
  AccountBox,
  Add,
  Dashboard,
  Inventory,
  Logout,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { resetSellerState } from "../../Redux Toolkit/features/seller/sellerAuth";
import { logout } from "../../Redux Toolkit/features/auth/authSlice";
import { useAppSelector } from "../../Redux Toolkit/store";

const menu = [
  {
    name: "DashBoard",
    path: "/seller",
    icon: <Dashboard sx={{ fontSize: 22 }} />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag sx={{ fontSize: 22 }} />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory sx={{ fontSize: 22 }} />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <Add sx={{ fontSize: 22 }} />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: <AccountBalanceWallet sx={{ fontSize: 22 }} />,
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <Receipt sx={{ fontSize: 22 }} />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox sx={{ fontSize: 22 }} />,
  },
];

const SellerDrawerList = ({ toggleDrawwer }: any) => {
  const { user } = useAppSelector((store) => store.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetSellerState());
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
              className={`flex items-center gap-3 px-5 py-3.5 rounded-lg cursor-pointer transition-all duration-150 group
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

      {/* Bottom: Account + User + Logout */}
      <div className='px-3 pb-5'>
        <Divider sx={{ mb: 2 }} />

        {/* Account */}
        {menu2.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.name}
              onClick={() => handleClick(item)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-lg cursor-pointer transition-all duration-150 group mb-1
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

        {/* User Info */}
        <div className='flex items-center gap-3 px-3 py-2.5 mb-1'>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              backgroundColor: "#0F52FF",
              fontSize: "0.875rem",
            }}
          >
            {user?.fullName?.charAt(0) || "S"}
          </Avatar>
          <div className='overflow-hidden'>
            <p className='text-sm font-semibold text-gray-900 truncate'>
              {user?.fullName}
            </p>
            <p className='text-[11px] text-gray-400'>Seller</p>
          </div>
        </div>

        {/* Logout */}
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

export default SellerDrawerList;
