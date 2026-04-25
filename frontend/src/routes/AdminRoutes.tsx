/** @format */

import { Route, Routes } from "react-router";
import SellerTable from "../admin/Seller/SellerTable";
import Coupon from "../admin/Coupon/Coupon";
import CouponForm from "../admin/Coupon/CouponForm";
import ElectronicsTable from "../admin/Homepage/ElectronicsTable";
import ShopByCategory from "../admin/Homepage/ShopByCategory";
import Deal from "../admin/Deal/Deal";
import CategoryManager from "../admin/Category/CategoryManager";
import HomeManager from "../admin/Homepage/HomeManager";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path='/*'
          element={
            <ProtectedRoute requiredRole='ROLE_ADMIN'>
              <Routes>
                <Route path='/' element={<SellerTable />} />
                <Route path='/coupons' element={<Coupon />} />
                <Route path='/add-coupon' element={<CouponForm />} />
                <Route path='/home-page' element={<HomeManager />} />
                <Route
                  path='/electronics-category'
                  element={<ElectronicsTable />}
                />
                <Route path='/shop-by-category' element={<ShopByCategory />} />
                <Route path='/deals' element={<Deal />} />
                <Route
                  path='/category-management'
                  element={<CategoryManager />}
                />
              </Routes>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default AdminRoutes;
