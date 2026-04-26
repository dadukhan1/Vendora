/** @format */

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowForward, Storefront } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { Skeleton, Box, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/store.ts";
import { fetchBanners } from "../../../../Redux Toolkit/features/banner/bannerSlice.ts";

const BannerSlider = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { banners = [], loading } = useAppSelector((state) => state.banners);
  const [current, setCurrent] = useState(0);

  // Prepending the Master Multivendor Slide
  const masterSlide = {
    _id: "master-hero",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    title: "Shop from multiple trusted sellers in one place",
    description: "Discover quality products, exclusive deals, and fast delivery at the best prices.",
    type: "master",
    categoryId: "all",
    productId: undefined,
    isActive: true
  };

  const allSlides = [masterSlide, ...banners];

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    if (allSlides.length > 1) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev === allSlides.length - 1 ? 0 : prev + 1));
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [allSlides.length]);

  if (loading) return (
    <Box sx={{ px: { xs: 2, lg: 16 }, pt: 4 }}>
      <Skeleton variant="rectangular" width="100%" height={500} sx={{ borderRadius: '40px' }} />
    </Box>
  );

  const next = () => setCurrent(current === allSlides.length - 1 ? 0 : current + 1);
  const prev = () => setCurrent(current === 0 ? allSlides.length - 1 : current - 1);

  const handleNavigate = (banner: any) => {
    if (banner.type === "master") return; // Buttons handled separately
    if (banner.productId) {
      navigate(`/product-details/${banner.categoryId || 'shop'}/${banner.title.replace(/\s+/g, '-')}/${banner.productId}`);
    } else if (banner.categoryId) {
      navigate(`/products/${banner.categoryId}`);
    }
  };

  return (
    <div className='px-2 lg:px-16 pt-2 lg:pt-4 relative group'>
      <div className='relative h-[400px] lg:h-[600px] w-full overflow-hidden rounded-[24px] lg:rounded-[48px] shadow-2xl bg-slate-900'>
        {allSlides.map((banner, index) => (
          <div
            key={banner._id}
            className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
              index === current ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-10 z-0"
            }`}
          >
            {/* Background Image with Overlay */}
            <img
              src={banner.image}
              alt={banner.title}
              className={`w-full h-full object-cover transition-transform duration-10000 ease-out ${index === current ? 'scale-110' : 'scale-100'}`}
            />
            <div className='absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/90 via-black/40 to-black/10 lg:to-transparent' />

            {/* Content Container */}
            <div className='absolute inset-0 flex flex-col justify-end lg:justify-center px-6 lg:px-24 pb-12 lg:pb-0 max-w-4xl'>
              <div className='space-y-4 lg:space-y-8'>
                <div className={`flex items-center gap-2 lg:gap-3 transition-all duration-1000 delay-300 transform ${index === current ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                   <div className='w-6 lg:w-8 h-[1.5px] lg:h-[2px] bg-[#0F52FF]' />
                   <p className='text-[8px] lg:text-xs text-[#0F52FF] font-black uppercase tracking-[0.3em] lg:tracking-[0.4em]'>
                     {banner.type === 'master' ? 'Welcome to Vendora' : (banner.productId ? 'Staff Pick' : 'Exclusive Highlight')}
                   </p>
                </div>

                <h2 className={`text-3xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] transition-all duration-1000 delay-500 transform ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  {banner.title}
                </h2>

                <p className={`text-white/70 text-xs lg:text-xl font-medium max-w-2xl leading-relaxed transition-all duration-1000 delay-700 transform ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                  {banner.description}
                </p>

                {/* Conditional Actions */}
                <div className={`flex flex-wrap gap-3 pt-2 lg:pt-8 transition-all duration-700 delay-1000 transform ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                  {banner.type === "master" ? (
                    <>
                      <button
                        onClick={() => navigate("/products/all")}
                        className='px-6 lg:px-10 py-3.5 lg:py-5 bg-[#0F52FF] hover:bg-white hover:text-[#0F172A] text-white text-sm lg:text-base font-black rounded-full transition-all duration-300 shadow-xl flex items-center gap-2 lg:gap-3 group'
                      >
                        Shop Now
                        <ArrowForward className='scale-90 lg:scale-100 group-hover:translate-x-1 transition-transform' />
                      </button>
                      <button
                        onClick={() => navigate("/become-seller")}
                        className='px-6 lg:px-10 py-3.5 lg:py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-sm lg:text-base font-black rounded-full transition-all duration-300 flex items-center gap-2 lg:gap-3 group'
                      >
                        <Storefront className='scale-90 lg:scale-100 group-hover:scale-110 transition-transform' />
                        Sell
                      </button>
                    </>
                  ) : (
                    <button
                        onClick={() => handleNavigate(banner)}
                        className='relative group flex items-center gap-3 lg:gap-4 px-6 lg:px-10 py-3.5 lg:py-5 bg-white text-[#0F172A] hover:bg-[#0F52FF] hover:text-white text-sm lg:text-base font-black rounded-full transition-all duration-300 shadow-2xl overflow-hidden'
                      >
                        <span className='relative z-10'>{banner.productId ? "Explore" : "View Collection"}</span>
                        <div className='w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white/20 transition-colors'>
                           <ArrowForward className='w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform' />
                        </div>
                      </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Controls - Hidden on Mobile */}
        {allSlides.length > 1 && (
          <div className='absolute bottom-10 right-10 hidden lg:flex gap-4 z-30'>
             <IconButton 
                onClick={prev} 
                sx={{ bgcolor: 'white/10', backdropFilter: 'blur(10px)', color: 'white', border: '1px solid white/10', '&:hover': { bgcolor: '#0F52FF' } }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton 
                onClick={next} 
                sx={{ bgcolor: 'white/10', backdropFilter: 'blur(10px)', color: 'white', border: '1px solid white/10', '&:hover': { bgcolor: '#0F52FF' } }}
              >
                <ChevronRight />
              </IconButton>
          </div>
        )}

        {/* Progress Line Indication */}
        <div className='absolute bottom-0 left-0 h-1 bg-[#0F52FF]/30 w-full z-30'>
           <div 
             className='h-full bg-[#0F52FF] transition-all duration-700' 
             style={{ width: `${((current + 1) / allSlides.length) * 100}%` }}
           />
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
