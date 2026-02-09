/** @format */

import { useEffect, useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ item }: any) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(
        () => setCurrentImage((prev) => (prev + 1) % item.images.length),
        1000,
      );
    } else if (interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isHovered, item.images.length]);

  return (
    <div className='group px-4 relative'>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='card relative w-[250px] sm:w-full h-[350px] overflow-hidden'
      >
        {item.images.map((image: string, index: number) => (
          <img
            src={image}
            alt={`product-${index}`}
            key={index}
            className='absolute inset-0 w-full h-full object-cover transition-transform duration-500'
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}
      </div>
      <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
        <div className='name-space-y'>
          <h1>{item.sellerDetails.bussinessName}</h1>
          <p>Pink Floral Patterened Saree</p>
        </div>
        <div className='price flex items-center gap-3'>
          <span className='font-semibold text-teal-800'>2499</span>
          <span className='text font-thin line-through text-gray-400'>
            3499
          </span>
          <span className='font-semibold text-teal-600'>34% off</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
