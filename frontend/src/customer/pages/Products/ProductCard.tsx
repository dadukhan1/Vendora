/** @format */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ item }: any) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(
        () => setCurrentImage((prev) => (prev + 1) % item.images.length),
        900,
      );
    }
    return () => clearInterval(interval);
  }, [isHovered, item.images.length]);

  return (
    <div
      className='group cursor-pointer px-2 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'
      onClick={() =>
        navigate(`/product-details/${item.category}/${item.title}/${item._id}`)
      }
    >
      {/* Image Container */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImage(0);
        }}
        className='relative w-full h-80 overflow-hidden rounded-xl bg-gray-100'
      >
        {item.images.map((image: string, index: number) => (
          <img
            src={image}
            alt={`product-${index}`}
            key={index}
            className='absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out'
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}

        {/* Hover overlay */}
        <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl' />

        {/* Discount badge */}
        {item.discount > 0 && (
          <div className='absolute top-3 left-3 bg-[#FF4F00] text-white text-xs font-bold px-2 py-1 rounded-full shadow'>
            {item.discount}% OFF
          </div>
        )}

        {/* Dot indicators */}
        {item.images.length > 1 && (
          <div className='absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            {item.images.map((_: any, index: number) => (
              <span
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentImage ? "bg-white scale-125" : "bg-white/50"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
      {/* Details */}
      <div className='pt-3 px-1 space-y-1'>
        <h2 className='text-sm font-semibold text-gray-900 truncate leading-tight'>
          {item.title}
        </h2>
        <p className='text-xs text-gray-400 truncate'>
          {item.color || item.category}
        </p>

        <div className='flex items-center gap-2 pt-1'>
          <span className='text-sm font-bold text-gray-900'>
            $ {item.sellingPrice}
          </span>
          <span className='text-xs line-through text-gray-400'>
            $ {item.mrpPrice}
          </span>
          <span className='text-xs font-semibold text-[#0F52FF]'>
            {item.discount}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
