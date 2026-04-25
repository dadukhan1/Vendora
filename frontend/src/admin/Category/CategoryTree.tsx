import React from "react";
import { type Category, toggleCategoryStatus } from "../../Redux Toolkit/features/category/categorySlice.ts";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { 
  SubdirectoryArrowRight, 
  Edit, 
  Delete, 
  Visibility, 
  VisibilityOff, 
  SwapVert,
  FolderOpen
} from "@mui/icons-material";
import { Box, Typography, Avatar, Tooltip, IconButton, Chip } from "@mui/material";
import toast from "react-hot-toast";

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
  const dispatch = useAppDispatch();
  const children = categories.filter((cat) => {
    let catParentId: string | null = null;
    if (typeof cat.parentCategory === 'object' && cat.parentCategory !== null) {
      catParentId = (cat.parentCategory as { _id: string })._id;
    } else {
      catParentId = cat.parentCategory as string | null;
    }
    return catParentId === parentId;
  });

  if (children.length === 0 || level > 5) return null;

  const handleToggleActive = async (category: Category) => {
    const newStatus = !category.isActive;
    const result = await dispatch(toggleCategoryStatus({ id: category._id, active: newStatus }));
    if (toggleCategoryStatus.fulfilled.match(result)) {
      toast.success(`Category ${newStatus ? 'activated' : 'deactivated'}`);
    } else {
      toast.error("Status update failed");
    }
  };

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
              opacity: category.isActive ? 1 : 0.6,
              filter: category.isActive ? 'none' : 'grayscale(1)',
              '&:hover': { 
                bgcolor: level === 0 ? '#f7fafc' : 'rgba(15, 82, 255, 0.04)',
                transform: 'translateX(4px)',
                cursor: 'pointer',
                opacity: 1,
                filter: 'none'
              }
            }}
          >
            {/* Level Icon */}
            <Box sx={{ color: '#a0aec0', display: 'flex', alignItems: 'center' }}>
              {level === 0 ? (
                <FolderOpen sx={{ fontSize: { xs: 18, sm: 20 }, color: '#0F52FF' }} />
              ) : (
                <SubdirectoryArrowRight sx={{ fontSize: { xs: 14, sm: 16 } }} />
              )}
            </Box>
            
            {/* Category Image */}
            <Avatar 
              src={category.image} 
              variant="rounded"
              sx={{ 
                width: { xs: 28, sm: 32 }, 
                height: { xs: 28, sm: 32 }, 
                bgcolor: '#edf2f7',
                border: '1px solid #e2e8f0'
              }}
            >
              {category.name?.charAt(0)}
            </Avatar>
            
            {/* Name and Order */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography 
                  noWrap
                  sx={{ 
                    fontSize: { xs: '0.85rem', sm: level === 0 ? '0.95rem' : '0.85rem' }, 
                    fontWeight: level === 0 ? 800 : 600,
                    color: '#2d3748'
                  }}
                >
                  {category.name}
                </Typography>

                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {!category.isActive && (
                    <Chip 
                      label="Inactive" 
                      size="small" 
                      color="error" 
                      variant="outlined"
                      sx={{ fontSize: '8px', height: '16px', fontWeight: 900, textTransform: 'uppercase' }} 
                    />
                  )}
                  {category.order > 0 && (
                     <Chip 
                        icon={<SwapVert sx={{ fontSize: '10px !important' }} />}
                        label={`Order: ${category.order}`} 
                        size="small"
                        sx={{ fontSize: '8px', height: '16px', fontWeight: 700, bgcolor: '#f1f5f9' }} 
                     />
                  )}
                </Box>
              </Box>
              <Typography sx={{ fontSize: '9px', fontWeight: 700, color: '#a0aec0', textTransform: 'uppercase' }}>
                ID: {category.categoryId}
              </Typography>
            </Box>
            
            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title={category.isActive ? "Deactivate" : "Activate"}>
                <IconButton 
                  size="small" 
                  onClick={(e) => { e.stopPropagation(); handleToggleActive(category); }}
                  sx={{ 
                    color: category.isActive ? '#38a169' : '#e53e3e',
                    bgcolor: category.isActive ? 'rgba(56, 161, 105, 0.05)' : 'rgba(229, 62, 62, 0.05)',
                    '&:hover': { bgcolor: category.isActive ? 'rgba(56, 161, 105, 0.1)' : 'rgba(229, 62, 62, 0.1)' } 
                  }}
                >
                  {category.isActive ? <Visibility sx={{ fontSize: 16 }} /> : <VisibilityOff sx={{ fontSize: 16 }} />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Edit">
                <IconButton 
                  size="small" 
                  onClick={(e) => { e.stopPropagation(); onEdit(category); }}
                  sx={{ color: '#0F52FF', bgcolor: 'rgba(15, 82, 255, 0.05)' }}
                >
                  <Edit sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Delete">
                <IconButton 
                  size="small" 
                  onClick={(e) => { e.stopPropagation(); onDelete(category._id); }}
                  sx={{ color: '#f56565', bgcolor: 'rgba(245, 101, 101, 0.05)' }}
                >
                  <Delete sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
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
