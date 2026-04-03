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
import { useParams } from "react-router";
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
  const dispatch = useAppDispatch();
  const topRef = useRef<HTMLDivElement | null>(null);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");

  const selectedPriceObj = priceFilters.find((p) => p.value === selectedPrice);
  const priceLabel = selectedPriceObj?.name ?? "";
  const discountLabel = selectedDiscount ? `${selectedDiscount}%+` : "";
  const hasAnyFilter =
    !!selectedColor || !!selectedPrice || !!selectedDiscount;

  // Clear old products immediately when category changes.
  useEffect(() => {
    setIsCategorySwitching(true);
    setDisplayedProducts([]);
  }, [categoryId]);

  // Only update displayed products when the redux `products` changes.
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
      // backend uses `maxPrice != null` so we send a very large max for "10000+"
      const maxPrice = selectedPriceObj
        ? selectedPriceObj.max ?? 100000000
        : undefined;

      dispatch(
        getAllProducts({
          category: categoryId,
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
    sort,
    pageNumber,
    selectedColor,
    selectedPrice,
    selectedDiscount,
  ]);

  // If the category changes, reset back to the first page.
  useEffect(() => {
    setPageNumber(1);
  }, [categoryId]);

  // When pagination changes, bring the user back to the top.
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pageNumber, categoryId]);

  return (
    <div className='mt-10 mb-10' ref={topRef}>
      {/* Header */}
      <div className='text-center py-6 px-9'>
        <p className='text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase mb-2'>
          Collection
        </p>
        <h1 className='text-4xl font-bold text-gray-900 uppercase tracking-wide'>
          {categoryId || "Woman Sarees"}
        </h1>
        <div className='mt-3 mx-auto w-16 h-0.5 bg-gray-900 rounded-full' />
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
            {!isCategorySwitching && !loading && totalElements > 0 && (
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
