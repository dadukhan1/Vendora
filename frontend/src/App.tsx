/** @format */

import { Button, ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Products from "./customer/pages/Products/Products";
import Footer from "./customer/Footer";
import ProductDetails from "./customer/pages/Products/ProductDetails/ProductDetails";
import Cart from "./customer/pages/Cart/Cart";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* <Home /> */}
      {/* <Products /> */}
      {/* <ProductDetails /> */}
      <Cart />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
