/** @format */

import { useAppSelector } from "../../../../Redux Toolkit/store";

const Grid = () => {
  const { grid } = useAppSelector((store) => store.homeCategory.homeCategories);

  if (!grid?.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
      <div className='col-span-3 row-span-12 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={grid[0]?.image}
          alt={grid[0]?.title}
        />
      </div>
      <div className='col-span-2 row-span-6 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={grid[2]?.image}
          alt={grid[2]?.title}
        />
      </div>
      <div className='col-span-4 row-span-6 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={grid[1]?.image}
          alt={grid[1]?.title}
        />
      </div>
      <div className='col-span-3 row-span-12 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={grid[5]?.image}
          alt={grid[5]?.title}
        />
      </div>
      <div className='col-span-4 row-span-6 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={grid[4]?.image}
          alt={grid[4]?.title}
        />
      </div>
      <div className='col-span-2 row-span-6 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={grid[6]?.image}
          alt={grid[6]?.title}
        />
      </div>
    </div>
  );
};

export default Grid;
