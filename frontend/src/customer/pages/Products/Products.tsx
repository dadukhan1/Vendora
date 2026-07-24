/** @format */

import { useEffect, useRef, useState } from "react";
import FilterSection from "./FilterSection";
import {
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useLocation, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { getAllProducts } from "../../../Redux Toolkit/features/customer/productSlice";
import { price as priceFilters } from "../../../data/filters/prices.ts";

const Products = () => {
  const { products, totalPages, totalElements, loading } = useAppSelector(
    (store) => store.products
  );
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [isCategorySwitching, setIsCategorySwitching] = useState(false);
  const [sort, setSort] = useState("price_low");
  const [pageNumber, setPageNumber] = useState(1);
  const { categoryId } = useParams();
  const { categories } = useAppSelector((state) => state.category);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const topRef = useRef<HTMLDivElement | null>(null);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const searchTerm =
    new URLSearchParams(location.search).get("search")?.trim() ?? "";
  const isSearchView = searchTerm.length > 0;
  const isAllProductsView = categoryId === "all";

  const selectedPriceObj = priceFilters.find((p) => p.value === selectedPrice);
  const priceLabel = selectedPriceObj?.name ?? "";
  const discountLabel = selectedDiscount ? `${selectedDiscount}%+` : "";
  const hasAnyFilter =
    !!selectedColor || !!selectedPrice || !!selectedDiscount;

  // Clear old products immediately when category changes.
  useEffect(() => {
    setIsCategorySwitching(true);
    setDisplayedProducts([]);
  }, [categoryId, searchTerm]);

  // Update displayed products from paginated redux source.
  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  // Stop showing the switching/loading UI once redux finishes the request.
  useEffect(() => {
    if (isCategorySwitching && !loading) {
      setIsCategorySwitching(false);
    }
  }, [isCategorySwitching, loading]);

  const handleSort = (e: any) => {
    setSort(e.target.value);
    setPageNumber(1);
  };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
    setPageNumber(1);
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
    setPageNumber(1);
  };

  const handleDiscountChange = (value: string) => {
    setSelectedDiscount(value);
    setPageNumber(1);
  };

  useEffect(() => {
    if (categoryId) {
      const selectedPriceObj = priceFilters.find(
        (p) => p.value === selectedPrice,
      );

      const minPrice = selectedPriceObj ? selectedPriceObj.min : undefined;
      const maxPrice = selectedPriceObj
        ? selectedPriceObj.max ?? 100000000
        : undefined;

      dispatch(
        getAllProducts({
          ...(isAllProductsView ? {} : { category: categoryId }),
          ...(isSearchView ? { search: searchTerm } : {}),
          sort,
          pageNumber,
          ...(selectedColor ? { color: selectedColor } : {}),
          ...(selectedPrice ? { minPrice, maxPrice } : {}),
          ...(selectedDiscount
            ? { minDiscount: Number(selectedDiscount) }
            : {}),
        })
      );
    }
  }, [
    categoryId,
    searchTerm,
    isSearchView,
    isAllProductsView,
    sort,
    pageNumber,
    selectedColor,
    selectedPrice,
    selectedDiscount,
    dispatch,
  ]);

  // If the category or search term changes, reset back to the first page.
  useEffect(() => {
    setPageNumber(1);
  }, [categoryId, searchTerm]);

  // When pagination changes, bring the user back to the top.
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pageNumber, categoryId]);

  return (
    <div className="pb-20 font-['Outfit'] bg-white">
      {/* Header & Sub-Navigation */}
      <div className='max-w-[1600px] mx-auto px-5 lg:px-10 xl:px-14 pt-6 pb-4'>
        {(() => {
          const currentCat = categories.find((c) => c.categoryId === categoryId);
          
          let level1Parent: any = null;

          if (currentCat) {
            if (currentCat.level === 1) {
              level1Parent = currentCat;
            } else if (currentCat.level === 2) {
              const pId = typeof currentCat.parentCategory === 'object' ? (currentCat.parentCategory as any)?._id : currentCat.parentCategory;
              level1Parent = categories.find((c: any) => c._id === pId);
            } else if (currentCat.level === 3) {
              const l2Id = typeof currentCat.parentCategory === 'object' ? (currentCat.parentCategory as any)?._id : currentCat.parentCategory;
              const level2Context = categories.find((c: any) => c._id === l2Id);
              const l1Id = typeof level2Context?.parentCategory === 'object' ? (level2Context.parentCategory as any)?._id : level2Context?.parentCategory;
              level1Parent = categories.find((c: any) => c._id === l1Id);
            }
          }

          const pageTitle = isSearchView 
            ? `Search: ${searchTerm}`
            : isAllProductsView 
              ? "All Collections"
              : currentCat?.name || categoryId;

          return (
            <div className='space-y-4'>
              {/* Premium Title Area */}
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-2.5'>
                  <span className='inline-block w-8 h-[3px] bg-[#c9993a] rounded-full' />
                  <p className='text-[10px] font-[800] tracking-[0.2em] text-[#c9993a] uppercase'>
                    {level1Parent ? `${level1Parent.name} Collection` : "Collection"}
                  </p>
                </div>
                <h1 className='text-[24px] md:text-[28px] lg:text-[32px] font-[900] text-[#0a0a0a] uppercase tracking-tight leading-none'>
                  {pageTitle}
                </h1>
              </div>
            </div>
          );
        })()}
      </div>

      <div className='lg:flex max-w-[1600px] mx-auto'>
          {/* Filter Sidebar */}
        <section className='hidden lg:block w-[22%] min-h-screen border-r border-[#f0ece6] px-6 pt-4 sticky top-20 self-start'>
            <FilterSection
              selectedColor={selectedColor}
              selectedPrice={selectedPrice}
              selectedDiscount={selectedDiscount}
              onColorChange={handleColorChange}
              onPriceChange={handlePriceChange}
              onDiscountChange={handleDiscountChange}
              onClearAll={() => {
                setSelectedColor("");
                setSelectedPrice("");
                setSelectedDiscount("");
                setPageNumber(1);
              }}
            />
          </section>

          {/* Products Section */}
        <section className='lg:w-[78%] space-y-8 pt-4'>
            {/* Sort Bar */}
          <div className='flex justify-between items-center px-8 pb-4 border-b border-[#f0ece6] mx-2'>
            <p className='text-[14px] text-[#5d5d5d] font-[600]'>
              Showing <span className='font-[800] text-[#0a0a0a]'>
                {displayedProducts.length}
              </span>{" "}
              products
            </p>
            <FormControl size='small' sx={{ minWidth: 180 }}>
              <InputLabel id='sort-label' sx={{ fontSize: '0.85rem', color: '#9ca3af', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>Sort By</InputLabel>
                  <Select
                    labelId='sort-label'
                    value={sort}
                    label='Sort By'
                    onChange={handleSort}
                    sx={{ 
                      borderRadius: "12px", 
                      fontSize: "0.85rem", 
                      fontWeight: 700,
                      color: "#0a0a0a",
                      fontFamily: "Outfit, sans-serif",
                      '& fieldset': { borderColor: '#e5e7eb' },
                      '&:hover fieldset': { borderColor: '#c9993a !important' },
                      '&.Mui-focused fieldset': { borderColor: '#c9993a !important', borderWidth: "2px" },
                    }}
                  >
                    <MenuItem value='price_low' sx={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", fontWeight: 600 }}>Price: Low to High</MenuItem>
                    <MenuItem value='price_high' sx={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", fontWeight: 600 }}>Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </div>

            {/* Active Filters */}
            {hasAnyFilter && (
            <div className='flex flex-wrap gap-3 px-10'>
                {selectedColor && (
                  <Chip
                    label={`Color: ${selectedColor}`}
                    onDelete={() => handleColorChange("")}
                    sx={{ borderRadius: "12px", fontWeight: 700, fontFamily: "Outfit, sans-serif", bgcolor: "rgba(201,153,58,0.1)", color: "#c9993a", border: "1px solid rgba(201,153,58,0.2)" }}
                  />
                )}
                {selectedPrice && (
                  <Chip
                    label={`Price: ${priceLabel}`}
                    onDelete={() => handlePriceChange("")}
                    sx={{ borderRadius: "12px", fontWeight: 700, fontFamily: "Outfit, sans-serif", bgcolor: "rgba(201,153,58,0.1)", color: "#c9993a", border: "1px solid rgba(201,153,58,0.2)" }}
                  />
                )}
                {selectedDiscount && (
                  <Chip
                    label={`Discount: ${discountLabel}`}
                    onDelete={() => handleDiscountChange("")}
                    sx={{ borderRadius: "12px", fontWeight: 700, fontFamily: "Outfit, sans-serif", bgcolor: "rgba(201,153,58,0.1)", color: "#c9993a", border: "1px solid rgba(201,153,58,0.2)" }}
                  />
                )}
                <Chip
                label='Clear filters'
                onDelete={() => {
                    setSelectedColor("");
                    setSelectedPrice("");
                    setSelectedDiscount("");
                    setPageNumber(1);
                  }}
                  sx={{
                    borderRadius: "12px",
                    fontWeight: 800,
                    fontFamily: "Outfit, sans-serif",
                    bgcolor: "#fff",
                    color: "#f43f5e",
                    border: "1px solid rgba(244,63,94,0.3)",
                  }}
                />
              </div>
            )}

            {/* Product Grid */}
          <div className='relative grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 px-10 mt-6'>
            {displayedProducts.length > 0 && (
              <>
                  {displayedProducts.map((item, index) => (
                    <ProductCard key={index} item={item} />
                  ))}
                {loading && (
                  <div className='absolute inset-0 z-10 bg-[#fafaf8]/80 backdrop-blur-sm flex items-center justify-center rounded-2xl pointer-events-none'>
                    <div className='flex items-center gap-4 text-[#0a0a0a] bg-white px-6 py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-[#f0ece6]'>
                      <CircularProgress size={24} sx={{ color: "#c9993a" }} />
                      <span className='text-[14px] font-[800] tracking-wide uppercase text-[#0a0a0a]'>
                        Loading...
                      </span>
                    </div>
                  </div>
                )}
              </>
              )}

            {displayedProducts.length === 0 && (loading || isCategorySwitching) && (
              <div className='col-span-full flex flex-col items-center justify-center py-32 text-[#9ca3af]'>
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height={320}
                  sx={{ borderRadius: "24px", bgcolor: "#fafaf8" }}
                />
                <div className='flex items-center gap-4 mt-8'>
                  <CircularProgress size={24} sx={{ color: "#c9993a" }} />
                  <p className='text-[14px] font-[800] tracking-wide uppercase text-[#0a0a0a]'>Preparing Collection...</p>
                </div>
                  </div>
            )}

            {displayedProducts.length === 0 && !loading && !isCategorySwitching && (
              <div className='col-span-full flex flex-col items-center justify-center py-32'>
                <div className="w-20 h-20 mb-6 rounded-full bg-[#fafaf8] border border-[#f0ece6] flex items-center justify-center">
                  <span className="text-[32px]">🔍</span>
                </div>
                <p className='text-[20px] font-[800] text-[#0a0a0a] uppercase tracking-wider mb-2'>No products found</p>
                <p className='text-[14px] text-[#9ca3af] font-[500]'>Try adjusting your filters or searching for something else.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
          <div className='flex justify-center pt-16 pb-8'>
            {!isCategorySwitching &&
              !loading &&
              totalElements > 0 && (
                <Pagination
                  count={Math.max(totalPages, 1)}
                  page={pageNumber}
                  onChange={(_, value) => setPageNumber(value)}
                  disabled={loading}
                  shape='rounded'
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: "12px",
                      fontWeight: 700,
                      fontFamily: "Outfit, sans-serif",
                      color: "#5d5d5d",
                      border: "1px solid transparent",
                    },
                    "& .MuiPaginationItem-root:hover": {
                      backgroundColor: "#fafaf8",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#0a0a0a !important",
                      color: "#fff",
                      boxShadow: "0 4px 12px rgba(10,10,10,0.15)",
                    },
                  }}
                />
            )}
        </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
