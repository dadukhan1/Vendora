/** @format */

import { useEffect, useRef, useState } from "react";
import FilterSection from "./FilterSection";
import {
  CircularProgress,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate, useParams } from "react-router";
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
  const navigate = useNavigate();
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
    <div className='pb-20' ref={topRef}>
      {/* Header */}
      <div className='text-center py-12 px-9 bg-gray-50'>
        <p className='text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase mb-2'>
          Collection
        </p>
        <h1 className='text-5xl font-black text-gray-900 uppercase tracking-tighter'>
          {isSearchView
            ? `Search: ${searchTerm}`
            : isAllProductsView
              ? "All Collections"
              : categories.find((c) => c.categoryId === categoryId)?.name ||
                categoryId}
        </h1>
        <div className='mt-4 mx-auto w-12 h-1 bg-[#0F52FF] rounded-full' />
      </div>

      {/* Hierarchical Sub-Navigation (Level 2 & Level 3) */}
      <div className='bg-white shadow-sm border-b border-gray-100 mb-12'>
        <div className='max-w-[1600px] mx-auto px-5 lg:px-20 py-8 space-y-8'>
          {(() => {
            const currentCat = categories.find((c) => c.categoryId === categoryId);
            if (!currentCat && !isAllProductsView) return null;

            // 1. Identify context
            let level1Parent: any = null;
            let level2Context: any = null;

            if (currentCat) {
              if (currentCat.level === 1) {
                level1Parent = currentCat;
              } else if (currentCat.level === 2) {
                const pId = typeof currentCat.parentCategory === 'object' ? (currentCat.parentCategory as any)?._id : currentCat.parentCategory;
                level1Parent = categories.find(c => c._id === pId);
                level2Context = currentCat;
              } else if (currentCat.level === 3) {
                const l2Id = typeof currentCat.parentCategory === 'object' ? (currentCat.parentCategory as any)?._id : currentCat.parentCategory;
                level2Context = categories.find(c => c._id === l2Id);
                const l1Id = typeof level2Context?.parentCategory === 'object' ? (level2Context.parentCategory as any)?._id : level2Context?.parentCategory;
                level1Parent = categories.find(c => c._id === l1Id);
              }
            }

            if (!level1Parent) return null;

            // 2. Get Level 2 categories for this Level 1
            const level2Cats = categories.filter(c => {
              if (c.isActive === false) return false;
              const pId = typeof c.parentCategory === 'object' ? (c.parentCategory as any)?._id : c.parentCategory;
              return pId === level1Parent._id && c.level === 2;
            });

            // 3. Get Level 3 categories if we have a Level 2 context
            const level3Cats = level2Context ? categories.filter(c => {
              if (c.isActive === false) return false;
              const pId = typeof c.parentCategory === 'object' ? (c.parentCategory as any)?._id : c.parentCategory;
              return pId === level2Context._id && c.level === 3;
            }) : [];

            return (
              <div className='space-y-8'>
                {/* Row 1: Level 2 Categories */}
                <section>
                   <div className='flex items-center gap-3 mb-5'>
                      <div className='w-1 h-3 bg-[#0F52FF] rounded-full' />
                      <h2 className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>{level1Parent.name} Categories</h2>
                   </div>
                   <div className='flex items-center gap-3 overflow-x-auto no-scrollbar'>
                      <button
                        onClick={() => navigate(`/products/${level1Parent.categoryId}`)}
                        className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border shrink-0 
                          ${categoryId === level1Parent.categoryId 
                            ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-lg' 
                            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
                      >
                        All {level1Parent.name}
                      </button>

                      {level2Cats.map((cat) => {
                        const isActive = categoryId === cat.categoryId || level2Context?.categoryId === cat.categoryId;
                        return (
                          <button
                            key={cat._id}
                            onClick={() => navigate(`/products/${cat.categoryId}`)}
                            className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border shrink-0 
                              ${isActive 
                                ? 'bg-[#0F52FF] border-[#0F52FF] text-white shadow-lg shadow-[#0F52FF]/20' 
                                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
                          >
                            {cat.name}
                          </button>
                        );
                      })}
                   </div>
                </section>

                {/* Row 2: Level 3 Subcategories (Only if Level 2 is active) */}
                {level3Cats.length > 0 && (
                  <section className='pt-6 border-t border-gray-50 animate-in fade-in slide-in-from-top-2 duration-500'>
                     <div className='flex items-center gap-3 mb-5'>
                        <div className='w-1 h-3 bg-gray-300 rounded-full' />
                        <h2 className='text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]'>Refine {level2Context.name}</h2>
                     </div>
                     <div className='flex items-center gap-2 overflow-x-auto no-scrollbar pb-2'>
                        {level3Cats.map((sub) => (
                          <button
                            key={sub._id}
                            onClick={() => navigate(`/products/${sub.categoryId}`)}
                            className={`px-5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all border shrink-0 
                              ${categoryId === sub.categoryId 
                                ? 'bg-[#F1F5F9] border-[#0F52FF] text-[#0F52FF]' 
                                : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                          >
                            {sub.name}
                          </button>
                        ))}
                     </div>
                  </section>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      <div className='lg:flex'>
          {/* Filter Sidebar */}
        <section className='hidden lg:block w-[20%] min-h-screen border-r border-gray-100 px-4 pt-4 sticky top-20 self-start'>
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
        <section className='lg:w-[80%] space-y-5'>
            {/* Sort Bar */}
          <div className='flex justify-between items-center px-6 py-3 bg-gray-50 rounded-xl mx-5'>
            <p className='text-sm text-gray-500'>
              <span className='font-semibold text-gray-800'>
                {displayedProducts.length}
              </span>{" "}
              products
            </p>
            <FormControl size='medium' sx={{ minWidth: 200 }}>
              <InputLabel id='sort-label'>Sort By</InputLabel>
                  <Select
                    labelId='sort-label'
                    value={sort}
                label='Sort By'
                    onChange={handleSort}
                sx={{ borderRadius: "10px", fontSize: "0.875rem" }}
                  >
                    <MenuItem value='price_low'>Price: Low to High</MenuItem>
                    <MenuItem value='price_high'>Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </div>

          <Divider />

            {/* Active Filters */}
            {hasAnyFilter && (
            <div className='flex flex-wrap gap-2 px-5'>
                {selectedColor && (
                  <Chip
                    label={`Color: ${selectedColor}`}
                    onDelete={() => handleColorChange("")}
                  sx={{ borderRadius: "999px", fontWeight: 600 }}
                  />
                )}
                {selectedPrice && (
                  <Chip
                    label={`Price: ${priceLabel}`}
                    onDelete={() => handlePriceChange("")}
                  sx={{ borderRadius: "999px", fontWeight: 600 }}
                  />
                )}
                {selectedDiscount && (
                  <Chip
                    label={`Discount: ${discountLabel}`}
                    onDelete={() => handleDiscountChange("")}
                  sx={{ borderRadius: "999px", fontWeight: 600 }}
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
                  borderRadius: "999px",
                  fontWeight: 700,
                    bgcolor: "#fff",
                  border: "1px solid rgba(15,82,255,0.25)",
                  }}
                />
              </div>
            )}

            {/* Product Grid */}
          <div className='relative grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 px-5 mt-5'>
            {displayedProducts.length > 0 && (
              <>
                  {displayedProducts.map((item, index) => (
                    <ProductCard key={index} item={item} />
                  ))}
                {loading && (
                  <div className='absolute inset-0 z-10 bg-white/85 flex items-center justify-center rounded-xl pointer-events-none'>
                    <div className='flex items-center gap-3 text-gray-800'>
                      <CircularProgress size={26} />
                      <span className='text-sm font-medium'>
                        Loading products...
                      </span>
                    </div>
                  </div>
                )}
              </>
              )}

            {displayedProducts.length === 0 && (loading || isCategorySwitching) && (
              <div className='col-span-4 flex flex-col items-center justify-center py-24 text-gray-500'>
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height={280}
                  sx={{ borderRadius: "16px" }}
                />
                <div className='flex items-center gap-3 mt-4'>
                  <CircularProgress size={22} />
                  <p className='text-sm font-medium'>Loading products...</p>
                </div>
                  </div>
            )}

            {displayedProducts.length === 0 && !loading && !isCategorySwitching && (
              <div className='col-span-4 flex flex-col items-center justify-center py-24 text-gray-400'>
                <p className='text-lg font-semibold text-gray-700'>No products found</p>
                <p className='text-sm mt-1'>Try adjusting filters or sorting</p>
                </div>
              )}
            </div>

            {/* Pagination */}
          <div className='flex justify-center py-10'>
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
                      borderRadius: "8px",
                      fontWeight: 500,
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#111 !important",
                      color: "#fff",
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
