/** @format */

import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import { useState } from "react";
import CategorySheet from "./CategorySheet";
import {
  AddShoppingCart,
  FavoriteBorder,
  Search,
  Storefront,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../Redux Toolkit/store";

const Navbar = () => {
  const { user } = useAppSelector((store) => store.user);
  const { seller } = useAppSelector((store) => store.seller);
  const activeRole = user?.role || (seller ? "ROLE_SELLER" : null);
  const canShowCustomerActions =
    !activeRole || user?.role === "ROLE_CUSTOMER";
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const runSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/products/all?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <Box
      sx={{ zIndex: 1100 }}
      className='sticky top-0 left-0 right-0 backdrop-blur-md bg-white/95 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]'
    >
      <div className='max-w-[1600px] mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-16 h-20 border-b border-gray-100'>
        {/* Left Area: Logo + Navigation */}
        <div className='flex items-center gap-6 lg:gap-12'>
          <div className='flex items-center gap-3'>
            {!isLarge && (
              <IconButton size='small' className='hover:bg-gray-100 transition-colors'>
                <MenuIcon sx={{ fontSize: 26, color: "#1e293b" }} />
              </IconButton>
            )}

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
          </div>

          {isLarge && (
            <ul className='flex items-center h-20 text-[0.9rem] font-bold text-[#475569]'>
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

        {/* Right Area: Actions */}
        <div className='flex items-center gap-1.5 sm:gap-3 px-1 relative'>

          {/* Desktop Search Bar */}
          {isLarge ? (
            <div className='flex items-center gap-3 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl px-4 py-2.5 w-[300px] focus-within:w-[360px] focus-within:bg-white focus-within:border-[#0F52FF] focus-within:shadow-[0_0_0_3px_rgba(15,82,255,0.08)] transition-all duration-300 group'>
              <Search sx={{ fontSize: 20, color: "#94A3B8" }} className='group-focus-within:text-[#0F52FF] transition-colors' />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                placeholder='Search products, brands...'
                className='bg-transparent outline-none text-sm text-[#1E293B] font-medium placeholder-gray-400 w-full'
              />
            </div>
          ) : (
            <div className='flex items-center'>
              <IconButton
                size='small'
                className='hover:bg-gray-100 transition-colors'
                onClick={() => {
                  setSearchOpen((prev) => !prev);
                  if (searchOpen) setSearchQuery("");
                }}
              >
                <Search sx={{ fontSize: 24, color: searchOpen ? "#0F52FF" : "#475569" }} />
              </IconButton>

              {searchOpen && (
                <div className='absolute top-[70px] right-0 w-[280px] sm:w-[320px] bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 z-[1200] animate-in fade-in slide-in-from-top-1 duration-200'>
                  <div className='flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2'>
                    <input
                      autoFocus
                      type='text'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && runSearch()}
                      placeholder='Search...'
                      className='w-full bg-transparent outline-none text-sm text-gray-700 font-medium'
                    />
                    <IconButton size='small' onClick={runSearch} sx={{ color: '#0F52FF' }}>
                      <Search sx={{ fontSize: 18 }} />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className='flex items-center gap-0.5 sm:gap-2'>
            {canShowCustomerActions && (
              <IconButton className='text-[#475569] hover:text-[#0F52FF] hover:bg-blue-50 transition-all'>
                <FavoriteBorder sx={{ fontSize: 24 }} />
              </IconButton>
            )}

            {canShowCustomerActions && (
              <IconButton
                onClick={() => navigate("/cart")}
                className='text-[#475569] hover:text-[#0F52FF] hover:bg-blue-50 transition-all'
              >
                <Badge badgeContent={0} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 18, minWidth: 18 } }}>
                  <AddShoppingCart sx={{ fontSize: 24 }} />
                </Badge>
              </IconButton>
            )}

            <div className='h-8 w-[1px] bg-gray-100 mx-1 hidden sm:block'></div>

            {activeRole ? (
              <>
                {user?.role === "ROLE_CUSTOMER" ? (
                  <Button
                    onClick={() => navigate("/account")}
                    className='group'
                    sx={{
                      ml: 0.5,
                      textTransform: "none",
                      color: "#1E293B",
                      gap: 1.5,
                      borderRadius: "16px",
                      px: { xs: 1, md: 2 },
                      py: 0.75,
                      "&:hover": { backgroundColor: "#F8FAFC" },
                    }}
                  >
                    <Avatar
                      src={user?.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAWbnrBYN8xcnSmAOcZViCHoJWz-ipFaFfFg&s'}
                      sx={{
                        height: 38,
                        width: 38,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        border: '2px solid white'
                      }}
                    />
                    <div className='text-left hidden lg:block leading-tight'>
                      <p className='text-sm font-bold text-[#0F172A]'>{user?.fullName}</p>
                      <p className='text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider'>Customer</p>
                    </div>
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
                      borderRadius: "14px",
                      backgroundColor: "#0F52FF",
                      fontWeight: 700,
                      px: 3,
                      py: 1.2,
                      boxShadow: "0 4px 14px 0 rgba(15, 82, 255, 0.25)",
                      "&:hover": {
                        backgroundColor: "#0D3ABF",
                        boxShadow: "0 6px 20px rgba(15, 82, 255, 0.35)",
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Dashboard
                  </Button>
                )}
              </>
            ) : (
              <div className='flex items-center gap-2 ml-1'>
                <Button
                  onClick={() => navigate("/login")}
                  variant='outlined'
                  sx={{
                    textTransform: "none",
                    borderRadius: "14px",
                    borderColor: "#E2E8F0",
                    color: "#475569",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    px: { xs: 2, md: 3 },
                    py: 1,
                    "&:hover": { borderColor: "#0F52FF", color: "#0F52FF", backgroundColor: 'white' },
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/become-seller")}
                  variant='contained'
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    textTransform: "none",
                    borderRadius: "14px",
                    backgroundColor: "#0F52FF",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    px: 3,
                    py: 1,
                    boxShadow: "0 4px 14px 0 rgba(15, 82, 255, 0.25)",
                    "&:hover": { backgroundColor: "#0D3ABF", boxShadow: "0 6px 20px rgba(15, 82, 255, 0.35)" },
                  }}
                >
                  Sell on Vendora
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Sheet Overlay */}
      {showSheet && (
        <div
          onMouseEnter={() => setShowSheet(true)}
          onMouseLeave={() => setShowSheet(false)}
          className='absolute top-20 left-0 right-0 bg-white shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] border-b border-gray-100 animate-in fade-in slide-in-from-top-1 duration-300'
        >
          <div className='max-w-[1600px] mx-auto'>
            <CategorySheet selectedCategory={selectedCategory} />
          </div>
        </div>
      )}
    </Box>
  );
};

export default Navbar;
