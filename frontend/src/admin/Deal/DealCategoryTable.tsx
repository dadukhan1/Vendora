/** @format */

import { useAppSelector } from "../../Redux Toolkit/store";
import HomeCategoryTable from "../Homepage/HomeCategoryTable";

const DealCategoryTable = () => {
  const { homeCategories } = useAppSelector((store) => store.homeCategory);

  return (
    <div>
      <HomeCategoryTable cateogry={homeCategories?.deals} />
    </div>
  );
};

export default DealCategoryTable;
