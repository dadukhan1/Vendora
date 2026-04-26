/** @format */

import React, { useEffect, useState } from "react";
import ProductCard from "../../Products/ProductCard";
import { CircularProgress, Box } from "@mui/material";
import { useAppDispatch } from "../../../../Redux Toolkit/store.ts";
import { getAllProducts } from "../../../../Redux Toolkit/features/customer/productSlice.ts";

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  query: any;
  color?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, subtitle, query, color = "#0F52FF" }) => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const result = await dispatch(getAllProducts(query));
      if (getAllProducts.fulfilled.match(result)) {
        setProducts(result.payload.content || []);
      }
      setLoading(false);
    };
    fetch();
  }, [dispatch, JSON.stringify(query)]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress size={30} sx={{ color }} />
    </Box>
  );

  if (products.length === 0) return null;

  return (
    <div className='px-5 lg:px-20'>
      <div className='flex items-end justify-between mb-8'>
        <div>
          <p className={`text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] mb-1 lg:mb-2`} style={{ color }}>
            {subtitle}
          </p>
          <h2 className='text-2xl lg:text-4xl font-black text-[#0F172A] tracking-tighter'>
            {title}
          </h2>
        </div>
      </div>

      <div className='flex lg:grid lg:grid-cols-4 gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 no-scrollbar snap-x'>
        {products.slice(0, 12).map((product) => (
          <div key={product._id} className='min-w-[280px] lg:min-w-0 snap-start'>
            <ProductCard item={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
