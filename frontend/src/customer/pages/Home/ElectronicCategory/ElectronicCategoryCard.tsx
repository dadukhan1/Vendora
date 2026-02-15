/** @format */

import { useNavigate } from "react-router";

const ElectronicCategoryCard = ({ item }: any) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className='flex w-20 flex-col items-center gap-3 cursor-pointer'
    >
      <img className='object-contain h-10' src={item.image} alt='' />
      <h2 className='font-semibold text-sm'>{item.name}</h2>
    </div>
  );
};

export default ElectronicCategoryCard;
