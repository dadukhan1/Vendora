/** @format */

import { useAppSelector } from "../../Redux Toolkit/store";
import HomeCategoryTable from "./HomeCategoryTable";

const GridTable = () => {
  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  return (
    <div>
      <HomeCategoryTable cateogry={homeCategories?.grid} />
    </div>
  );
};

export default GridTable;
