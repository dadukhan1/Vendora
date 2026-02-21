/** @format */

import {
  AccountBalanceWallet,
  Add,
  Category,
  Dashboard,
  ElectricBolt,
  Home,
  IntegrationInstructions,
  Inventory,
  LocalOffer,
  Logout,
  Receipt,
} from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const menu = [
  {
    name: "DashBoard",
    path: "/admin",
    icon: <Dashboard className='text-teal-600' />,
    activeIcon: <Dashboard className='text-white' />,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: <IntegrationInstructions className='text-teal-600' />,
    activeIcon: <IntegrationInstructions className='text-white' />,
  },
  {
    name: "Add Coupon",
    path: "/admin/add-coupon",
    icon: <Add className='text-teal-600' />,
    activeIcon: <Add className='text-white' />,
  },

  {
    name: "Home Page",
    path: "/admin/home-page",
    icon: <Home className='text-teal-600' />,
    activeIcon: <Home className='text-white' />,
  },
  {
    name: "Electronics Category",
    path: "/admin/electronics-category",
    icon: <ElectricBolt className='text-teal-600' />,
    activeIcon: <ElectricBolt className='text-white' />,
  },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <Category className='text-teal-600' />,
    activeIcon: <Category className='text-white' />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOffer className='text-teal-600' />,
    activeIcon: <LocalOffer className='text-white' />,
  },
];

const menu2 = [
  {
    name: "Logout",
    path: "/",
    icon: <Logout className='text-teal-600' />,
    activeIcon: <Logout className='text-white' />,
  },
];

const AdminDrawerList = ({ toggleDrawwer }: any) => {
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
                className={`${location.pathname === item.path && "bg-teal-500 text-white"}  flex items-center px-5 py-3 rounded-r-full cursor-pointer`}
              >
                <ListItemIcon>
                  {location.pathname === item.path
                    ? item.activeIcon
                    : item.icon}
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
                className={`${location.pathname === item.path && "bg-teal-500 text-white"}  flex items-center px-5 py-3 rounded-r-full cursor-pointer`}
              >
                <ListItemIcon>
                  {location.pathname === item.path
                    ? item.activeIcon
                    : item.icon}
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
