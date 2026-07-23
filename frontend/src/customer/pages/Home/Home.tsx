import { useNavigate } from "react-router";
import { Storefront, ArrowForward, LocalShipping, Shield, RotateLeft } from "@mui/icons-material";

// Dynamic Components
import BannerSlider from "./Banner/BannerSlider";
import FeaturedCategories from "./FeaturedCategories/FeaturedCategories";
import ProductCarousel from "./ProductCarousel/ProductCarousel";

const trustBadges = [
  { icon: <LocalShipping sx={{ fontSize: 20 }} />, label: "Free Shipping", sub: "On orders over $50" },
  { icon: <Shield sx={{ fontSize: 20 }} />, label: "Buyer Protection", sub: "100% secure checkout" },
  { icon: <RotateLeft sx={{ fontSize: 20 }} />, label: "Easy Returns", sub: "30-day return policy" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-24">
      {/* 1. Hero Banner Slider */}
      <BannerSlider />

      {/* 2. Trust Badges */}
      <section className="px-4 lg:px-6 py-8 lg:py-10">
        <div className="grid grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 lg:p-5 bg-[#f5f3ef] rounded-2xl border border-[#ede9e2]"
            >
              <div className="text-[#c9993a] flex-shrink-0">{badge.icon}</div>
              <div className="text-center sm:text-left">
                <p className="text-[12px] lg:text-[13px] font-[700] font-[Outfit] text-[#0a0a0a] leading-tight">
                  {badge.label}
                </p>
                <p className="text-[10px] lg:text-[11px] text-[#9ca3af] mt-0.5">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Categories */}
      <section className="py-10 lg:py-16">
        <div className="px-4 lg:px-6 mb-8 lg:mb-12">
          <p className="section-eyebrow mb-2 lg:mb-3">Curated For You</p>
          <h2 className="section-title text-[28px] lg:text-[42px]">Featured Collections</h2>
        </div>
        <FeaturedCategories />
      </section>

      {/* 4. New Arrivals */}
      <section className="py-8 lg:py-12 rounded-[32px] lg:rounded-[48px] mx-3 lg:mx-6 mb-10 lg:mb-16">
        <div className="pt-4 lg:pt-6">
          <ProductCarousel
            title="New Arrivals"
            subtitle="Just Landed"
            query={{ sort: "newest", pageNumber: 1 }}
            color="#c9993a"
            viewAllPath="/products/all?sort=newest"
          />
        </div>
        {/* Override text colors in dark section */}
        <style>{`
          .dark-section .section-title { color: #fafaf8 !important; }
          .dark-section .label-overline { color: #c9993a !important; }
        `}</style>
      </section>

      {/* 5. Staff Picks */}
      <section className="py-10 lg:py-16">
        <ProductCarousel
          title="Staff Picks"
          subtitle="Handpicked Excellence"
          query={{ isFeatured: "true", pageNumber: 1 }}
          color="#e03c54"
          viewAllPath="/products/all?isFeatured=true"
        />
      </section>

      {/* 6. Editorial Strip */}
      <section className="px-3 lg:px-6 mb-10 lg:mb-16">
        <div className="relative rounded-[28px] lg:rounded-[40px] overflow-hidden min-h-[460px] lg:h-[540px] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Become a seller"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/75 to-[#0a0a0a]/20" />

          <div className="relative z-10 px-8 lg:px-20 py-14 max-w-2xl">
            <div className="flex items-center gap-3 mb-5 lg:mb-7">
              <div className="h-px w-8 bg-[#e03c54]" />
              <span className="label-overline text-[#e03c54]">Partnership</span>
            </div>

            <h2 className="font-[Playfair_Display] font-bold text-[36px] lg:text-[58px] text-white leading-[1.08] tracking-[-0.02em] mb-5 lg:mb-7">
              Monetize Your Craft{" "}
              <span className="text-[#c9993a] italic">with Vendora</span>
            </h2>

            <p className="text-[#c4bdb4] text-[14px] lg:text-[17px] font-light leading-relaxed max-w-md mb-8 lg:mb-10">
              Join 10,000+ artisans and brands reaching millions of active shoppers every day.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/become-seller")}
                className="flex items-center gap-2.5 px-8 py-4 bg-[#c9993a] hover:bg-[#a67c2e] text-white text-[13px] font-[700] font-[Outfit] rounded-full transition-all duration-300 shadow-[0_6px_20px_rgba(201,153,58,0.35)] group"
              >
                <Storefront sx={{ fontSize: 17 }} />
                Launch Your Shop
                <ArrowForward sx={{ fontSize: 15 }} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/products/all")}
                className="flex items-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-[13px] font-[600] font-[Outfit] rounded-full transition-all duration-300"
              >
                Browse Shop
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
