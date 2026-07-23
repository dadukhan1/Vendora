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
    <nav className="sticky top-0 z-50 h-[68px] bg-white/90 backdrop-blur-xl border-b border-[#f0ece6] flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {DrawerList && (
          <IconButton
            onClick={toggleDrawwer(true)}
            sx={{
              color: "#0a0a0a",
              "&:hover": { bg: "#f5f3ef" },
              display: { lg: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 bg-[#0a0a0a] rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#c9993a] transition-colors duration-300">
            <span className="text-white font-bold text-sm tracking-tight font-[Outfit]">V</span>
          </div>
          <h1 className="text-[17px] font-[800] text-[#0a0a0a] hidden sm:block tracking-[-0.03em] font-[Outfit]">
            Vendora
          </h1>
        </div>
        {DrawerList && (
          <Drawer open={open} onClose={toggleDrawwer(false)}>
            <div className="w-72 h-full">
              <DrawerList toggleDrawwer={toggleDrawwer} />
            </div>
          </Drawer>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
