/** @format */

import { useNavigate } from "react-router";
// import Deal from "./Deal/Deal";

import Grid from "./Grid/Grid";
import HomeCateogry from "./HomeCategory/HomeCategory";
import { Storefront } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='space-y-16 pb-20'>
      {/* Grid */}
      <section className='pt-8'>
        <Grid />
      </section>

      {/* Today's Deal */}
      {/* <section className='px-5 lg:px-20'>
        <div className='flex items-end justify-between mb-6'>
          <div>
            <p
              className='text-xs text-[#FF4F00] uppercase tracking-widest mb-1'
              style={{ fontWeight: 700 }}
            >
              Limited Time
            </p>
            <h2 className='text-2xl font-bold text-[#0F172A] tracking-tight'>
              Today's Deals
            </h2>
          </div>
          <span className='text-sm text-[#0F52FF] font-semibold cursor-pointer hover:underline underline-offset-4'>
            View all →
          </span>
        </div>
        <Deal />
      </section> */}

      {/* Shop by Category */}
      <section className='px-5 lg:px-20 '>
        <div className='flex items-end justify-between mb-6'>
          <div>
            <p
              className='text-xs text-[#0F52FF] uppercase tracking-widest mb-1'
              style={{ fontWeight: 700 }}
            >
              Explore
            </p>
            <h2 className='text-2xl font-bold text-[#0F172A] tracking-tight'>
              Shop by Category
            </h2>
          </div>
          <span className='text-sm text-[#0F52FF] font-semibold cursor-pointer hover:underline underline-offset-4'>
            View all →
          </span>
        </div>
        <HomeCateogry />
      </section>

      {/* Become a Seller banner */}
      <section className='px-5 lg:px-20'>
        <div className='relative rounded-3xl overflow-hidden h-[200px] lg:h-[420px]'>
          {/* Background image */}
          <img
            src='/img1.jpg'
            alt='Become a seller'
            className='w-full h-full object-cover'
          />

          {/* Dark overlay */}
          <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent' />

          {/* Content */}
          <div className='absolute inset-0 flex flex-col justify-center px-8 lg:px-20 space-y-4'>
            <p
              className='text-xs text-[#FF4F00] uppercase tracking-widest'
              style={{ fontWeight: 700 }}
            >
              Grow your business
            </p>
            <h2 className='text-2xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-md'>
              Sell your products with{" "}
              <span
                className='text-[#0F52FF]'
                style={{ fontFamily: "inherit" }}
              >
                Vendora
              </span>
            </h2>
            <p className='text-white/70 text-sm lg:text-base max-w-sm'>
              Join thousands of sellers and reach millions of customers across
              the country.
            </p>

            <div className='pt-2'>
              <button
                onClick={() => navigate("/become-seller")}
                className='flex items-center gap-2 px-6 py-3 bg-[#0F52FF] hover:bg-[#0040cc] text-white text-sm font-semibold rounded-full transition-all duration-150 cursor-pointer w-fit'
              >
                <Storefront sx={{ fontSize: 18 }} />
                Become a Seller
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
