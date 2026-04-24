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
    <nav className='sticky top-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6'>
      <div className='flex items-center gap-4'>
        <IconButton
          onClick={toggleDrawwer(true)}
          className='hover:bg-blue-50 transition-colors'
          sx={{ color: '#0F52FF' }}
        >
          <MenuIcon />
        </IconButton>
        <div
          onClick={() => navigate("/")}
          className='flex items-center gap-2 cursor-pointer group'
        >
          <div className='w-8 h-8 bg-[#0F52FF] rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-sm'>
            <span className='text-white font-bold text-xl'>V</span>
          </div>
          <h1 className='text-xl font-bold bg-gradient-to-r from-[#0F172A] to-[#334155] bg-clip-text text-transparent hidden sm:block'>
            Vendora
          </h1>
        </div>
        <Drawer open={open} onClose={toggleDrawwer(false)}>
          <DrawerList toggleDrawwer={toggleDrawwer} />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
