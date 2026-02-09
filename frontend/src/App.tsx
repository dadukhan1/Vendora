/** @format */

import { Button, ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";
import Products from "./customer/pages/Products/Products";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* <Home /> */}
      <Products />
    </ThemeProvider>
  );
}

export default App;
