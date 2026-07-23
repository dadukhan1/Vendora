/** @format */

import { Radio } from "@mui/material";

const AddressCard = ({ address, selectedValue, handleChange }: any) => {
  const isSelected = selectedValue === address?._id;

  return (
    <div
      className={`flex gap-3 p-4 rounded-xl border transition-all duration-150 cursor-pointer
        ${
          isSelected
            ? "border-[#F59E0B] bg-[#F59E0B]/5"
            : "border-[#E2E8F0] bg-[#FAFAF9] hover:border-[#94A3B8]"
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
          color: "#94A3B8",
          "&.Mui-checked": { color: "#F59E0B" },
          padding: "2px",
          alignSelf: "flex-start",
          marginTop: "2px",
        }}
      />
      <div className='space-y-1'>
        <p
          className={`font-semibold text-sm ${isSelected ? "text-[#F59E0B]" : "text-[#1F2937]"}`}
        >
          {address?.name}
        </p>
        <p className='text-sm text-[#64748B] leading-relaxed'>
          {address?.address}
        </p>
        <p className='text-xs text-[#64748B]'>
          <span className='font-semibold text-[#1F2937]'>Mobile: </span>
          {address?.mobile}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
