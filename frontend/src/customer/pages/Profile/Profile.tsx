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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-5xl mx-auto px-5 lg:px-8 py-12'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 mb-8'>
          <span className='text-sm text-slate-400'>Home</span>
          <span className='text-sm text-slate-400'>/</span>
          <span className='text-sm text-blue-600 font-semibold'>
            My Account
          </span>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start'>
          {/* ── Sidebar ── */}
          <div className='lg:sticky lg:top-24 bg-white border border-slate-200 rounded-2xl overflow-hidden'>
            {/* Top accent + avatar */}
            <div className='px-5 pt-7 pb-[22px] border-b border-slate-200 text-center relative'>
              {/* Avatar */}
              <div className='relative inline-block mt-2.5'>
                <div className='w-[76px] h-[76px] rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto'>
                  {initials}
                </div>
                {/* Online dot */}
                <div className='absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-[3px] border-white rounded-full' />
              </div>

              <p className='text-base font-bold text-slate-900 mt-3.5'>
                {user?.fullName}
              </p>
              <p className='text-[13px] text-slate-400 mt-1'>{user?.email}</p>

              {/* Premium badge */}
              <span className='inline-block mt-3 bg-blue-600/10 text-blue-600 text-xs font-bold px-3.5 py-1 rounded-full tracking-wide'>
                Premium
              </span>
            </div>

            {/* Nav items */}
            <nav className='px-2.5 pt-3 pb-4'>
              {menu.map((item, i) => {
                const isActive = location.pathname === item.path;
                const isLogout = !!item.isLogout;
                const isDivider = i === menu.length - 1;

                return (
                  <div key={item.path}>
                    {isDivider && (
                      <div className='h-px bg-slate-200 mx-1.5 my-2' />
                    )}
                    <div
                      onClick={() => handleClick(item)}
                      className={[
                        "flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer mb-[3px] transition-colors duration-150",
                        isActive
                          ? "bg-blue-600/10 border border-transparent"
                          : isLogout
                            ? "bg-orange-500/[0.03] border border-orange-500/20"
                            : "border border-transparent hover:bg-slate-100",
                      ].join(" ")}
                    >
                      {/* Icon */}
                      <span
                        className={
                          isActive
                            ? "text-blue-600 flex"
                            : isLogout
                              ? "text-orange-600 flex"
                              : "text-slate-400 flex"
                        }
                      >
                        {item.icon}
                      </span>

                      {/* Label */}
                      <span
                        className={[
                          "flex-1 text-[14.5px]",
                          isActive
                            ? "font-bold text-blue-600"
                            : isLogout
                              ? "font-medium text-orange-600"
                              : "font-medium text-slate-400",
                        ].join(" ")}
                      >
                        {item.name}
                      </span>

                      {/* Badge (optional) */}
                      {"badge" in item && item.badge && (
                        <span className='bg-blue-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center'>
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
          <div className='flex flex-col gap-5'>
            <Routes>
              <Route path='/' element={<UserDetails />} />
              <Route path='/orders' element={<Order />} />
              <Route
                path='/orders/:orderId/item/:orderItemId'
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
