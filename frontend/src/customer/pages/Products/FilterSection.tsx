/** @format */

import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { colors } from "../../../data/filters/colors.ts";
import { useState } from "react";
import { price } from "../../../data/filters/prices.ts";
import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "../../../Redux Toolkit/store";

type FilterSectionProps = {
  selectedColor: string;
  selectedPrice: string;
  selectedDiscount: string;
  onColorChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onDiscountChange: (value: string) => void;
  onClearAll: () => void;
};

const FilterSection = ({
  selectedColor,
  selectedPrice,
  selectedDiscount,
  onColorChange,
  onPriceChange,
  onDiscountChange,
  onClearAll,
}: FilterSectionProps) => {
  const [expandColors, setExpandColors] = useState(false);

  const handleExpandColors = () => {
    setExpandColors(() => !expandColors);
  };

  const discountOptions = [
    { label: "Any", value: "" },
    { label: "10%+", value: "10" },
    { label: "20%+", value: "20" },
    { label: "30%+", value: "30" },
    { label: "40%+", value: "40" },
    { label: "50%+", value: "50" },
  ];

  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { categories } = useAppSelector((state) => state.category);

  // Derive categories for the sidebar
  const currentCat = categories.find((c: any) => c.categoryId === categoryId);
  let level1Parent: any = null;
  let level2Context: any = null;

  if (currentCat) {
    if (currentCat.level === 1) {
      level1Parent = currentCat;
    } else if (currentCat.level === 2) {
      const pId = typeof currentCat.parentCategory === 'object' ? (currentCat.parentCategory as any)?._id : currentCat.parentCategory;
      level1Parent = categories.find((c: any) => c._id === pId);
      level2Context = currentCat;
    } else if (currentCat.level === 3) {
      const l2Id = typeof currentCat.parentCategory === 'object' ? (currentCat.parentCategory as any)?._id : currentCat.parentCategory;
      level2Context = categories.find((c: any) => c._id === l2Id);
      const l1Id = typeof level2Context?.parentCategory === 'object' ? (level2Context.parentCategory as any)?._id : level2Context?.parentCategory;
      level1Parent = categories.find((c: any) => c._id === l1Id);
    }
  }

  // Helper to get children of a category
  const getChildren = (parentId: string, level: number) => {
    return categories.filter((c: any) => {
      if (c.isActive === false || c.level !== level) return false;
      const pId = typeof c.parentCategory === 'object' ? c.parentCategory._id : c.parentCategory;
      return pId === parentId;
    });
  };

  const level1Categories = categories.filter((c: any) => c.level === 1 && c.isActive !== false);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string, currentlyExpanded: boolean) => {
    setExpandedCats(prev => ({ ...prev, [id]: !currentlyExpanded }));
  };

  return (
    <div className="space-y-6 bg-white rounded-2xl border border-[#f0ece6] shadow-[0_4px_24px_rgba(0,0,0,0.02)] font-['Outfit'] overflow-hidden">
      <div className='flex items-center justify-between h-[56px] px-8 bg-[#fafaf8] border-b border-[#f0ece6]'>
        <p className='text-[13px] font-[800] tracking-[0.2em] uppercase text-[#0a0a0a]'>Filters</p>
        <button
          onClick={onClearAll}
          className='text-[12px] font-[700] text-[#c9993a] hover:text-[#0a0a0a] transition-colors uppercase tracking-widest'
        >
          Clear all
        </button>
      </div>
      <div className='px-8 pb-8 space-y-7'>
        <section>
          {/* Categories Sidebar Selection (Accordion Style) */}
          {level1Categories.length > 0 && (
            <>
              <FormControl sx={{ zIndex: 0, width: "100%" }}>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    fontFamily: "Outfit, sans-serif",
                    mb: 2,
                  }}
                >
                  Categories
                </FormLabel>
                
                <div className="flex flex-col gap-1">
                  {level1Categories.map((l1: any) => {
                    // Default to true if active path, but allow local state to override it completely.
                    const isL1ActivePath = level1Parent?.categoryId === l1.categoryId || categoryId === l1.categoryId;
                    const isL1Expanded = expandedCats[l1.categoryId] ?? isL1ActivePath;
                    const l2Children = getChildren(l1._id, 2);

                    return (
                      <div key={l1._id} className="flex flex-col">
                        <button
                          onClick={() => l2Children.length > 0 ? toggleExpand(l1.categoryId, isL1Expanded) : navigate(`/products/${l1.categoryId}`)}
                          className={`flex justify-between items-center text-left px-3 py-2 rounded-lg text-[14px] font-[600] transition-colors
                            ${isL1ActivePath ? 'bg-[rgba(201,153,58,0.1)] text-[#c9993a] font-[700]' : 'text-[#5d5d5d] hover:bg-[#fafaf8] hover:text-[#0a0a0a]'}`}
                        >
                          {l1.name}
                          {l2Children.length > 0 && (
                            <span className="text-[16px] font-[400] leading-none transition-transform duration-300" style={{ transform: isL1Expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                              {isL1Expanded ? '−' : '+'}
                            </span>
                          )}
                        </button>

                        {l2Children.length > 0 && (
                          <div 
                            className={`grid transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] 
                              ${isL1Expanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                          >
                            <div className="overflow-hidden">
                              <div className="flex flex-col ml-3 pl-3 border-l-2 border-[#f0ece6] space-y-1 py-1">
                                <button
                                  onClick={() => navigate(`/products/${l1.categoryId}`)}
                                  className={`text-left px-3 py-1.5 rounded-lg text-[13px] font-[500] transition-colors
                                    ${categoryId === l1.categoryId ? 'text-[#c9993a] font-[700]' : 'text-[#9ca3af] hover:text-[#0a0a0a]'}`}
                                >
                                  All {l1.name}
                                </button>
                                {l2Children.map((l2: any) => {
                                  const isL2ActivePath = level2Context?.categoryId === l2.categoryId || categoryId === l2.categoryId;
                                  const isL2Expanded = expandedCats[l2.categoryId] ?? isL2ActivePath;
                                  const l3Children = getChildren(l2._id, 3);
                                  
                                  return (
                                    <div key={l2._id} className="flex flex-col">
                                      <button
                                        onClick={() => l3Children.length > 0 ? toggleExpand(l2.categoryId, isL2Expanded) : navigate(`/products/${l2.categoryId}`)}
                                        className={`flex justify-between items-center text-left px-3 py-1.5 rounded-lg text-[13px] font-[500] transition-colors
                                          ${isL2ActivePath ? 'text-[#c9993a] font-[700]' : 'text-[#9ca3af] hover:text-[#0a0a0a]'}`}
                                      >
                                        {l2.name}
                                        {l3Children.length > 0 && (
                                          <span className="text-[14px] font-[400] leading-none transition-transform duration-300" style={{ transform: isL2Expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                            {isL2Expanded ? '−' : '+'}
                                          </span>
                                        )}
                                      </button>
                                      
                                      {l3Children.length > 0 && (
                                        <div 
                                          className={`grid transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] 
                                            ${isL2Expanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                                        >
                                          <div className="overflow-hidden">
                                            <div className="flex flex-col ml-3 pl-3 border-l-2 border-[#f0ece6] space-y-1 py-1">
                                              <button
                                                onClick={() => navigate(`/products/${l2.categoryId}`)}
                                                className={`text-left px-3 py-1 rounded-lg text-[12px] font-[500] transition-colors
                                                  ${categoryId === l2.categoryId ? 'text-[#c9993a] font-[700]' : 'text-[#9ca3af] hover:text-[#0a0a0a]'}`}
                                              >
                                                All {l2.name}
                                              </button>
                                              {l3Children.map((l3: any) => (
                                                <button
                                                  key={l3._id}
                                                  onClick={() => navigate(`/products/${l3.categoryId}`)}
                                                  className={`text-left px-3 py-1 rounded-lg text-[12px] font-[500] transition-colors
                                                    ${categoryId === l3.categoryId ? 'text-[#c9993a] font-[700]' : 'text-[#9ca3af] hover:text-[#0a0a0a]'}`}
                                                >
                                                  {l3.name}
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </FormControl>
              <Divider sx={{ my: 4, borderColor: "#f0ece6", borderStyle: "dashed" }} />
            </>
          )}

          <FormControl sx={{ zIndex: 0, width: "100%" }}>
            <FormLabel
              sx={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontFamily: "Outfit, sans-serif",
                mb: 1.5,
              }}
            >
              Colors
            </FormLabel>
            <FormControl>
              <RadioGroup
                value={selectedColor}
                onChange={(e) => onColorChange(e.target.value)}
                sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
              >
                <FormControlLabel 
                  value='' 
                  control={<Radio size='small' sx={{ color: "#d1d5db", "&.Mui-checked": { color: "#c9993a" } }} />} 
                  label={<span className="text-[14px] font-[600] text-[#5d5d5d] hover:text-[#0a0a0a] transition-colors">Any</span>} 
                />
                {colors
                  .slice(0, expandColors ? colors.length : 5)
                  .map((item: any, idx: number) => (
                    <FormControlLabel
                      key={idx}
                      value={item.name}
                      control={<Radio size='small' sx={{ color: "#d1d5db", "&.Mui-checked": { color: "#c9993a" } }} />}
                      label={<span className="text-[14px] font-[600] text-[#5d5d5d] hover:text-[#0a0a0a] transition-colors">{item.name}</span>}
                      sx={{ marginLeft: 0 }}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
            <div className="pt-2">
              <button 
                onClick={handleExpandColors}
                className="text-[12px] font-[800] text-[#c9993a] uppercase tracking-wider hover:text-[#0a0a0a] transition-colors"
              >
                {expandColors ? "- Hide" : `+ ${colors.length - 5} More`}
              </button>
            </div>
          </FormControl>
          
          <Divider sx={{ my: 4, borderColor: "#f0ece6", borderStyle: "dashed" }} />
          
          <FormControl sx={{ zIndex: 0, width: "100%" }}>
            <FormLabel
              sx={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontFamily: "Outfit, sans-serif",
                mb: 1.5,
              }}
            >
              Price Range
            </FormLabel>
            <FormControl>
              <RadioGroup
                value={selectedPrice}
                onChange={(e) => onPriceChange(e.target.value)}
                sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
              >
                <FormControlLabel 
                  value='' 
                  control={<Radio size='small' sx={{ color: "#d1d5db", "&.Mui-checked": { color: "#c9993a" } }} />} 
                  label={<span className="text-[14px] font-[600] text-[#5d5d5d] hover:text-[#0a0a0a] transition-colors">Any Price</span>} 
                />
                {price.map((item: any, idx: number) => (
                  <FormControlLabel
                    key={idx}
                    value={item.value}
                    control={<Radio size='small' sx={{ color: "#d1d5db", "&.Mui-checked": { color: "#c9993a" } }} />}
                    label={<span className="text-[14px] font-[600] text-[#5d5d5d] hover:text-[#0a0a0a] transition-colors">{item.name}</span>}
                    sx={{ marginLeft: 0 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </FormControl>
          
          <Divider sx={{ my: 4, borderColor: "#f0ece6", borderStyle: "dashed" }} />
          
          <FormControl sx={{ zIndex: 0, width: "100%" }}>
            <FormLabel
              sx={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontFamily: "Outfit, sans-serif",
                mb: 1.5,
              }}
            >
              Discount
            </FormLabel>
            <FormControl>
              <RadioGroup
                value={selectedDiscount}
                onChange={(e) => onDiscountChange(e.target.value)}
                sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
              >
                {discountOptions
                  .filter((opt) => opt.value !== undefined)
                  .map((opt, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={opt.value}
                      control={<Radio size='small' sx={{ color: "#d1d5db", "&.Mui-checked": { color: "#c9993a" } }} />}
                      label={<span className="text-[14px] font-[600] text-[#5d5d5d] hover:text-[#0a0a0a] transition-colors">{opt.label}</span>}
                      sx={{ marginLeft: 0 }}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
