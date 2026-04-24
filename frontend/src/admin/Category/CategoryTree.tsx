import React from "react";
import type { Category } from "../../Redux Toolkit/features/category/categorySlice.ts";
import { ChevronRight, Folder, SubdirectoryArrowRight, Edit, Delete } from "@mui/icons-material";
import { Box, Typography, Avatar, Tooltip, IconButton } from "@mui/material";

interface CategoryTreeProps {
  categories: Category[];
  parentId?: string | null;
  level?: number;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  parentId = null,
  level = 0,
  onEdit,
  onDelete,
}) => {
  const children = categories.filter((cat) => {
    let catParentId: string | null = null;
    if (typeof cat.parentCategory === 'object' && cat.parentCategory !== null) {
      catParentId = (cat.parentCategory as { _id: string })._id;
    } else {
      catParentId = cat.parentCategory as string | null;
    }
    return catParentId === parentId;
  });

  if (children.length === 0 || level > 5) return null; // Added level safety limit

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 1.5,
      ml: level > 0 ? { xs: 1, sm: 2, md: 4 } : 0, 
      pl: level > 0 ? { xs: 1.5, sm: 2.5, md: 3 } : 0,
      borderLeft: level > 0 ? '1px solid #e2e8f0' : 'none'
    }}>
      {children.map((category) => (
        <Box key={category._id}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1, sm: 2 }, 
              p: { xs: '8px 10px', sm: '10px 14px' }, 
              borderRadius: '14px', 
              transition: 'all 0.2s',
              bgcolor: level === 0 ? 'white' : 'transparent',
              boxShadow: level === 0 ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
              '&:hover': { 
                bgcolor: level === 0 ? '#f7fafc' : 'rgba(15, 82, 255, 0.04)',
                transform: 'translateX(4px)',
                cursor: 'pointer'
              }
            }}
          >
            {/* Level Icon */}
            <Box sx={{ color: '#a0aec0', display: 'flex', alignItems: 'center' }}>
              {level === 0 ? (
                <Folder sx={{ fontSize: { xs: 18, sm: 20 }, color: '#0F52FF' }} />
              ) : (
                <SubdirectoryArrowRight sx={{ fontSize: { xs: 14, sm: 16 } }} />
              )}
            </Box>
            
            {/* Category Image / Avatar */}
            <Avatar 
              src={category.image} 
              alt={category.name || 'Category'}
              variant="rounded"
              sx={{ 
                width: { xs: 28, sm: 32 }, 
                height: { xs: 28, sm: 32 }, 
                fontSize: { xs: '10px', sm: '12px' },
                bgcolor: '#edf2f7',
                color: '#4a5568',
                fontWeight: 700,
                border: '1px solid #e2e8f0'
              }}
            >
              {category.name?.charAt(0) || 'C'}
            </Avatar>
            
            {/* Name and ID */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography 
                  noWrap
                  sx={{ 
                    fontSize: { xs: level === 0 ? '0.9rem' : '0.8rem', sm: level === 0 ? '1rem' : '0.9rem' }, 
                    fontWeight: level === 0 ? 800 : 500,
                    color: '#2d3748'
                  }}
                >
                  {category.name || 'Unnamed Category'}
                </Typography>
                <Tooltip title="Internal Category ID">
                   <Box sx={{ 
                    display: { xs: 'none', sm: 'block' },
                    fontSize: '10px', 
                    fontWeight: 700, 
                    color: '#0F52FF',
                    bgcolor: '#ebf4ff',
                    px: 1,
                    py: 0.2,
                    borderRadius: '6px',
                    textTransform: 'uppercase'
                  }}>
                    {category.categoryId || 'N/A'}
                  </Box>
                </Tooltip>
              </Box>
              {level === 0 && (
                 <Typography sx={{ fontSize: '10px', color: '#718096', display: { xs: 'none', sm: 'block' } }}>
                   Root Category
                 </Typography>
              )}
            </Box>
            
            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton 
                size="small" 
                onClick={(e) => { e.stopPropagation(); onEdit(category); }}
                sx={{ 
                  color: '#0F52FF', 
                  p: { xs: 0.5, sm: 1 },
                  bgcolor: 'rgba(15, 82, 255, 0.05)', 
                  '&:hover': { bgcolor: 'rgba(15, 82, 255, 0.1)' } 
                }}
              >
                <Edit sx={{ fontSize: { xs: 14, sm: 16 } }} />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={(e) => { e.stopPropagation(); onDelete(category._id); }}
                sx={{ 
                  color: '#f56565', 
                  p: { xs: 0.5, sm: 1 },
                  bgcolor: 'rgba(245, 101, 101, 0.05)', 
                  '&:hover': { bgcolor: 'rgba(245, 101, 101, 0.1)' } 
                }}
              >
                <Delete sx={{ fontSize: { xs: 14, sm: 16 } }} />
              </IconButton>
            </Box>

            <ChevronRight sx={{ color: '#cbd5e0', fontSize: 18, display: { xs: 'none', sm: 'block' } }} />
          </Box>
          
          <CategoryTree 
            categories={categories} 
            parentId={category._id} 
            level={level + 1} 
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CategoryTree;
