/** @format */

import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { fetchAllCategories } from "../../../Redux Toolkit/features/category/categorySlice.ts";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { useNavigate } from "react-router";
import CategorySheet from "./CategorySheet";
import {
  AddShoppingCart,
  ExpandLess,
  ExpandMore,
  FavoriteBorder,
  Search,
  Storefront,
} from "@mui/icons-material";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { user } = useAppSelector((store) => store.user);
  const { seller } = useAppSelector((store) => store.seller);
  const { wishlist } = useAppSelector((store) => store.wishlist);
  const { cart } = useAppSelector((store) => store.cart);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const activeRole = user?.role || (seller ? "ROLE_SELLER" : null);
  const canShowCustomerActions = !activeRole || user?.role === "ROLE_CUSTOMER";
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedLevel1, setExpandedLevel1] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const navigate = useNavigate();

  const runSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/products/all?search=${encodeURIComponent(trimmed)}`);
  };

  const getCategoriesByParentId = (parentCategoryId: string | null) => {
    return categories.filter((cat) => {
      if (cat.isActive === false) return false;
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
      ref={navRef}
      sx={{ zIndex: 1100 }}
      className={`sticky top-0 left-0 right-0 transition-all duration-300 ${
        scrolled
          ? "bg-[#fafaf8]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(10,10,10,0.06)]"
          : "bg-[#fafaf8]/80 backdrop-blur-md"
      }`}
    >
      {/* Main bar */}
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 lg:px-10 h-[68px]">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4 lg:gap-10">
          {!isLarge && (
            <IconButton
              size="small"
              onClick={() => setMobileMenuOpen(true)}
              sx={{
                color: "#0a0a0a",
                "&:hover": { bgcolor: "rgba(201,153,58,0.08)" },
              }}
            >
              <MenuIcon sx={{ fontSize: 22 }} />
            </IconButton>
          )}

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 bg-[#0a0a0a] rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#c9993a] transition-colors duration-300">
              <span className="text-white font-bold text-sm tracking-tight font-[Outfit]">V</span>
            </div>
            <span className="text-[17px] font-[800] text-[#0a0a0a] hidden sm:block tracking-[-0.03em] font-[Outfit]">
              Vendora
            </span>
          </div>

          {/* Desktop Nav Links */}
          {isLarge && (
            <nav className="flex items-center h-[68px]">
              {level1Categories.slice(0, 5).map((item) => (
                <div
                  key={item._id}
                  onMouseEnter={() => {
                    setShowSheet(true);
                    setSelectedCategory(item._id);
                  }}
                  onMouseLeave={() => setShowSheet(false)}
                  className="relative h-full flex items-center px-4 cursor-pointer group"
                >
                  <span className="text-[13px] font-[600] text-[#3d3d3d] group-hover:text-[#0a0a0a] transition-colors tracking-[-0.01em] font-[Outfit]">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#c9993a] scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left rounded-full" />
                </div>
              ))}
            </nav>
          )}
        </div>

        {/* Right: Search + Icons + Auth */}
        <div className="flex items-center gap-1.5">
          {/* Desktop Search */}
          {isLarge ? (
            <div
              className={`flex items-center gap-2 bg-[#f5f3ef] border rounded-xl px-3 py-2 transition-all duration-300 ${
                searchQuery
                  ? "w-64 border-[#c9993a]"
                  : "w-52 border-transparent hover:border-[#e8e4de]"
              }`}
            >
              <Search sx={{ fontSize: 16, color: "#9ca3af" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                placeholder="Search..."
                className="bg-transparent outline-none text-[13px] text-[#0a0a0a] placeholder-[#9ca3af] w-full font-medium"
              />
            </div>
          ) : (
            <div className="relative">
              <IconButton
                size="small"
                onClick={() => setSearchOpen((v) => !v)}
                sx={{
                  color: searchOpen ? "#c9993a" : "#3d3d3d",
                  "&:hover": { bgcolor: "rgba(201,153,58,0.08)" },
                }}
              >
                <Search sx={{ fontSize: 21 }} />
              </IconButton>
              {searchOpen && (
                <div className="absolute top-11 right-0 w-72 bg-white border border-[#e8e4de] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-3 z-50 animate-scale-in">
                  <div className="flex items-center gap-2 bg-[#f5f3ef] rounded-xl px-3 py-2">
                    <Search sx={{ fontSize: 16, color: "#9ca3af" }} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && runSearch()}
                      placeholder="Search products..."
                      className="bg-transparent outline-none text-[13px] text-[#0a0a0a] w-full font-medium"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Wishlist + Cart */}
          {canShowCustomerActions && (
            <>
              <IconButton
                size="small"
                onClick={() => navigate("/wishlist")}
                sx={{
                  color: "#3d3d3d",
                  "&:hover": { bgcolor: "rgba(224,60,84,0.07)", color: "#e03c54" },
                  transition: "all 0.2s",
                }}
              >
                <Badge
                  badgeContent={wishlist?.products?.length || 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "#e03c54",
                      color: "white",
                      fontSize: 9,
                      height: 15,
                      minWidth: 15,
                      fontWeight: 700,
                    },
                  }}
                >
                  <FavoriteBorder sx={{ fontSize: 21 }} />
                </Badge>
              </IconButton>

              <IconButton
                size="small"
                onClick={() => navigate("/cart")}
                sx={{
                  color: "#3d3d3d",
                  "&:hover": { bgcolor: "rgba(201,153,58,0.08)", color: "#c9993a" },
                  transition: "all 0.2s",
                }}
              >
                <Badge
                  badgeContent={cart?.cartItems?.length || 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "#c9993a",
                      color: "white",
                      fontSize: 9,
                      height: 15,
                      minWidth: 15,
                      fontWeight: 700,
                    },
                  }}
                >
                  <AddShoppingCart sx={{ fontSize: 21 }} />
                </Badge>
              </IconButton>
            </>
          )}

          <div className="w-px h-5 bg-[#e8e4de] mx-1 hidden sm:block" />

          {/* Auth Area */}
          {activeRole ? (
            user?.role === "ROLE_CUSTOMER" ? (
              <button
                onClick={() => navigate("/account")}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[#f5f3ef] transition-colors"
              >
                <Avatar
                  src={user?.avatar}
                  sx={{
                    width: 30,
                    height: 30,
                    border: "2px solid #e8e4de",
                    fontSize: "0.75rem",
                    bgcolor: "#c9993a",
                    fontWeight: 700,
                  }}
                >
                  {user?.fullName?.charAt(0)}
                </Avatar>
                <span className="text-[13px] font-[600] text-[#0a0a0a] hidden lg:block font-[Outfit]">
                  {user?.fullName?.split(" ")[0]}
                </span>
              </button>
            ) : (
              <Button
                onClick={() => navigate(user?.role === "ROLE_ADMIN" ? "/admin" : "/seller")}
                variant="contained"
                startIcon={<Storefront sx={{ fontSize: 16 }} />}
                sx={{
                  borderRadius: "10px",
                  bgcolor: "#0a0a0a",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  px: 2.5,
                  py: 1,
                  fontFamily: "Outfit",
                  letterSpacing: "0.01em",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#c9993a" },
                  transition: "all 0.25s",
                }}
              >
                Dashboard
              </Button>
            )
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate("/signin")}
                variant="outlined"
                sx={{
                  borderRadius: "10px",
                  borderColor: "#e8e4de",
                  color: "#3d3d3d",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  px: 2.5,
                  py: 1,
                  fontFamily: "Outfit",
                  textTransform: "none",
                  "&:hover": { borderColor: "#c9993a", color: "#c9993a", bgcolor: "rgba(201,153,58,0.04)" },
                  transition: "all 0.2s",
                }}
              >
                Sign in
              </Button>
              <Button
                onClick={() => navigate("/become-seller")}
                variant="contained"
                sx={{
                  display: { xs: "none", md: "flex" },
                  borderRadius: "10px",
                  bgcolor: "#c9993a",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  px: 2.5,
                  py: 1,
                  fontFamily: "Outfit",
                  textTransform: "none",
                  boxShadow: "0 4px 14px rgba(201,153,58,0.25)",
                  "&:hover": { bgcolor: "#a67c2e", boxShadow: "0 6px 20px rgba(201,153,58,0.35)" },
                  transition: "all 0.25s",
                }}
              >
                Sell on Vendora
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            borderRadius: "0 24px 24px 0",
            bgcolor: "#fafaf8",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0ece6]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#0a0a0a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">V</span>
              </div>
              <span className="text-[16px] font-[800] text-[#0a0a0a] font-[Outfit] tracking-[-0.02em]">
                Vendora
              </span>
            </div>
            <IconButton
              size="small"
              onClick={() => setMobileMenuOpen(false)}
              sx={{ bgcolor: "#f0ece6", "&:hover": { bgcolor: "#e8e4de" } }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </div>

          <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 3 }}>
            <p className="label-overline text-[#9ca3af] mb-3 px-2">Categories</p>
            <List disablePadding>
              {level1Categories.map((item) => (
                <Box key={item._id} sx={{ mb: 0.5 }}>
                  <ListItem
                    onClick={() =>
                      setExpandedLevel1(expandedLevel1 === item._id ? null : item._id)
                    }
                    sx={{
                      borderRadius: "12px",
                      py: 1.5,
                      cursor: "pointer",
                      bgcolor: expandedLevel1 === item._id ? "rgba(201,153,58,0.08)" : "transparent",
                      "&:hover": { bgcolor: "#f5f3ef" },
                      transition: "all 0.15s",
                    }}
                  >
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        fontFamily: "Outfit",
                        color: expandedLevel1 === item._id ? "#a67c2e" : "#1a1a1a",
                      }}
                    />
                    <ListItemIcon sx={{ minWidth: "auto", color: "#9ca3af" }}>
                      {expandedLevel1 === item._id ? <ExpandLess /> : <ExpandMore />}
                    </ListItemIcon>
                  </ListItem>
                  <Collapse in={expandedLevel1 === item._id} timeout="auto" unmountOnExit>
                    <List disablePadding sx={{ pl: 1.5, mt: 0.5 }}>
                      {getCategoriesByParentId(item._id).map((lvl2) => (
                        <Box key={lvl2._id} sx={{ mb: 1.5 }}>
                          <p className="px-3 py-1 text-[10px] font-[800] text-[#c9993a] uppercase tracking-widest font-[Outfit]">
                            {lvl2.name}
                          </p>
                          {getCategoriesByParentId(lvl2._id).map((lvl3) => (
                            <ListItem
                              key={lvl3._id}
                              onClick={() => {
                                navigate(`/products/${lvl3.categoryId}`);
                                setMobileMenuOpen(false);
                              }}
                              sx={{
                                borderRadius: "10px",
                                py: 1,
                                pl: 2,
                                cursor: "pointer",
                                "&:hover": { bgcolor: "#f5f3ef" },
                              }}
                            >
                              <ListItemText
                                primary={lvl3.name}
                                primaryTypographyProps={{
                                  fontSize: "0.85rem",
                                  color: "#5d5d5d",
                                  fontFamily: "Outfit",
                                }}
                              />
                            </ListItem>
                          ))}
                        </Box>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ))}
            </List>
          </Box>

          <div className="px-4 pb-6 border-t border-[#f0ece6] pt-4">
            {!user ? (
              <div className="space-y-2">
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => { navigate("/signin"); setMobileMenuOpen(false); }}
                  sx={{
                    borderRadius: "12px",
                    borderColor: "#e8e4de",
                    color: "#1a1a1a",
                    fontWeight: 700,
                    py: 1.5,
                    fontFamily: "Outfit",
                    textTransform: "none",
                    "&:hover": { borderColor: "#c9993a", color: "#c9993a" },
                  }}
                >
                  Sign In
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => { navigate("/become-seller"); setMobileMenuOpen(false); }}
                  sx={{
                    borderRadius: "12px",
                    bgcolor: "#c9993a",
                    fontWeight: 700,
                    py: 1.5,
                    fontFamily: "Outfit",
                    textTransform: "none",
                    boxShadow: "0 4px 14px rgba(201,153,58,0.25)",
                    "&:hover": { bgcolor: "#a67c2e" },
                  }}
                >
                  Sell on Vendora
                </Button>
              </div>
            ) : (
              <div
                onClick={() => { navigate("/account"); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#f5f3ef] cursor-pointer hover:bg-[#ede9e2] transition-colors"
              >
                <Avatar
                  src={user?.avatar}
                  sx={{ width: 40, height: 40, bgcolor: "#c9993a", fontWeight: 700 }}
                >
                  {user?.fullName?.charAt(0)}
                </Avatar>
                <div>
                  <p className="text-[14px] font-[700] text-[#0a0a0a] font-[Outfit]">
                    {user?.fullName}
                  </p>
                  <p className="text-[11px] text-[#9ca3af]">View account →</p>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Drawer>

      {/* Desktop Category Sheet */}
      {showSheet && isLarge && (
        <div
          onMouseEnter={() => setShowSheet(true)}
          onMouseLeave={() => setShowSheet(false)}
          className="absolute top-[68px] left-0 right-0 bg-white/95 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] border-b border-[#f0ece6] animate-fade-in"
        >
          <div className="max-w-[1440px] mx-auto">
            <CategorySheet categories={categories} selectedCategory={selectedCategory} />
          </div>
        </div>
      )}
    </Box>
  );
};

export default Navbar;
