/** @format */
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const Navbar = ({ DrawerList }: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleDrawwer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <div className='h-[10] flex items-center px-5 border-b border-gray-300'>
      <div className='flex items-center gap-3'>
        <IconButton onClick={toggleDrawwer(true)} color='primary'>
          <MenuIcon open color='primary' />
        </IconButton>
        <h1
          onClick={() => navigate("/")}
          className='logo text-xl cursor-pointer'
        >
          Vendora
        </h1>
      </div>
      <Drawer open={open} onClose={toggleDrawwer(false)}>
        <DrawerList toggleDrawwer={toggleDrawwer} />
      </Drawer>
    </div>
  );
};

export default Navbar;
