/** @format */

import {
  AccountBalanceWallet,
  Add,
  Category,
  Dashboard,
  ElectricBolt,
  Home,
  IntegrationInstructions,
  LocalOffer,
  Logout,
} from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector } from "../../Redux Toolkit/store";

const menu = [
  {
    name: "DashBoard",
    path: "/admin",
    icon: <Dashboard />,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: <IntegrationInstructions />,
  },
  {
    name: "Add Coupon",
    path: "/admin/add-coupon",
    icon: <Add />,
  },
  {
    name: "Home Page",
    path: "/admin/home-page",
    icon: <Home />,
  },
  {
    name: "Electronics Category",
    path: "/admin/electronics-category",
    icon: <ElectricBolt />,
  },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <Category />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOffer />,
  },
];

const menu2 = [
  {
    name: "Logout",
    path: "/",
    icon: <Logout />,
  },
];

const AdminDrawerList = ({ toggleDrawwer }: any) => {
  const { user } = useAppSelector((store) => store.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
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
              <p className='p-6 ml-10 text-lg font-bold '>{user?.fullName}</p>
              <Divider />
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

export default AdminDrawerList;
