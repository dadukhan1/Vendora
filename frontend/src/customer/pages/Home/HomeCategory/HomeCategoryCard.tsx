/** @format */

import { useNavigate } from "react-router";

const HomeCategoryCard = ({ item }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className='group flex flex-col items-center gap-3 cursor-pointer w-24 sm:w-56'
    >
      {/* Image */}
      <div className='w-full aspect-square rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] relative group-hover:border-[#0F52FF] transition-all duration-200'>
        <img
          src={item.image}
          alt={item.name}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        />
        <div className='absolute inset-0 bg-[#0F52FF]/0 group-hover:bg-[#0F52FF]/08 transition-all duration-200' />
      </div>

      {/* Label */}
      <p
        className='text-sm text-[#0F172A] text-center group-hover:text-[#0F52FF] transition-colors duration-150 truncate w-full'
        style={{ fontWeight: 600 }}
      >
        {item.name}
      </p>
    </div>
  );
};

export default HomeCategoryCard;
