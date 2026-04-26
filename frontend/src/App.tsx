/** @format */

import { ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/customTheme";
import { Route, Routes } from "react-router";
import SellerDashboard from "./seller/SellerDashboard/SellerDashboard";
import BecomeSeller from "./Auth/BecomeSeller/BecomeSeller";
import CustomerRoutes from "./routes/CustomerRoutes";
import Auth from "./Auth/Auth";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import { useAppDispatch, useAppSelector } from "./Redux Toolkit/store";
import { useEffect } from "react";
import { profile } from "./Redux Toolkit/features/customer/userSlice";
import { fetchSellerProfile } from "./Redux Toolkit/features/seller/sellerSlice";
// import { createHomeCategory } from "./Redux Toolkit/features/customer/homeCategorySlice";
// import { homeCategories } from "./data/homeCategory";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (jwt && !auth.jwt) {
      dispatch(profile(jwt));
      dispatch(fetchSellerProfile());
    }
  }, [auth.jwt, dispatch]);

  useEffect(() => {
    // dispatch(createHomeCategory(homeCategories));
  }, [dispatch]);

  return (
    <ThemeProvider theme={customTheme}>
      <Toaster position='top-center' />
      {/*  Seller Routes */}
      <Routes>
        <Route path='/become-seller' element={<BecomeSeller />} />
        <Route path='/seller/*' element={<SellerDashboard />} />
        <Route path='/admin/*' element={<AdminDashboard />} />
        <Route path='/signin' element={<Auth />} />
        <Route path='/*' element={<CustomerRoutes />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
