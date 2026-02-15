/** @format */

import { Divider } from "@mui/material";
import Order from "./Order";
import OrderDetails from "./OrderDetails";
import { Route, Routes, useNavigate } from "react-router";
import UserDetails from "../Profile/UserDetails";

const menu = [
  { name: "Orders ", path: "/account/orders" },
  { name: "Profile", path: "/account/" },
  { name: "Saved Cards", path: "/account/saved-card" },
  { name: "Addresses", path: "/account/addresses" },
  { name: "Logout", path: "/" },
];

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className='px-5 lg:px-52 min-h-screen mt-10'>
      <div>
        <h1 className='text-xl font-bold pb-5'>Jhon Doe</h1>
      </div>
      <Divider />
      <div className='grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]'>
        <div className='col-span-1 lg:border-r border-gray-200 lg:pr-5 py-5 h-full flex-row flex-wrap lg:flex-col gap-3'>
          {menu.map((item) => (
            <div
              onClick={() => navigate(item.path)}
              key={item.path}
              className='px-5 py-3 bg-[#f7f8fd9f] rounded-md hover:bg-teal-500 hover:text-white cursor-pointer'
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div className='lg:col-span-2 lg:pl-5 py-5'>
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
  );
};

export default Profile;
