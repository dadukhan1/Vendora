/** @format */

import { useEffect } from "react";
import { getHomePageCategories } from "../../Redux Toolkit/features/customer/homeCategorySlice";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import HomeCategoryTable from "./HomeCategoryTable";

const ShopByCategory = () => {
  const dispatch = useAppDispatch();
  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  useEffect(() => {
    dispatch(getHomePageCategories());
  }, [dispatch]);

  return (
    <div>
      <HomeCategoryTable cateogry={homeCategories?.shopByCategories} />
    </div>
  );
};

export default ShopByCategory;
