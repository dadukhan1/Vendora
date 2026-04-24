import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const CategorySheet = ({ categories, selectedCategory }: any) => {
  const navigate = useNavigate();

  const getCategoriesByParentId = (parentCategoryId: string | null) => {
    return categories.filter((cat: any) => {
      let catParentId: string | null = null;
      if (typeof cat.parentCategory === "object" && cat.parentCategory !== null) {
        catParentId = (cat.parentCategory as any)._id;
      } else {
        catParentId = cat.parentCategory as string | null;
      }
      return catParentId === parentCategoryId;
    });
  };

  const level2Categories = getCategoriesByParentId(selectedCategory);

  return (
    <Box sx={{ bgcolor: 'white', minHeight: 400, overflow: 'auto', p: 4 }}>
      <div className='flex text-sm flex-wrap gap-y-10'>
        {level2Categories.map((lvl2: any, index: number) => (
          <div
            key={lvl2._id}
            className={`p-6 lg:w-[20%] rounded-2xl ${index % 2 == 0 ? "bg-slate-50/50" : "bg-white"}`}
          >
            <Typography 
               variant="subtitle2" 
               sx={{ color: '#0F52FF', fontWeight: 900, mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}
            >
              {lvl2.name}
            </Typography>
            
            <ul className='space-y-3'>
              {getCategoriesByParentId(lvl2._id).map((lvl3: any) => (
                <li
                  onClick={() => navigate(`/products/${lvl3.categoryId}`)}
                  key={lvl3._id}
                  className='cursor-pointer text-[#475569] hover:text-[#0F52FF] transition-colors flex items-center gap-2 group'
                >
                  <div className='w-1 h-1 bg-gray-300 rounded-full group-hover:bg-[#0F52FF] transition-colors' />
                  {lvl3.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {level2Categories.length === 0 && (
          <Box sx={{ width: '100%', py: 10, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              No sub-categories available for this section.
            </Typography>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default CategorySheet;
