/** @format */

import React, { useEffect, useState } from "react";
import ProductCard from "../../Products/ProductCard";
import { Box, Skeleton } from "@mui/material";
import { useAppDispatch } from "../../../../Redux Toolkit/store.ts";
import { getAllProducts } from "../../../../Redux Toolkit/features/customer/productSlice.ts";
import { useNavigate } from "react-router";
import { ArrowForward } from "@mui/icons-material";

interface ProductCarouselProps {
  title: string;
  subtitle: string;
  query: any;
  color?: string;
  viewAllPath?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  query,
  color = "#c9993a",
  viewAllPath,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  if (loading)
    return (
      <div className="px-4 lg:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Skeleton width={80} height={14} sx={{ bgcolor: "#f0ece6", mb: 1 }} />
            <Skeleton width={200} height={36} sx={{ bgcolor: "#f0ece6" }} />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Skeleton variant="rectangular" height={320} sx={{ borderRadius: "20px", bgcolor: "#f0ece6", mb: 1.5 }} />
              <Skeleton width="60%" height={14} sx={{ bgcolor: "#f0ece6" }} />
              <Skeleton width="40%" height={20} sx={{ bgcolor: "#f0ece6", mt: 0.5 }} />
            </div>
          ))}
        </div>
      </div>
    );

  if (products.length === 0) return null;

  return (
    <div className="px-4 lg:px-6">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8 lg:mb-10">
        <div>
          <p className="label-overline mb-2 lg:mb-3" style={{ color }}>
            {subtitle}
          </p>
          <h2 className="section-title text-[26px] lg:text-[40px] font-bold">{title}</h2>
        </div>
        {viewAllPath && (
          <button
            onClick={() => navigate(viewAllPath)}
            className="flex items-center gap-1.5 text-[13px] font-[600] font-[Outfit] text-[#5d5d5d] hover:text-[#0a0a0a] transition-colors group"
          >
            View all
            <ArrowForward
              sx={{ fontSize: 15 }}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        )}
      </div>

      {/* Product Grid — scroll on mobile */}
      <div className="flex lg:grid lg:grid-cols-4 gap-5 lg:gap-7 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 no-scrollbar snap-x snap-mandatory">
        {products.slice(0, 12).map((product, i) => (
          <div
            key={product._id}
            className="min-w-[220px] sm:min-w-[260px] lg:min-w-0 snap-start"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <ProductCard item={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
