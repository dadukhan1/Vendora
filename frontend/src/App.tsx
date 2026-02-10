/** @format */

import { Button, ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Products from "./customer/pages/Products/Products";
import Footer from "./customer/Footer";
import ProductDetails from "./customer/pages/Products/ProductDetails/ProductDetails";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* <Home /> */}
      {/* <Products /> */}
      <ProductDetails />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
