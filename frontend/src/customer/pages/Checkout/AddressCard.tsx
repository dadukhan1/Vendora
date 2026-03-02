/** @format */

import { Radio } from "@mui/material";
import React from "react";

const AddressCard = ({ address, selectedValue, handleChange }: any) => {
  return (
    <div className='p-5 border border-gray-300 rounded-md flex'>
      <div>
        <Radio
          checked={selectedValue === address?._id}
          value={address?._id}
          onChange={handleChange}
          name='radio-buttons'
        />
      </div>
      <div className='space-y-3 pt-3'>
        <h1 className=''>{address?.name}</h1>
        <p>{address?.address}</p>
        <p>
          <strong>Mobile: </strong> {address?.mobile}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
