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

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const navigate = useNavigate();

  return (
    <Box className='sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80'>
      <div className='flex justify-between items-center px-5 lg:px-20 h-17.5 border-b border-gray-200'>
        <div className='flex items-center gap-9'>
          <div className='flex items-center gap-2'>
            {!isLarge && (
              <IconButton>
                <MenuIcon className='text-gray-700' sx={{ fontSize: 29 }} />
              </IconButton>
            )}
            <h1
              onClick={() => navigate("/")}
              className='text-md md:text-2xl cursor-pointer'
            >
              Vendora
            </h1>
          </div>
          <ul className='flex items-center font-medium text-gray-800'>
            {mainCategory.map((item) => (
              <li
                onMouseEnter={() => {
                  setShowSheet(true);
                  setSelectedCategory(item.categoryId);
                }}
                onMouseLeave={() => setShowSheet(false)}
                key={item.categoryId}
                className='mainCateogry flex items-center hover:text-teal-500 cursor-pointer hover:border-b-2 h-17.5 px-4 border-teal-500 '
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex items-center gap-5 '>
          <IconButton>
            <Search sx={{ fontSize: 29 }} />
          </IconButton>
          {false ? (
            <Button
              onClick={() => navigate("/account")}
              className='flex items-center gap-2'
            >
              <Avatar
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAWbnrBYN8xcnSmAOcZViCHoJWz-ipFaFfFg&s'
                sx={{ height: 29, width: 29 }}
              />
              <h1>UName</h1>
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant='contained'
              startIcon={<AccountCircle />}
            >
              Login
            </Button>
          )}
          <IconButton>
            <FavoriteBorder sx={{ fontSize: 29 }} />
          </IconButton>
          <IconButton>
            <AddShoppingCart
              onClick={() => navigate("/cart")}
              sx={{ fontSize: 29 }}
            />
          </IconButton>
          <Button
            onClick={() => navigate("/become-seller")}
            variant='outlined'
            startIcon={<Storefront />}
          >
            Become a Seller
          </Button>
        </div>
      </div>
      {showSheet && (
        <div
          onMouseEnter={() => setShowSheet(true)}
          onMouseLeave={() => setShowSheet(false)}
          className='categorySheet absolute top-[4.4rem] left-20 right-20'
        >
          <CategorySheet selectedCategory={selectedCategory} />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
