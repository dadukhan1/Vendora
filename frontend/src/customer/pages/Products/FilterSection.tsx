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

  return (
    <div className='space-y-5 bg-white rounded-xl border border-gray-100 shadow-sm'>
      <div className='flex items-center justify-between h-[44px] px-9 bg-gray-50 rounded-t-xl'>
        <p className='text-base font-semibold text-gray-900'>Filters</p>
        <Button
          onClick={onClearAll}
          size='small'
          sx={{
            textTransform: "none",
            fontWeight: 600,
            color: "#0F52FF",
          }}
        >
          Clear all
        </Button>
      </div>
      <Divider />
      <div className='px-9 space-y-6 mt-5'>
        <section>
          <FormControl sx={{ zIndex: 0, paddingTop: 4 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0F52FF",
              }}
            >
              Colors
            </FormLabel>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                value={selectedColor}
                onChange={(e) => onColorChange(e.target.value)}
                sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
              >
                <FormControlLabel value='' control={<Radio />} label='Any' />
                {colors
                  .slice(0, expandColors ? colors.length : 5)
                  .map((item: any) => (
                    <FormControlLabel
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                      sx={{ marginLeft: 0 }}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
            <div>
              <Button onClick={handleExpandColors}>
                {expandColors ? "Hide" : `+${colors.length - 5} Expand`}
              </Button>
            </div>
          </FormControl>
          <Divider />
          <FormControl sx={{ zIndex: 0, paddingTop: 4 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0F52FF",
              }}
            >
              Price
            </FormLabel>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                value={selectedPrice}
                onChange={(e) => onPriceChange(e.target.value)}
                sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
              >
                <FormControlLabel value='' control={<Radio />} label='Any' />
                {price.map((item: any) => (
                  <FormControlLabel
                    value={item.value}
                    control={<Radio />}
                    label={item.name}
                    sx={{ marginLeft: 0 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </FormControl>
          <Divider />
          <FormControl sx={{ zIndex: 0, paddingTop: 4 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0F52FF",
              }}
            >
              Discount
            </FormLabel>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                value={selectedDiscount}
                onChange={(e) => onDiscountChange(e.target.value)}
                sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
              >
                {discountOptions
                  .filter((opt) => opt.value !== undefined)
                  .map((opt) => (
                    <FormControlLabel
                      key={opt.label}
                      value={opt.value}
                      control={<Radio />}
                      label={opt.label}
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
