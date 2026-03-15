/** @format */

import HomeCategoryCard from "./HomeCategoryCard";
import { useAppSelector } from "../../../../Redux Toolkit/store";

const HomeCateogry = () => {
  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {homeCategories?.shopByCategories?.slice(0, 4)?.map((item, index) => (
        <HomeCategoryCard key={index} item={item} />
      ))}
    </div>
  );
};

export default HomeCateogry;
