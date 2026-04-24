/** @format */

import { useNavigate } from "react-router";

const HomeCategoryCard = ({ item }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className='group flex flex-col items-center gap-4 cursor-pointer w-28 sm:w-48 lg:w-56'
    >
      {/* Image Container */}
      <div className='w-full aspect-square rounded-[32px] overflow-hidden border-2 border-transparent bg-gray-50 relative shadow-sm group-hover:shadow-xl group-hover:shadow-blue-500/10 group-hover:border-[#0F52FF] transition-all duration-500 ease-out'>
        <img
          src={item.image}
          alt={item.name}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out'
        />
        {/* Subtle overlay */}
        <div className='absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-all duration-300' />
      </div>

      {/* Title */}
      <div className='text-center space-y-1'>
        <p
          className='text-sm sm:text-base text-[#1E293B] font-bold tracking-tight group-hover:text-[#0F52FF] transition-colors duration-300'
        >
          {item.name}
        </p>
        <p className='text-[10px] sm:text-[11px] text-gray-400 font-extrabold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0'>
          Explore Collection
        </p>
      </div>
    </div>
  );
};

export default HomeCategoryCard;
