/** @format */

import { useNavigate } from "react-router";

const DealCard = ({ deal }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/products")}
      className='group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden cursor-pointer hover:border-[#0F52FF] transition-all duration-200'
      style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 0 3px rgba(15,82,255,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div className='relative overflow-hidden aspect-square bg-[#F8FAFC]'>
        <img
          src={deal.image}
          alt='deal'
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        />
        {/* Discount badge */}
        <div className='absolute top-2.5 left-2.5 bg-[#FF4F00] text-white text-[10px] font-bold px-2.5 py-1 rounded-full'>
          -{deal.discount}%
        </div>
      </div>

      {/* Info */}
      <div className='p-3 space-y-1'>
        <p
          className='text-xs text-[#0F172A] font-semibold truncate'
          style={{ fontWeight: 600 }}
        >
          Flash Deal
        </p>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-bold text-[#0F52FF]'>₹899</span>
          <span className='text-xs text-[#94A3B8] line-through'>₹999</span>
        </div>
        {/* Progress bar */}
        <div className='pt-1'>
          <div className='flex justify-between mb-1'>
            <span className='text-[10px] text-[#64748B]'>Selling fast</span>
            <span className='text-[10px] text-[#FF4F00] font-semibold'>
              72%
            </span>
          </div>
          <div className='h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden'>
            <div
              className='h-full bg-[#FF4F00] rounded-full'
              style={{ width: "72%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
