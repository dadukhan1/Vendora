/** @format */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import HomeCategoryTable from "./HomeCategoryTable";
import { getHomePageCategories } from "../../Redux Toolkit/features/customer/homeCategorySlice";

const GridTable = () => {
  const dispatch = useAppDispatch();
  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  useEffect(() => {
    dispatch(getHomePageCategories());
  }, [dispatch]);

  return (
    <div>
      <HomeCategoryTable cateogry={homeCategories?.grid} />
    </div>
  );
};

export default GridTable;
