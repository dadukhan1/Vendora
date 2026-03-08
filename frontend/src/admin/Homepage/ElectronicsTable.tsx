/** @format */

import { useAppSelector } from "../../Redux Toolkit/store";
import HomeCategoryTable from "./HomeCategoryTable";

const ElectronicsTable = () => {
  const { homeCategories } = useAppSelector((store) => store.homeCategory);
  return (
    <div>
      <HomeCategoryTable cateogry={homeCategories?.electricCategories} />
    </div>
  );
};

export default ElectronicsTable;
