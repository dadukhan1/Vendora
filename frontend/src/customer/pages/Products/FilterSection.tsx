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

const FilterSection = () => {
  const [expandColors, setExpandColors] = useState(false);

  const handleExpandColors = () => {
    setExpandColors(() => !expandColors);
  };

  return (
    <div className='-z-50 space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
        <p className='text-lg font-semibold'>Filters</p>
        <Button>Clear all</Button>
      </div>
      <Divider />
      <div className='px-9 space-y-6 mt-5'>
        <section>
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "teal",
              }}
            >
              Colors
            </FormLabel>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='female'
                name='radio-buttons-group'
              >
                {colors
                  .slice(0, expandColors ? colors.length : 5)
                  .map((item: any) => (
                    <FormControlLabel
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
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
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "teal",
              }}
            >
              Price
            </FormLabel>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='female'
                name='radio-buttons-group'
              >
                {price.map((item: any) => (
                  <FormControlLabel
                    value={item.value}
                    control={<Radio />}
                    label={item.name}
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
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "teal",
              }}
            >
              Discount
            </FormLabel>
            <FormControl>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='female'
                name='radio-buttons-group'
              >
                {price.map((item: any) => (
                  <FormControlLabel
                    value={item.value}
                    control={<Radio />}
                    label={item.name}
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
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
