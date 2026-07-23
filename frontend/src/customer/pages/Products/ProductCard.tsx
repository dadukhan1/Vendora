/** @format */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Favorite, FavoriteBorder, ShoppingBag } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import {
  toggleWishlist,
  toggleWishlistOptimistic,
} from "../../../Redux Toolkit/features/customer/wishlistSlice";

const ProductCard = ({ item }: any) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const { jwt } = useAppSelector((state) => state.auth);

  const isWishlisted = wishlist?.products?.some((p: any) => p._id === item._id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!jwt) {
      navigate("/signin");
      return;
    }
    if (!item?._id) return;
    dispatch(toggleWishlistOptimistic(item));
    dispatch(toggleWishlist(item._id));
  };

  useEffect(() => {
    let interval: any;
    if (isHovered && item.images.length > 1) {
      interval = setInterval(
        () => setCurrentImage((prev) => (prev + 1) % item.images.length),
        800,
      );
    }
    return () => clearInterval(interval);
  }, [isHovered, item.images.length]);

  const discountPercent = item.discount > 0 ? item.discount : null;
  const hasDiscount = item.mrpPrice > item.sellingPrice;

  return (
    <div
      className="group cursor-pointer"
      onClick={() =>
        navigate(`/product-details/${item.category}/${item.title}/${item._id}`)
      }
    >
      {/* ── Image Container ── */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImage(0);
        }}
        className="relative w-full h-[280px] lg:h-[380px] overflow-hidden rounded-2xl lg:rounded-3xl bg-[#f5f3ef]"
      >
        {/* Images */}
        {item.images.map((image: string, index: number) => (
          <img
            src={image}
            alt={`product-${index}`}
            key={index}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            style={{ opacity: index === currentImage ? 1 : 0 }}
          />
        ))}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/10 transition-all duration-500" />

        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-3 left-3 z-10">
            <span className="badge-pill badge-rose">-{discountPercent}%</span>
          </div>
        )}

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <IconButton
            onClick={handleToggleWishlist}
            sx={{
              bgcolor: "white",
              width: 36,
              height: 36,
              "&:hover": { bgcolor: "#fff5f7", transform: "scale(1.1)" },
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              transition: "all 0.2s",
            }}
            size="small"
          >
            {isWishlisted ? (
              <Favorite sx={{ fontSize: 16, color: "#e03c54" }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: 16, color: "#1a1a1a" }} />
            )}
          </IconButton>
        </div>

        {/* Quick Add Bar */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product-details/${item.category}/${item.title}/${item._id}`);
            }}
            className="w-full py-3 bg-[#0a0a0a] hover:bg-[#c9993a] text-white text-[12px] font-[700] font-[Outfit] tracking-[0.06em] uppercase transition-colors duration-250 flex items-center justify-center gap-2"
          >
            <ShoppingBag sx={{ fontSize: 15 }} />
            Quick View
          </button>
        </div>

        {/* Image Dots */}
        {item.images.length > 1 && (
          <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {item.images.map((_: any, index: number) => (
              <span
                key={index}
                className={`h-1 rounded-full transition-all duration-400 ${
                  index === currentImage
                    ? "w-5 bg-white"
                    : "w-1 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Details ── */}
      <div className="pt-4 pb-1 px-0.5 space-y-1.5">
        {/* Category */}
        <p className="label-overline text-[#9ca3af]" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>
          {item.category?.name || item.category}
        </p>

        {/* Title */}
        <h3 className="text-[14px] lg:text-[15px] font-[600] font-[Outfit] text-[#1a1a1a] truncate leading-snug group-hover:text-[#c9993a] transition-colors duration-300 tracking-[-0.01em]">
          {item.title}
        </h3>

        {/* Pricing */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <span className="text-[14px] lg:text-[15px] font-[800] font-[Outfit] text-[#0a0a0a]">
            ${item.sellingPrice}
          </span>
          {hasDiscount && (
            <span className="text-[12px] line-through text-[#bdbdbd] font-[400]">
              ${item.mrpPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
