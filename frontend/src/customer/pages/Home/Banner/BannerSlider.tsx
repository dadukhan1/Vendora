/** @format */

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowForward, Storefront } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { Box, Skeleton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/store.ts";
import { fetchBanners } from "../../../../Redux Toolkit/features/banner/bannerSlice.ts";

const BannerSlider = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { banners = [], loading } = useAppSelector((state) => state.banners);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const masterSlide = {
    _id: "master-hero",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    title: "Discover the new era of shopping",
    description: "Curated collections from thousands of trusted sellers — premium quality, delivered to your door.",
    type: "master",
    categoryId: "all",
    productId: undefined,
    isActive: true,
  };

  const allSlides = [masterSlide, ...banners];

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    if (allSlides.length > 1) {
      const timer = setInterval(() => {
        goNext();
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [allSlides.length, current]);

  const goNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === allSlides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 700);
  };

  const goPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? allSlides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 700);
  };

  if (loading)
    return (
      <Box sx={{ px: { xs: 2, lg: 5 }, pt: 3 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={560}
          sx={{ borderRadius: "32px", bgcolor: "#f0ece6" }}
        />
      </Box>
    );

  const handleNavigate = (banner: any) => {
    if (banner.type === "master") return;
    if (banner.productId) {
      navigate(`/product-details/${banner.categoryId || "shop"}/${banner.title.replace(/\s+/g, "-")}/${banner.productId}`);
    } else if (banner.categoryId) {
      navigate(`/products/${banner.categoryId}`);
    }
  };

  return (
    <div className="px-3 lg:px-6 pt-3 lg:pt-4 relative select-none">
      <div className="relative h-[420px] lg:h-[580px] w-full overflow-hidden rounded-[28px] lg:rounded-[40px] bg-[#0a0a0a]">
        {/* Slides */}
        {allSlides.map((banner, index) => (
          <div
            key={banner._id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background */}
            <img
              src={banner.image}
              alt={banner.title}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                index === current ? "scale-110" : "scale-100"
              }`}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-16 pb-0 max-w-3xl">
              {/* Eyebrow */}
              <div
                className={`flex items-center gap-3 mb-5 lg:mb-7 transition-all duration-700 delay-[200ms] ${
                  index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="h-px w-8 bg-[#c9993a]" />
                <span className="label-overline text-[#c9993a]">
                  {banner.type === "master"
                    ? "Welcome to Vendora"
                    : banner.productId
                    ? "Staff Pick"
                    : "Exclusive Drop"}
                </span>
              </div>

              {/* Title */}
              <h1
                className={`font-[Playfair_Display] font-bold text-[32px] lg:text-[58px] text-white leading-[1.08] tracking-[-0.02em] mb-5 lg:mb-7 transition-all duration-700 delay-[350ms] ${
                  index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {banner.title}
              </h1>

              {/* Description */}
              <p
                className={`text-[#d1c9bc] text-[14px] lg:text-[17px] font-light leading-relaxed max-w-lg mb-8 lg:mb-10 transition-all duration-700 delay-[500ms] ${
                  index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {banner.description}
              </p>

              {/* CTAs */}
              <div
                className={`flex flex-wrap gap-3 transition-all duration-700 delay-[650ms] ${
                  index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {banner.type === "master" ? (
                  <>
                    <button
                      onClick={() => navigate("/products/all")}
                      className="flex items-center gap-2.5 px-7 py-3.5 bg-[#c9993a] hover:bg-[#a67c2e] text-white text-[13px] font-[700] font-[Outfit] rounded-full transition-all duration-300 shadow-[0_6px_20px_rgba(201,153,58,0.35)] group"
                    >
                      Shop Now
                      <ArrowForward
                        sx={{ fontSize: 16 }}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                    <button
                      onClick={() => navigate("/become-seller")}
                      className="flex items-center gap-2.5 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-[13px] font-[600] font-[Outfit] rounded-full transition-all duration-300 group"
                    >
                      <Storefront sx={{ fontSize: 16 }} className="text-[#c9993a]" />
                      Sell with us
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigate(banner)}
                    className="flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-[#c9993a] text-[#0a0a0a] hover:text-white text-[13px] font-[700] font-[Outfit] rounded-full transition-all duration-300 shadow-lg group"
                  >
                    {banner.productId ? "View Product" : "View Collection"}
                    <ArrowForward
                      sx={{ fontSize: 16 }}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Slide Counter + Nav */}
        <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-20 flex items-center gap-3">
          {/* Counter */}
          <span className="text-white/50 text-[12px] font-[Outfit] font-medium tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(allSlides.length).padStart(2, "0")}
          </span>
          {/* Arrows */}
          {allSlides.length > 1 && (
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c9993a] backdrop-blur-sm border border-white/15 flex items-center justify-center text-white transition-all duration-250 group"
              >
                <ChevronLeft sx={{ fontSize: 20 }} />
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c9993a] backdrop-blur-sm border border-white/15 flex items-center justify-center text-white transition-all duration-250"
              >
                <ChevronRight sx={{ fontSize: 20 }} />
              </button>
            </div>
          )}
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-8 z-20 flex items-center gap-1.5">
          {allSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-400 ${
                i === current
                  ? "w-6 h-1.5 bg-[#c9993a]"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
