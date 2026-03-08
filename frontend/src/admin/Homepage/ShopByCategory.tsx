/** @format */

import { useAppSelector } from "../../Redux Toolkit/store";
import HomeCategoryTable from "./HomeCategoryTable";

const ShopByCategory = () => {
  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  return (
    <div>
      <HomeCategoryTable cateogry={homeCategories?.shopByCategories} />
    </div>
  );
};

export default ShopByCategory;
