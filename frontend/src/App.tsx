/** @format */

import { ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/customTheme";
import { Route, Routes } from "react-router";
import SellerDashboard from "./seller/SellerDashboard/SellerDashboard";
import BecomeSeller from "./Auth/BecomeSeller/BecomeSeller";
import CustomerRoutes from "./routes/CustomerRoutes";
import Auth from "./Auth/Auth";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "./Redux Toolkit/store";
import { useEffect } from "react";
import { profile } from "./Redux Toolkit/features/customer/userSlice";
import { fetchSellerProfile } from "./Redux Toolkit/features/seller/sellerSlice";
import { fetchCart } from "./Redux Toolkit/features/customer/cartSlice";
// import { createHomeCategory } from "./Redux Toolkit/features/customer/homeCategorySlice";
// import { homeCategories } from "./data/homeCategory";
import { Toaster } from "react-hot-toast";
import { getWishlist } from "./Redux Toolkit/features/customer/wishlistSlice";

function App() {
  const dispatch = useAppDispatch();
  const { auth, user, seller } = useAppSelector((store) => store);

  useEffect(() => {
    if (auth.jwt && !user.user && !seller.profile) {
      if (auth.role === "ROLE_SELLER") {
        dispatch(fetchSellerProfile());
      } else if (auth.role === "ROLE_CUSTOMER" || auth.role === "ROLE_ADMIN") {
        dispatch(profile(auth.jwt));
      } else {
        // If role is missing, fetch both to determine the user's identity
        dispatch(profile(auth.jwt));
        dispatch(fetchSellerProfile());
      }
      dispatch(getWishlist());
      dispatch(fetchCart());
    }
  }, [auth.jwt, auth.role, user.user, seller.profile, dispatch]);

  return (
    <ThemeProvider theme={customTheme}>
      <Toaster position='top-center' />
      {/*  Seller Routes */}
      <Routes>
        <Route path='/become-seller' element={<BecomeSeller />} />
        <Route
          path='/seller/*'
          element={
            <ProtectedRoute requiredRole='ROLE_SELLER'>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/*'
          element={
            <ProtectedRoute requiredRole='ROLE_ADMIN'>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/signin' element={<Auth />} />
        <Route path='/*' element={<CustomerRoutes />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
