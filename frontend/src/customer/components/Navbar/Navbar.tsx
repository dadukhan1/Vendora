/** @format */

import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import { useState } from "react";
import CategorySheet from "./CategorySheet";
import {
  AccountCircle,
  AddShoppingCart,
  FavoriteBorder,
  Search,
  Storefront,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../Redux Toolkit/store";

const Navbar = () => {
  const { user } = useAppSelector((store) => store.user);
  const { role } = useAppSelector((store) => store.auth);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const navigate = useNavigate();

  return (
    <Box
      sx={{ zIndex: 1100 }}
      className='sticky top-0 left-0 right-0 backdrop-blur-md bg-white/90 shadow-sm'
    >
      <div className='flex justify-between items-center px-5 lg:px-24 h-20 border-b border-gray-100'>
        {/* Left: Logo + Categories */}
        <div className='flex items-center gap-10'>
          <div className='flex items-center gap-2'>
            {!isLarge && (
              <IconButton size='small'>
                <MenuIcon sx={{ fontSize: 28, color: "#374151" }} />
              </IconButton>
            )}
            <h1
              onClick={() => navigate("/")}
              className='text-2xl md:text-3xl font-bold tracking-tight cursor-pointer text-gray-900 hover:text-[#0F52FF] transition-colors duration-200'
            >
              Vendora
            </h1>
          </div>

          {isLarge && (
            <ul className='flex items-center text-[0.95rem] font-medium text-gray-600'>
              {mainCategory.map((item) => (
                <li
                  onMouseEnter={() => {
                    setShowSheet(true);
                    setSelectedCategory(item.categoryId);
                  }}
                  onMouseLeave={() => setShowSheet(false)}
                  key={item.categoryId}
                  className='relative flex items-center h-20 px-5 cursor-pointer hover:text-[#0F52FF] transition-colors duration-150 group'
                >
                  {item.name}
                  <span className='absolute bottom-0 left-5 right-5 h-0.5 bg-[#0F52FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full' />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: Actions */}
        <div className='flex items-center gap-2'>
          <IconButton sx={{ color: "#374151" }}>
            <Search sx={{ fontSize: 26 }} />
          </IconButton>

          <IconButton sx={{ color: "#374151" }}>
            <FavoriteBorder sx={{ fontSize: 26 }} />
          </IconButton>

          <IconButton
            onClick={() => navigate("/cart")}
            sx={{ color: "#374151" }}
          >
            <AddShoppingCart sx={{ fontSize: 26 }} />
          </IconButton>

          {user ? (
            <>
              {user?.role === "ROLE_CUSTOMER" ? (
                <Button
                  onClick={() => navigate("/account")}
                  sx={{
                    ml: 1,
                    textTransform: "none",
                    color: "#111",
                    gap: 1,
                    borderRadius: "999px",
                    px: 2,
                    py: 1,
                    "&:hover": { backgroundColor: "#f3f4f6" },
                  }}
                >
                  <Avatar
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAWbnrBYN8xcnSmAOcZViCHoJWz-ipFaFfFg&s'
                    sx={{ height: 34, width: 34 }}
                  />
                  <span className='text-sm font-semibold hidden md:block'>
                    {user?.fullName}
                  </span>
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    navigate(
                      `${user?.role === "ROLE_ADMIN" ? "/admin" : "/seller"}`,
                    )
                  }
                  variant='contained'
                  startIcon={<Storefront sx={{ fontSize: 20 }} />}
                  sx={{
                    ml: 1,
                    textTransform: "none",
                    borderRadius: "999px",
                    backgroundColor: "#0F52FF",
                    fontSize: "0.875rem",
                    px: 2.5,
                    py: 1,
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#0040cc",
                      boxShadow: "none",
                    },
                  }}
                >
                  Go To Dashboard
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                variant='outlined'
                startIcon={<AccountCircle sx={{ fontSize: 20 }} />}
                sx={{
                  ml: 1,
                  textTransform: "none",
                  borderRadius: "999px",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: "0.875rem",
                  px: 2.5,
                  py: 1,
                  "&:hover": { borderColor: "#0F52FF", color: "#0F52FF" },
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/become-seller")}
                variant='contained'
                startIcon={<Storefront sx={{ fontSize: 20 }} />}
                sx={{
                  ml: 1,
                  textTransform: "none",
                  borderRadius: "999px",
                  backgroundColor: "#0F52FF",
                  fontSize: "0.875rem",
                  px: 2.5,
                  py: 1,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#0040cc", boxShadow: "none" },
                }}
              >
                Become a Seller
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Category Sheet */}
      {showSheet && (
        <div
          onMouseEnter={() => setShowSheet(true)}
          onMouseLeave={() => setShowSheet(false)}
          className='absolute top-20 left-24 right-24 shadow-xl rounded-xl overflow-hidden'
        >
          <CategorySheet selectedCategory={selectedCategory} />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
