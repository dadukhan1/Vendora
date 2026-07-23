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
    name: "Dashboard",
    path: "/seller",
    icon: <Dashboard sx={{ fontSize: 20 }} />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag sx={{ fontSize: 20 }} />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory sx={{ fontSize: 20 }} />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <Add sx={{ fontSize: 20 }} />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: <AccountBalanceWallet sx={{ fontSize: 20 }} />,
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <Receipt sx={{ fontSize: 20 }} />,
  },
];

const menu2 = [
  {
    name: "Account Settings",
    path: "/seller/account",
    icon: <AccountBox sx={{ fontSize: 20 }} />,
  },
];

type SellerDrawerListProps = {
  toggleDrawwer?: (open: boolean) => void;
};

type MenuItem = {
  name: string;
  path?: string;
};

const SellerDrawerList = ({ toggleDrawwer }: SellerDrawerListProps) => {
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

  const handleClick = (item: MenuItem) => {
    if (item.name === "Logout") {
      handleLogout();
      return;
    }
    if (!item.path) return;
    navigate(item.path);
    if (toggleDrawwer) toggleDrawwer(false);
  };

  return (
    <div className='flex flex-col justify-between h-full w-full bg-white border-r border-[#f0ece6] py-6 px-4'>
      {/* Top: Menu List */}
      <div className='space-y-1'>
        <p className='label-overline text-[#9ca3af] px-4 mb-3'>Seller Hub</p>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.name}
              onClick={() => handleClick(item)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group font-[Outfit] font-[600] text-[13px]
                ${
                  isActive
                    ? "bg-[#0a0a0a] text-white"
                    : "text-[#5d5d5d] hover:bg-[#f5f3ef] hover:text-[#0a0a0a]"
                }`}
            >
              <span
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-[#c9993a]"
                    : "text-[#9ca3af] group-hover:text-[#0a0a0a]"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom: Settings + Profile + Logout */}
      <div className='space-y-4'>
        <div>
          {menu2.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.name}
                onClick={() => handleClick(item)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group font-[Outfit] font-[600] text-[13px]
                  ${
                    isActive
                      ? "bg-[#0a0a0a] text-white"
                      : "text-[#5d5d5d] hover:bg-[#f5f3ef] hover:text-[#0a0a0a]"
                  }`}
              >
                <span
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-[#c9993a]"
                      : "text-[#9ca3af] group-hover:text-[#0a0a0a]"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>

        <Divider sx={{ borderColor: "#f0ece6" }} />

        {/* User Card */}
        <div className='flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#f5f3ef] border border-[#ede9e2]'>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "#0a0a0a",
              color: "#c9993a",
              fontWeight: 700,
              fontSize: "0.75rem",
            }}
          >
            {user?.fullName?.charAt(0) || "S"}
          </Avatar>
          <div className='overflow-hidden'>
            <p className='text-[12px] font-[700] font-[Outfit] text-[#0a0a0a] truncate leading-tight'>
              {user?.fullName}
            </p>
            <span className='text-[10px] text-[#9ca3af] font-[Outfit] uppercase tracking-wider font-semibold'>
              Partner Seller
            </span>
          </div>
        </div>

        {/* Logout */}
        <div
          onClick={() => handleClick({ name: "Logout" })}
          className='flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer font-[Outfit] font-[600] text-[13px] text-[#9ca3af] hover:bg-[#fff5f7] hover:text-[#e03c54] transition-all duration-200'
        >
          <Logout sx={{ fontSize: 20 }} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SellerDrawerList;
