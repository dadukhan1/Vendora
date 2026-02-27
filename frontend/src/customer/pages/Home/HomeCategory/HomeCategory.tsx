/** @format */

import React from "react";
import HomeCategoryCard from "./HomeCategoryCard";
import { useAppSelector } from "../../../../Redux Toolkit/store";

const HomeCateogry = () => {
  const { homeCategories } = useAppSelector((store) => store.homeCategory);
  return (
    <div className='flex justify-center gap-7 flex-wrap'>
      {homeCategories?.shopByCategories?.map((item, index) => (
        <HomeCategoryCard key={index} item={item} />
      ))}
    </div>
  );
};

export default HomeCateogry;
