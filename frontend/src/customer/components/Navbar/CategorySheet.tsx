/** @format */

import { Box } from "@mui/material";
import { menLevel2 } from "../../../data/category/level2/menLevel2";
import { womenLevel2 } from "../../../data/category/level2/womenLevel2";
import { electronicLevel2 } from "../../../data/category/level2/electronicLevel2";
import { furnitureLevel2 } from "../../../data/category/level2/furnitureLevel2";
import { menLevel3 } from "../../../data/category/level3/menLevel3";
import { womenLevel3 } from "../../../data/category/level3/womenLevel3";
import { electronicLevel3 } from "../../../data/category/level3/electronicLevel3";
import { furnitureLevel3 } from "../../../data/category/level3/furnitureLevel3";

const categoryTwo: { [key: string]: any[] } = {
  men: menLevel2,
  women: womenLevel2,
  electronics: electronicLevel2,
  home_furniture: furnitureLevel2,
};
const categoryThree: { [key: string]: any[] } = {
  men: menLevel3,
  women: womenLevel3,
  electronics: electronicLevel3,
  home_furniture: furnitureLevel3,
};

const CategorySheet = ({ selectedCategory }: any) => {
  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter(
      (child: any) => child.parentCategoryId == parentCategoryId,
    );
  };

  return (
    <Box className='bg-white shadow-lg lg:h-125 overflow-auto'>
      <div className='flex text-sm flex-wrap'>
        {categoryTwo[selectedCategory].map((item, index) => (
          <div
            key={index}
            className={`p-8 lg:w-[20%] ${index % 2 == 0 ? "bg-slate-50" : "bg-white"}`}
          >
            <p className='text-teal-500 font-semibold mt-5 mb-1'>{item.name}</p>
            <ul className='space-y-3'>
              {childCategory(
                categoryThree[selectedCategory],
                item.categoryId,
              )?.map((item: any) => (
                <li key={item.name} className='cursor-pointer'>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
