/** @format */

import { Radio } from "@mui/material";

const GOLD = "#c9993a";
const DARK = "#0a0a0a";

const AddressCard = ({ address, selectedValue, handleChange }: any) => {
  const isSelected = selectedValue === address?._id;

  return (
    <div
      className={`flex gap-3 p-5 rounded-2xl border transition-all duration-300 cursor-pointer font-['Outfit']
        ${
          isSelected
            ? "border-[#c9993a] bg-[rgba(201,153,58,0.04)] shadow-[0_4px_16px_rgba(201,153,58,0.12)] -translate-y-0.5"
            : "border-[#f0ece6] bg-[#fafaf8] hover:border-[#d1d5db] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-0.5"
        }`}
      onClick={() => handleChange({ target: { value: address?._id } })}
    >
      <Radio
        checked={isSelected}
        value={address?._id}
        onChange={handleChange}
        name='radio-buttons'
        size='small'
        sx={{
          color: "#9ca3af",
          "&.Mui-checked": { color: GOLD },
          padding: "2px",
          alignSelf: "flex-start",
          marginTop: "2px",
        }}
      />
      <div className='space-y-1.5'>
        <p
          className={`font-bold text-[15px] tracking-wide ${isSelected ? "text-[#c9993a]" : "text-[#0a0a0a]"}`}
        >
          {address?.name}
        </p>
        <p className='text-[14px] text-[#5d5d5d] leading-relaxed font-medium'>
          {address?.address}, {address?.locality} <br/>
          {address?.city}, {address?.state} {address?.pinCode}
        </p>
        <p className='text-[13px] text-[#9ca3af] font-medium pt-1'>
          <span className='font-bold text-[#5d5d5d]'>PHONE: </span>
          {address?.mobile}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
