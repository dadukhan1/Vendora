/** @format */
import { TextField } from "@mui/material";
import { Person, Email, Phone, Edit, Check, Close } from "@mui/icons-material";
import { useState } from "react";
import { useAppSelector } from "../../../Redux Toolkit/store";

const keyIconMap: Record<string, React.ReactNode> = {
  Name: <Person sx={{ fontSize: 18, color: "#0F52FF" }} />,
  Email: <Email sx={{ fontSize: 18, color: "#0F52FF" }} />,
  Mobile: <Phone sx={{ fontSize: 18, color: "#0F52FF" }} />,
};

const UserDetails = () => {
  const { user } = useAppSelector((store) => store.user);

  const fields = [
    { key: "Name", name: "fullName", value: user?.fullName || "" },
    { key: "Email", name: "email", value: user?.email || "" },
    { key: "Mobile", name: "mobile", value: user?.mobile || "" },
  ];

  const initialForm = Object.fromEntries(fields.map((f) => [f.name, f.value]));
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setSaved(form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm(saved);
    setIsEditing(false);
  };

  return (
    <div className='bg-white border border-slate-200 rounded-2xl overflow-hidden'>
      {/* Card header */}
      <div
        className={[
          "px-7 py-[22px] border-b border-slate-200 flex items-center justify-between transition-colors duration-200",
          isEditing ? "bg-blue-600/[0.03]" : "bg-white",
        ].join(" ")}
      >
        <div className='flex items-center gap-3.5'>
          {/* Avatar initials */}
          <div className='w-[50px] h-[50px] rounded-full bg-blue-600 flex items-center justify-center text-white text-[17px] font-bold shrink-0'>
            {saved.fullName
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "?"}
          </div>

          <div>
            <h2 className='text-[17px] font-bold text-slate-900'>
              Personal Information
            </h2>
            <p className='text-[13px] text-slate-400 mt-[3px]'>
              {isEditing
                ? "Make changes below and save"
                : "Your account details"}
            </p>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className='flex items-center gap-[7px] px-5 py-[9px] rounded-full border border-blue-600/25 bg-blue-600/5 hover:bg-blue-600/10 text-blue-600 text-[13px] font-semibold cursor-pointer transition-colors duration-150'
          >
            <Edit sx={{ fontSize: 15 }} /> Edit
          </button>
        )}
      </div>

      {/* View mode */}
      {!isEditing && (
        <div className='py-1.5'>
          {fields.map((field, i) => (
            <div
              key={field.key}
              className={[
                "flex items-center gap-[18px] px-7 py-[18px]",
                i < fields.length - 1 ? "border-b border-slate-100" : "",
              ].join(" ")}
            >
              {/* Icon bubble */}
              <div className='w-11 h-11 rounded-xl bg-blue-600/[0.07] flex items-center justify-center shrink-0'>
                {keyIconMap[field.key]}
              </div>

              <div className='flex-1'>
                <p className='text-xs font-semibold text-slate-400 uppercase tracking-[0.07em] mb-[5px]'>
                  {field.key}
                </p>
                <p
                  className={`text-[15px] font-semibold ${saved[field.name] ? "text-slate-900" : "text-slate-400"}`}
                >
                  {saved[field.name] || "Not set"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit mode */}
      {isEditing && (
        <div className='px-7 py-6 flex flex-col gap-[22px]'>
          {fields.map((field) => (
            <div key={field.key}>
              <label className='flex items-center gap-[7px] text-xs font-bold text-blue-600 uppercase tracking-[0.08em] mb-2.5'>
                {keyIconMap[field.key]}
                {field.key}
              </label>

              <TextField
                fullWidth
                size='small'
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={`Enter your ${field.key.toLowerCase()}`}
                variant='outlined'
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#0F172A",
                    background: "#F8FAFC",
                    "& fieldset": { borderColor: "#E2E8F0" },
                    "&:hover fieldset": { borderColor: "#0F52FF" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0F52FF",
                      borderWidth: "1.5px",
                    },
                  },
                  input: {
                    padding: "13px 16px",
                    fontWeight: 600,
                    color: "#0F172A",
                    fontSize: 15,
                  },
                }}
              />
            </div>
          ))}

          {/* Bottom save bar */}
          <div className='flex justify-end gap-2.5 pt-5 border-t border-slate-200 mt-1'>
            <button
              onClick={handleCancel}
              className='flex items-center gap-1.5 px-[22px] py-2.5 rounded-full border border-slate-200 bg-white text-slate-500 text-sm font-semibold cursor-pointer hover:bg-slate-50 transition-colors duration-150'
            >
              <Close sx={{ fontSize: 15 }} /> Cancel
            </button>
            <button
              onClick={handleSave}
              className='flex items-center gap-1.5 px-6 py-2.5 rounded-full border-none bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold cursor-pointer transition-colors duration-150'
            >
              <Check sx={{ fontSize: 15 }} /> Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;