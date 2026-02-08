/** @format */

import { Button, ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/customTheme";
import Home from "./customer/pages/Home/Home";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Button variant='contained' color='secondary'>
        {" "}
        GG kay ho gaya
      </Button>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Home />
    </ThemeProvider>
  );
}

export default App;
