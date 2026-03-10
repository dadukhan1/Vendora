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
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { resetSellerState } from "../../Redux Toolkit/features/seller/sellerAuth";
import { logout } from "../../Redux Toolkit/features/auth/authSlice";

const menu = [
  {
    name: "DashBoard",
    path: "/seller",
    icon: <Dashboard />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory />,
  },

  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <Add />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: <AccountBalanceWallet />,
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <Receipt />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout />,
  },
];

const SellerDrawerList = ({ toggleDrawwer }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("logout");
    dispatch(resetSellerState());
    dispatch(logout());
  };

  const handleClick = (item: any) => {
    if (item.name === "Logout") {
      handleLogout();
    }
    navigate(item.path);
    toggleDrawwer(false);
  };

  return (
    <div className='h-full'>
      <div className='flex flex-col justify-between h-full w-75 border-r border-gray-300 py-5'>
        <div className='space-y-2'>
          {menu.map((item) => (
            <div
              onClick={() => handleClick(item)}
              key={item.name}
              className='pr-9 cursor-pointer'
            >
              <p
                className={`group ${location.pathname === item.path && "bg-[#0F52FF] text-white"} hover:bg-[#94A3B8] hover:text-white text-[#0F172A] flex items-center px-5 py-3 rounded-r-full cursor-pointer transition-colors duration-200`}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </p>
            </div>
          ))}
        </div>
        <div className='space-y-2'>
          <Divider />
          {menu2.map((item) => (
            <div
              onClick={() => handleClick(item)}
              key={item.name}
              className='pr-9 cursor-pointer'
            >
              <p
                className={`group ${location.pathname === item.path && "bg-[#0F52FF] text-white"} hover:bg-[#94A3B8] hover:text-white text-[#0F172A] flex items-center px-5 py-3 rounded-r-full cursor-pointer transition-colors duration-200`}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDrawerList;
