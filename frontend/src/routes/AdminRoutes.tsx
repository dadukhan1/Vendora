/** @format */

import { Route, Routes } from "react-router";
import SellerTable from "../admin/Seller/SellerTable";
import Coupon from "../admin/Coupon/Coupon";
import CouponForm from "../admin/Coupon/CouponForm";
import GridTable from "../admin/Homepage/GridTable";
import ElectronicsTable from "../admin/Homepage/ElectronicsTable";
import ShopByCategory from "../admin/Homepage/ShopByCategory";
import Deal from "../admin/Deal/Deal";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SellerTable />} />
        <Route path='/coupons' element={<Coupon />} />
        <Route path='/add-coupon' element={<CouponForm />} />
        <Route path='/home-page' element={<GridTable />} />
        <Route path='/electronics-category' element={<ElectronicsTable />} />
        <Route path='/shop-by-category' element={<ShopByCategory />} />
        <Route path='/deal' element={<Deal />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
