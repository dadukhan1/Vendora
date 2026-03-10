/** @format */

import { useAppSelector } from "../../../../Redux Toolkit/store";

const Grid = () => {
  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  if (!homeCategories?.grid?.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
      <div className='col-span-3 row-span-12 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={homeCategories?.grid[0]?.image}
          alt={homeCategories?.grid[0]?.title}
        />
      </div>
      <div className='col-span-2 row-span-6 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={homeCategories?.grid[2]?.image}
          alt={homeCategories?.grid[2]?.title}
        />
      </div>
      <div className='col-span-4 row-span-6 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={homeCategories?.grid[1]?.image}
          alt={homeCategories?.grid[1]?.title}
        />
      </div>
      <div className='col-span-3 row-span-12 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={homeCategories?.grid[5]?.image}
          alt={homeCategories?.grid[5]?.title}
        />
      </div>
      <div className='col-span-4 row-span-6 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={homeCategories?.grid[4]?.image}
          alt={homeCategories?.grid[4]?.title}
        />
      </div>
      <div className='col-span-2 row-span-6 text-white rounded-md'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={homeCategories?.grid[6]?.image}
          alt={homeCategories?.grid[6]?.title}
        />
      </div>
    </div>
  );
};

export default Grid;
