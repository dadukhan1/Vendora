/** @format */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import HomeCategoryTable from "./HomeCategoryTable";
import { getHomePageCategories } from "../../Redux Toolkit/features/customer/homeCategorySlice";

const ElectronicsTable = () => {
  const dispatch = useAppDispatch();
  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  useEffect(() => {
    dispatch(getHomePageCategories());
  }, [dispatch]);
  return (
    <div>
      <HomeCategoryTable cateogry={homeCategories?.electricCategories} />
    </div>
  );
};

export default ElectronicsTable;
