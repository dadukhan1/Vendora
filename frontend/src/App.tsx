/** @format */

import { Button, ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Products from "./customer/pages/Products/Products";
import Footer from "./customer/Footer";
import ProductDetails from "./customer/pages/Products/ProductDetails/ProductDetails";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Navbar from "./customer/components/Navbar/Navbar";
import Profile from "./customer/pages/Order/Profile";
import { Route, Routes } from "react-router";
import SellerDashboard from "./seller/SellerDashboard/SellerDashboard";
import BecomeSeller from "./Auth/BecomeSeller/BecomeSeller";
import CustomerRoutes from "./routes/CustomerRoutes";
import Auth from "./Auth/Auth";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/*  Seller Routes */}
      <Routes>
        <Route path='/become-seller' element={<BecomeSeller />} />
        <Route path='/seller/*' element={<SellerDashboard />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/*' element={<CustomerRoutes />} />
      </Routes>

      
    </ThemeProvider>
  );
}

export default App;
