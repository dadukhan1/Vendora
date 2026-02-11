/** @format */

import { Radio } from "@mui/material";
import React from "react";

const AddressCard = ({ value, selectedValue, handleChange }: any) => {
  return (
    <div className='p-5 border border-gray-300 rounded-md flex'>
      <div>
        <Radio
          checked={selectedValue == value}
          value={value}
          onChange={handleChange}
          name='radio-buttons'
        />
      </div>
      <div className='space-y-3 pt-3'>
        <h1 className=''>{"Rana G"}</h1>
        <p>{"Dummy Address"}</p>
        <p>
          <strong>Mobile: </strong> 3456789
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
