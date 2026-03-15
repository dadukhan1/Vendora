/** @format */
import { TextField } from "@mui/material";
import { Person, Email, Phone, Edit, Check, Close } from "@mui/icons-material";
import { useState } from "react";
import { useAppSelector } from "../../../Redux Toolkit/store";

const keyIconMap: Record<string, React.ReactNode> = {
  Name:   <Person sx={{ fontSize: 18, color: "#0F52FF" }} />,
  Email:  <Email  sx={{ fontSize: 18, color: "#0F52FF" }} />,
  Mobile: <Phone  sx={{ fontSize: 18, color: "#0F52FF" }} />,
};

const UserDetails = () => {
  const { user } = useAppSelector((store) => store.user);

  const fields = [
    { key: "Name",   name: "fullName", value: user?.fullName || "" },
    { key: "Email",  name: "email",    value: user?.email    || "" },
    { key: "Mobile", name: "mobile",   value: user?.mobile   || "" },
  ];

  const initialForm = Object.fromEntries(fields.map((f) => [f.name, f.value]));
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm]           = useState(initialForm);
  const [saved, setSaved]         = useState(initialForm);

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
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Card header */}
      <div
        style={{
          padding: "22px 28px",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isEditing ? "rgba(15,82,255,0.03)" : "#fff",
          transition: "background 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Avatar initials */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#0F52FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 17,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {saved.fullName
              ?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "?"}
          </div>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}>
              Personal Information
            </h2>
            <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 3 }}>
              {isEditing ? "Make changes below and save" : "Your account details"}
            </p>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 20px",
              borderRadius: 99,
              border: "1px solid rgba(15,82,255,0.25)",
              background: "rgba(15,82,255,0.05)",
              color: "#0F52FF",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(15,82,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(15,82,255,0.05)")}
          >
            <Edit sx={{ fontSize: 15 }} /> Edit
          </button>
        )}
      </div>

      {/* View mode */}
      {!isEditing && (
        <div style={{ padding: "6px 0" }}>
          {fields.map((field, i) => (
            <div
              key={field.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "18px 28px",
                borderBottom: i < fields.length - 1 ? "1px solid #F1F5F9" : "none",
              }}
            >
              {/* Icon bubble */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(15,82,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {keyIconMap[field.key]}
              </div>

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#94A3B8",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: 5,
                  }}
                >
                  {field.key}
                </p>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: saved[field.name] ? "#0F172A" : "#94A3B8",
                  }}
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
        <div
          style={{
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {fields.map((field) => (
            <div key={field.key}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#0F52FF",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 10,
                }}
              >
                {keyIconMap[field.key]}
                {field.key}
              </label>

              <TextField
                fullWidth
                size="small"
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={`Enter your ${field.key.toLowerCase()}`}
                variant="outlined"
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              paddingTop: 20,
              borderTop: "1px solid #E2E8F0",
              marginTop: 4,
            }}
          >
            <button
              onClick={handleCancel}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 22px",
                borderRadius: 99,
                border: "1px solid #E2E8F0",
                background: "#fff",
                color: "#64748B",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Close sx={{ fontSize: 15 }} /> Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 24px",
                borderRadius: 99,
                border: "none",
                background: "#0F52FF",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0040cc")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0F52FF")}
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