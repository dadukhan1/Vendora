/** @format */

import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Redux Toolkit/store";
import ElectronicCategoryCard from "./ElectronicCategoryCard";
import { homeCategoryData } from "../../../../Redux Toolkit/features/customer/homeCategorySlice";


const ElectronicCategory = () => {
  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(homeCategoryData());
  }, [dispatch]);

  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
      {homeCategories?.electricCategories?.slice(0, 10)?.map((item, index) => (
        <ElectronicCategoryCard key={index} item={item} />
      ))}
    </div>
  );
};

export default ElectronicCategory;
