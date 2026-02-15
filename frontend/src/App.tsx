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

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Navbar />
      {/* <Home /> */}
      {/* <Products /> */}
      {/* <ProductDetails /> */}
      {/* <Cart /> */}
      {/* <Checkout /> */}
      <Profile />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
