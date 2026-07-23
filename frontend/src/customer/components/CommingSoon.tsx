/** @format */

import { useNavigate } from "react-router";
import { Storefront } from "@mui/icons-material";

export const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center px-6 relative overflow-hidden'>
      {/* Background decoration circles */}
      <div className='absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full bg-[#F59E0B]/5 pointer-events-none' />
      <div className='absolute bottom-[-60px] left-[-60px] w-[240px] h-[240px] rounded-full bg-[#FF4F00]/5 pointer-events-none' />

      {/* Card */}
      <div className='bg-white border border-[#E2E8F0] rounded-3xl px-10 py-14 max-w-md w-full text-center shadow-none relative z-10'>
        {/* Icon */}
        <div
          className='w-16 h-16 rounded-2xl bg-[#F59E0B]/08 border border-[#F59E0B]/15 flex items-center justify-center mx-auto mb-6'
          style={{ background: "rgba(15,82,255,0.07)" }}
        >
          <Storefront sx={{ fontSize: 28, color: "#F59E0B" }} />
        </div>

        {/* Top accent bar inside card */}
        <div className='h-1 w-16 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FF4F00] mx-auto mb-6' />

        <h1 className='text-2xl font-bold text-[#1F2937] mb-3 tracking-tight'>
          Coming Soon
        </h1>
        <p className='text-[#64748B] text-sm leading-relaxed mb-8'>
          We're working hard on this page. Check back soon — something great is
          on its way.
        </p>

        {/* Buttons */}
        <div className='flex items-center justify-center gap-3'>
          <button
            onClick={() => navigate("/")}
            className='px-5 py-2.5 rounded-full bg-[#F59E0B] text-white text-sm font-semibold hover:bg-[#0040cc] transition-all duration-150 cursor-pointer'
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Bottom brand */}
      <div
        className='mt-10 flex items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-150'
        onClick={() => navigate("/")}
      >
        <Storefront sx={{ fontSize: 16, color: "#F59E0B" }} />
        <span className='text-[#1F2937] text-sm font-bold tracking-tight'>
          Vendora
        </span>
      </div>
    </div>
  );
};
