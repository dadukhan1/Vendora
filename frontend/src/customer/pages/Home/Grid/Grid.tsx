/** @format */

import { useNavigate } from "react-router";
import { useAppSelector } from "../../../../Redux Toolkit/store";

const Grid = () => {
  const { categories, loading } = useAppSelector((state) => state.category);
  const navigate = useNavigate();

  // Extract only Level 1 categories for the landing grid
  const level1Categories = categories.filter((cat) => {
    if (cat.isActive === false) return false;
    if (typeof cat.parentCategory === "object" && cat.parentCategory !== null) {
       return false; // Has a populated parent object
    }
    return cat.parentCategory === null; // No parent means Level 1
  });

  if (loading || !level1Categories.length) {
    return (
      <div className='px-5 lg:px-20 space-y-4'>
        <div className='h-10 w-48 bg-gray-100 rounded-lg animate-pulse' />
        <div className='lg:h-[600px] h-auto grid gap-4 grid-cols-12 grid-rows-12'>
          <div className='col-span-12 lg:col-span-3 row-span-1 lg:row-span-12 bg-gray-100 rounded-[32px] animate-pulse h-80 lg:h-auto' />
          <div className='col-span-6 lg:col-span-2 row-span-1 lg:row-span-6 bg-gray-100 rounded-[32px] animate-pulse h-60 lg:h-auto' />
          <div className='col-span-6 lg:col-span-4 row-span-1 lg:row-span-6 bg-gray-100 rounded-[32px] animate-pulse h-60 lg:h-auto' />
          <div className='col-span-12 lg:col-span-3 row-span-1 lg:row-span-12 bg-gray-100 rounded-[32px] animate-pulse h-80 lg:h-auto' />
        </div>
      </div>
    );
  }

  const Cell = ({
    index,
    colSpan,
    rowSpan,
  }: {
    index: number;
    colSpan: string;
    rowSpan: string;
  }) => {
    const item = level1Categories[index];
    if (!item) return null;

    return (
      <div
        onClick={() => item?.categoryId && navigate(`/products/${item.categoryId}`)}
        className={`${colSpan} ${rowSpan} rounded-[32px] overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500`}
      >
        <img
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out'
          src={item?.image}
          alt={item?.name}
        />
        
        {/* Advanced Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500' />
        
        {/* Content Box */}
        <div className='absolute inset-0 p-6 lg:p-8 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out'>
          <div className='space-y-1'>
            <p className='text-white/70 text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] mb-1'>
              Explore Level 1
            </p>
            <h3 className='text-white text-xl lg:text-2xl font-black tracking-tight leading-tight'>
              {item.name}
            </h3>
            <div className='pt-4 flex items-center gap-2 text-white/0 group-hover:text-[#0F52FF] transition-all duration-500 overflow-hidden'>
               <span className='h-[1px] w-0 group-hover:w-8 bg-[#0F52FF] transition-all duration-500' />
               <span className='text-[11px] font-black uppercase tracking-widest translate-x-[-20px] group-hover:translate-x-0 transition-all duration-700'>
                 Shop Category
               </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='px-5 lg:px-20 space-y-6'>
      {/* Section header */}
      <div className='flex items-end justify-between'>
        <div className='space-y-1'>
          <p className='text-[10px] lg:text-xs text-[#0F52FF] font-black uppercase tracking-[0.3em]'>
            Live Collections
          </p>
          <h2 className='text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tighter'>
            Shop by Category
          </h2>
        </div>
        <div 
          onClick={() => navigate('/products/all')}
          className='hidden sm:flex items-center gap-3 text-sm font-bold text-[#475569] cursor-pointer group'
        >
           <span className='group-hover:text-[#0F52FF] transition-colors'>View Hierarchy</span>
           <div className='w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#0F52FF] group-hover:text-white transition-all'>
             →
           </div>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className='grid gap-4 lg:gap-6 grid-cols-12 lg:grid-rows-12 h-auto lg:h-[700px]'>
        {/* Pattern Logic using actual Level 1 Categories */}
        <Cell index={0} colSpan='col-span-12 lg:col-span-3' rowSpan='h-80 lg:h-auto lg:row-span-12' />
        <Cell index={1} colSpan='col-span-6 lg:col-span-2' rowSpan='h-60 lg:h-auto lg:row-span-6' />
        <Cell index={2} colSpan='col-span-6 lg:col-span-4' rowSpan='h-60 lg:h-auto lg:row-span-6' />
        <Cell index={3} colSpan='col-span-12 lg:col-span-3' rowSpan='h-80 lg:h-auto lg:row-span-12' />
        <Cell index={4} colSpan='col-span-7 lg:col-span-4' rowSpan='h-60 lg:h-auto lg:row-span-6' />
        <Cell index={5} colSpan='col-span-5 lg:col-span-2' rowSpan='h-60 lg:h-auto lg:row-span-6' />
      </div>
    </div>
  );
};

export default Grid;
