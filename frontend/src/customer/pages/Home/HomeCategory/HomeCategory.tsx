/** @format */

import HomeCategoryCard from "./HomeCategoryCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Redux Toolkit/store";
import { useEffect } from "react";
import { getHomePageCategories } from "../../../../Redux Toolkit/features/customer/homeCategorySlice";

const HomeCateogry = () => {
  const dispatch = useAppDispatch();
  const { homeCategories, loading } = useAppSelector((store) => store.homeCategory);

  useEffect(() => {
    dispatch(getHomePageCategories());
  }, [dispatch]);

  if (loading && !homeCategories) {
    return (
      <div className='flex flex-wrap justify-center gap-6 lg:gap-10'>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className='w-24 sm:w-56 space-y-4 animate-pulse'>
            <div className='w-full aspect-square bg-gray-200 rounded-3xl' />
            <div className='h-4 bg-gray-200 rounded w-2/3 mx-auto' />
          </div>
        ))}
      </div>
    );
  }

  const categoriesToDisplay = homeCategories?.shopByCategories || [];

  return (
    <div className='flex flex-wrap justify-center gap-6 lg:gap-10 py-4'>
      {categoriesToDisplay.length > 0 ? (
        categoriesToDisplay.map((item, index) => (
          <HomeCategoryCard key={index} item={item} />
        ))
      ) : (
        <div className='text-center py-10 w-full'>
          <p className='text-gray-400 italic text-sm'>No categories curated for the home page yet.</p>
        </div>
      )}
    </div>
  );
};

export default HomeCateogry;
