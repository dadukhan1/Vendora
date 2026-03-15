/** @format */

import { useNavigate } from "react-router";
import { useAppSelector } from "../../../../Redux Toolkit/store";

const Grid = () => {
  const { homeCategories } = useAppSelector((store) => store.homeCategory);
  const navigate = useNavigate();

  if (!homeCategories?.grid?.length) {
    return (
      <div className='lg:h-[600px] px-5 lg:px-20 grid gap-4 grid-cols-12 grid-rows-12 animate-pulse'>
        {[3, 2, 4, 3, 4, 2, 3].map((span, i) => (
          <div
            key={i}
            className={`col-span-${span} row-span-6 bg-[#E2E8F0] rounded-2xl`}
          />
        ))}
      </div>
    );
  }

  const Cell = ({
    item,
    colSpan,
    rowSpan,
  }: {
    item: any;
    colSpan: string;
    rowSpan: string;
  }) => (
    <div
      onClick={() =>
        item?.categoryId && navigate(`/products/${item.categoryId}`)
      }
      className={`${colSpan} ${rowSpan} rounded-2xl overflow-hidden relative group cursor-pointer`}
    >
      <img
        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        src={item?.image}
        alt={item?.title}
      />
      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      {/* Title on hover */}
      {item?.title && (
        <div className='absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
          <p
            className='text-white text-sm font-700 tracking-tight'
            style={{ fontWeight: 700 }}
          >
            {item.title}
          </p>
          <p className='text-white/70 text-xs mt-0.5'>Shop now →</p>
        </div>
      )}
    </div>
  );

  return (
    <div className='px-5 lg:px-20 space-y-4'>
      {/* Section header */}
      <div className='flex items-end justify-between'>
        <div>
          <p
            className='text-xs text-[#0F52FF] uppercase tracking-widest mb-1'
            style={{ fontWeight: 700 }}
          >
            Curated for you
          </p>
          <h2 className='text-2xl font-bold text-[#0F172A] tracking-tight'>
            Shop by Style
          </h2>
        </div>
        <span className='text-sm text-[#0F52FF] font-semibold cursor-pointer hover:underline underline-offset-4'>
          View all →
        </span>
      </div>

      {/* Grid */}
      <div className='grid gap-3 grid-rows-12 grid-cols-12 lg:h-[600px]'>
        <Cell
          item={homeCategories.grid[0]}
          colSpan='col-span-3'
          rowSpan='row-span-12'
        />
        <Cell
          item={homeCategories.grid[2]}
          colSpan='col-span-2'
          rowSpan='row-span-6'
        />
        <Cell
          item={homeCategories.grid[1]}
          colSpan='col-span-4'
          rowSpan='row-span-6'
        />
        <Cell
          item={homeCategories.grid[5]}
          colSpan='col-span-3'
          rowSpan='row-span-12'
        />
        <Cell
          item={homeCategories.grid[4]}
          colSpan='col-span-4'
          rowSpan='row-span-6'
        />
        <Cell
          item={homeCategories.grid[6]}
          colSpan='col-span-2'
          rowSpan='row-span-6'
        />
      </div>
    </div>
  );
};

export default Grid;
