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
  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  useEffect(() => {
    dispatch(getHomePageCategories());
  }, []);

  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {homeCategories?.shopByCategories?.slice(0, 4)?.map((item, index) => (
        <HomeCategoryCard key={index} item={item} />
      ))}
    </div>
  );
};

export default HomeCateogry;
