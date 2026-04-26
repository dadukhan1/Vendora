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
      className='group cursor-pointer bg-white rounded-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5'
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
        className='relative w-full h-[320px] lg:h-[400px] overflow-hidden rounded-2xl bg-slate-50'
      >
        {item.images.map((image: string, index: number) => (
          <img
            src={image}
            alt={`product-${index}`}
            key={index}
            className='absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out'
            style={{
              opacity: index === currentImage ? 1 : 0,
              transform: `scale(${index === currentImage ? 1 : 1.1})`,
            }}
          />
        ))}

        {/* Hover overlay gradient */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

        {/* Discount badge - Premium Glassmorphism */}
        {item.discount > 0 && (
          <div className='absolute top-4 left-4 backdrop-blur-md bg-[#FF4F00]/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg border border-white/20 uppercase tracking-wider'>
            {item.discount}% OFF
          </div>
        )}

        {/* Dot indicators - Minimalist */}
        {item.images.length > 1 && (
          <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
            {item.images.map((_: any, index: number) => (
              <span
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${index === currentImage ? "w-6 bg-white" : "w-1 bg-white/40"
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className='pt-4 pb-2 px-1 space-y-1.5'>
        <div className='flex justify-between items-start gap-2'>
           <h2 className='text-[0.925rem] font-bold text-[#1E293B] truncate leading-tight group-hover:text-[#0F52FF] transition-colors'>
            {item.title}
          </h2>
        </div>
        
        <p className='text-[0.75rem] text-[#64748B] font-medium uppercase tracking-widest'>
          {item.category?.name || item.category}
        </p>

        <div className='flex items-baseline gap-2 pt-1'>
          <span className='text-[1.1rem] font-black text-[#0F172A]'>
            ${item.sellingPrice}
          </span>
          {item.mrpPrice > item.sellingPrice && (
            <>
              <span className='text-[0.8rem] line-through text-[#94A3B8] font-medium'>
                ${item.mrpPrice}
              </span>
              <span className='text-[0.75rem] font-bold text-[#FF4F00] bg-[#FF4F00]/5 px-2 py-0.5 rounded'>
                -{item.discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
