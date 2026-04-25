/** @format */

import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import { useAppSelector } from "../../../../Redux Toolkit/store";

const FeaturedCategories = () => {
  const { categories } = useAppSelector((state) => state.category);
  const navigate = useNavigate();

  // Filter categories with showOnHomepage: true
  const featured = categories.filter((cat) => cat.showOnHomepage && cat.isActive);

  if (featured.length === 0) return null;

  return (
    <div className='px-5 lg:px-20'>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {featured.map((cat) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/products/${cat.categoryId}`)}
            className='group cursor-pointer'
          >
            <div className='relative aspect-square overflow-hidden rounded-3xl bg-gray-100 mb-3 shadow-sm hover:shadow-xl transition-all duration-500'>
              <img
                src={cat.image}
                alt={cat.name}
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
            </div>
            <Typography variant="body1" sx={{ fontWeight: 900, textAlign: 'center', color: '#1E293B', fontSize: '0.9rem' }}>
              {cat.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
