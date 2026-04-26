import { useNavigate } from "react-router";
import { Storefront } from "@mui/icons-material";

// Dynamic Components
import BannerSlider from "./Banner/BannerSlider";
import FeaturedCategories from "./FeaturedCategories/FeaturedCategories";
import ProductCarousel from "./ProductCarousel/ProductCarousel";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='space-y-12 lg:space-y-24 pb-20'>
      {/* 1. Hero Dynamic Banner Slider */}
      <BannerSlider />

      {/* 2. Featured Categories (showOnHomepage: true) */}
      <section className='pt-4 lg:pt-8'>
        <div className='px-5 lg:px-20 mb-6 lg:mb-10'>
          <p className='text-[10px] lg:text-xs text-[#0F52FF] font-black uppercase tracking-[0.3em] mb-1 lg:mb-2'>
            Direct Access
          </p>
          <h2 className='text-2xl lg:text-4xl font-black text-[#0F172A] tracking-tighter'>
            Featured Collections
          </h2>
        </div>
        <FeaturedCategories />
      </section>

      {/* 3. New Arrivals (Latest Products) */}
      <section>
        <ProductCarousel
          title="New Arrivals"
          subtitle="Just Landed"
          query={{ sort: "newest", pageNumber: 1 }}
          color="#FF4F00"
        />
      </section>

      {/* 5. Featured Products (isFeatured: true) */}
      <section className='bg-slate-50 py-12 lg:py-24'>
        <ProductCarousel
          title="Staff Picks"
          subtitle="Handpicked For You"
          query={{ isFeatured: "true", pageNumber: 1 }}
          color="#0F52FF"
        />
      </section>

      {/* 6. Become a Seller banner */}
      <section className='px-4 lg:px-20'>
        <div className='relative rounded-[32px] lg:rounded-[40px] overflow-hidden min-h-[450px] lg:h-[500px] shadow-2xl flex items-center'>
          <img
            src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop'
            alt='Become a seller'
            className='absolute inset-0 w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/90 via-black/60 to-black/20 lg:to-transparent' />
          
          <div className='relative z-10 flex flex-col justify-center px-6 lg:px-24 py-12 lg:py-0 space-y-4 lg:space-y-6'>
            <div className='flex items-center gap-2'>
              <div className='w-6 lg:w-8 h-[1px] bg-[#FF4F00]' />
              <p className='text-[9px] lg:text-xs text-[#FF4F00] font-black uppercase tracking-[0.3em]'>
                Business Partnership
              </p>
            </div>
            
            <h2 className='text-3xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] max-w-2xl'>
              Monetize Your Craft with{" "}
              <span className='text-[#0F52FF] italic underline decoration-[#FF4F00] underline-offset-4 lg:underline-offset-8'>
                Vendora
              </span>
            </h2>
            
            <p className='text-white/70 text-sm lg:text-xl font-medium max-w-lg leading-relaxed'>
              Join the ecosystem of over 10,000+ local artisans and global brands reaching
              millions of active shoppers every day.
            </p>
            
            <div className='pt-4 lg:pt-6'>
              <button
                onClick={() => navigate("/become-seller")}
                className='flex items-center justify-center lg:justify-start gap-3 w-full lg:w-auto px-8 lg:px-10 py-4 lg:py-5 bg-[#0F52FF] hover:bg-white hover:text-[#0F52FF] text-white text-sm lg:text-base font-black rounded-full transition-all duration-300 shadow-xl group/s'
              >
                <Storefront className='scale-90 lg:scale-100 group-hover/s:scale-110 transition-transform' />
                Launch Your Shop
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
