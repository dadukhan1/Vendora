/** @format */

import { Button, ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
