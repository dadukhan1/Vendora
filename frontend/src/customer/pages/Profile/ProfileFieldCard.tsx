/** @format */
import { TextField } from "@mui/material";

const ProfileFieldCard = ({ keys, value, isEditing, onChange, name }) => {
  return (
    <div className='p-5 flex items-center rounded-lg bg-[#F8FAFC] border border-slate-100'>
      <p className='w-20 lg:w-36 text-slate-500 text-sm font-medium'>{keys}</p>
      
      {isEditing ? (
        <TextField
          fullWidth
          size="small"
          name={name}
          value={value}
          onChange={onChange}
          variant="standard"
          sx={{ 
            '& .MuiInput-underline:before': { borderBottomColor: '#CBD5E1' },
            '& .MuiInput-underline:after': { borderBottomColor: '#1E293B' },
            input: { fontWeight: 600, color: '#1E293B' }
          }}
        />
      ) : (
        <p className='pl-4 lg:pl-10 font-semibold lg:text-lg text-slate-800'>
          {value || "N/A"}
        </p>
      )}
    </div>
  );
};

export default ProfileFieldCard;