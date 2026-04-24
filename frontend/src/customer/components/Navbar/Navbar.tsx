/** @format */

import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { fetchAllCategories } from "../../../Redux Toolkit/features/category/categorySlice.ts";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { useNavigate } from "react-router";
import CategorySheet from "./CategorySheet";
import {
  AddShoppingCart,
  FavoriteBorder,
  Search,
  Storefront,
  ChevronRight,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { user } = useAppSelector((store) => store.user);
  const { seller } = useAppSelector((store) => store.seller);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  const activeRole = user?.role || (seller ? "ROLE_SELLER" : null);
  const canShowCustomerActions =
    !activeRole || user?.role === "ROLE_CUSTOMER";
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedLevel1, setExpandedLevel1] = useState<string | null>(null);

  const navigate = useNavigate();

  const runSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/products/all?search=${encodeURIComponent(trimmed)}`);
  };

  const handleMobileMenuToggle = (open: boolean) => () => {
    setMobileMenuOpen(open);
  };

  const handleLevel1Toggle = (categoryId: string) => {
    setExpandedLevel1(expandedLevel1 === categoryId ? null : categoryId);
  };

  const getCategoriesByParentId = (parentCategoryId: string | null) => {
    return categories.filter((cat) => {
      let catParentId: string | null = null;
      if (typeof cat.parentCategory === "object" && cat.parentCategory !== null) {
        catParentId = (cat.parentCategory as any)._id;
      } else {
        catParentId = cat.parentCategory as string | null;
      }
      return catParentId === parentCategoryId;
    });
  };

  const level1Categories = getCategoriesByParentId(null);

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
              <IconButton
                size='small'
                className='hover:bg-gray-100 transition-colors'
                onClick={handleMobileMenuToggle(true)}
              >
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
              {level1Categories.slice(0, 5).map((item) => (
                <li
                  onMouseEnter={() => {
                    setShowSheet(true);
                    setSelectedCategory(item._id);
                  }}
                  onMouseLeave={() => setShowSheet(false)}
                  key={item._id}
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

      {/* Mobile Drawer */}
      <Drawer
        anchor='left'
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle(false)}
        PaperProps={{
          sx: { width: 320, borderRadius: '0 24px 24px 0', border: 'none' }
        }}
      >
        <Box sx={{ p: 3, h: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 bg-[#0F52FF] rounded-xl flex items-center justify-center shadow-md'>
                <span className='text-white font-bold text-lg'>V</span>
              </div>
              <span className='text-xl font-black text-gray-900 tracking-tight'>Vendora</span>
            </div>
            <IconButton
              onClick={handleMobileMenuToggle(false)}
              sx={{ bgcolor: '#F8FAFC', '&:hover': { bgcolor: '#F1F5F9' } }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </div>

          <Box sx={{ flex: 1, overflowY: 'auto', px: 0.5 }}>
            <p className='px-3 text-[11px] font-black text-[#94A3B8] uppercase tracking-[2.5px] mb-4'>Categories</p>
            <List disablePadding>
              {level1Categories.map((item) => (
                <Box key={item._id} sx={{ mb: 1 }}>
                  <ListItem
                    onClick={() => handleLevel1Toggle(item._id)}
                    sx={{
                      borderRadius: '16px',
                      py: 1.5,
                      px: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: expandedLevel1 === item._id ? '#F1F5F9' : 'transparent',
                      '&:hover': { backgroundColor: '#F1F5F9' }
                    }}
                  >
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontWeight: 800,
                        fontSize: '1rem',
                        color: expandedLevel1 === item._id ? '#0F52FF' : '#1E293B'
                      }}
                    />
                    <ListItemIcon sx={{ minWidth: 'auto', color: '#94A3B8' }}>
                      {expandedLevel1 === item._id ? <ExpandLess /> : <ExpandMore />}
                    </ListItemIcon>
                  </ListItem>

                  <Collapse in={expandedLevel1 === item._id} timeout="auto" unmountOnExit>
                    <List disablePadding sx={{ pl: 2, mt: 1 }}>
                      {getCategoriesByParentId(item._id).map((lvl2) => (
                        <Box key={lvl2._id} sx={{ mb: 2 }}>
                          <p className='px-3 py-1 text-[11px] font-black text-[#0F52FF] uppercase tracking-wider'>{lvl2.name}</p>
                          <List disablePadding>
                            {getCategoriesByParentId(lvl2._id).map((lvl3) => (
                              <ListItem
                                key={lvl3._id}
                                onClick={() => {
                                  navigate(`/products/${lvl3.categoryId}`);
                                  setMobileMenuOpen(false);
                                }}
                                sx={{
                                  borderRadius: '12px',
                                  py: 1,
                                  pl: 3,
                                  '&:hover': { backgroundColor: '#F8FAFC', cursor: 'pointer' }
                                }}
                              >
                                <ListItemText
                                  primary={lvl3.name}
                                  primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    color: '#475569'
                                  }}
                                />
                                <ChevronRight sx={{ fontSize: 16, color: '#CBD5E1' }} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ))}
            </List>
          </Box>

          <div className='mt-auto pt-6 border-t border-gray-100'>
            {!user ? (
              <div className='space-y-3 px-1'>
                <Button
                  fullWidth
                  variant='outlined'
                  onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
                  sx={{ borderRadius: '14px', py: 1.5, textTransform: 'none', fontWeight: 700, borderColor: '#E2E8F0', color: '#475569' }}
                >
                  Sign In
                </Button>
                <Button
                  fullWidth
                  variant='contained'
                  onClick={() => { navigate("/become-seller"); setMobileMenuOpen(false); }}
                  sx={{
                    borderRadius: '14px',
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    bgcolor: '#0F52FF',
                    boxShadow: '0 4px 14px rgba(15, 82, 255, 0.25)'
                  }}
                >
                  Become a Seller
                </Button>
              </div>
            ) : (
              <div
                onClick={() => { navigate("/account"); setMobileMenuOpen(false); }}
                className='flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl cursor-pointer hover:bg-[#F1F5F9] transition-colors'
              >
                <Avatar
                  src={user?.avatar}
                  sx={{ height: 44, width: 44, border: '2px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                />
                <div className='overflow-hidden'>
                  <p className='text-sm font-bold text-gray-900 truncate'>{user?.fullName}</p>
                  <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{user?.role === 'ROLE_CUSTOMER' ? 'Customer' : 'User'}</p>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Drawer>

      {/* Category Sheet Overlay */}
      {showSheet && (
        <div
          onMouseEnter={() => setShowSheet(true)}
          onMouseLeave={() => setShowSheet(false)}
          className='absolute top-20 left-0 right-0 bg-white shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] border-b border-gray-100 animate-in fade-in slide-in-from-top-1 duration-300'
        >
          <div className='max-w-[1600px] mx-auto'>
            <CategorySheet categories={categories} selectedCategory={selectedCategory} />
          </div>
        </div>
      )}
    </Box>
  );
};

export default Navbar;
