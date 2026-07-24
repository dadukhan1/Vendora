/** @format */

import {
  TextField,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";
import { Person, Email, Phone, Edit } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { updateProfile } from "../../../Redux Toolkit/features/customer/userSlice";

const GOLD = "#c9993a";
const DARK = "#0a0a0a";

const keyIconMap: Record<string, React.ReactNode> = {
  Name: <Person sx={{ fontSize: 20, color: GOLD }} />,
  Email: <Email sx={{ fontSize: 20, color: GOLD }} />,
  Mobile: <Phone sx={{ fontSize: 20, color: GOLD }} />,
};

interface Field {
  key: string;
  name: string;
  value: string;
}

const UserDetails = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);

  const fields: Field[] = [
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

  const handleSave = async () => {
    setSaved(form);
    setIsEditing(false);
    handleUpdateProfile(form);
  };

  const handleUpdateProfile = async (data: any) => {
    await dispatch(updateProfile(data));
  };

  const handleCancel = () => {
    setForm(saved);
    setIsEditing(false);
  };

  const initials =
    saved.fullName
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "24px",
        background: "white",
        border: "1px solid #f0ece6",
        boxShadow: "0 4px 40px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          px: 4,
          py: 3.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Left Section: Avatar + Text */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
          {/* Avatar */}
          <Avatar
            sx={{
              width: 72,
              height: 72,
              background: DARK,
              color: GOLD,
              fontSize: "1.5rem",
              fontWeight: 800,
              flexShrink: 0,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {initials}
          </Avatar>

          {/* Title Section */}
          <Box>
            <Box
              sx={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: DARK,
                mb: 0.5,
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Personal Information
            </Box>
            <Box sx={{ fontSize: "0.9rem", color: "#9ca3af", fontWeight: 500 }}>
              {isEditing ? "Update your details below." : "Manage your account details and preferences."}
            </Box>
          </Box>
        </Box>

        {/* Right Section: Edit Button */}
        {!isEditing && (
          <Button
            variant='contained'
            startIcon={<Edit sx={{ fontSize: 16 }} />}
            onClick={() => setIsEditing(true)}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #d4a348 0%, #c9993a 100%)",
              color: "white",
              px: 3,
              py: 1.25,
              fontSize: "0.85rem",
              fontWeight: 700,
              fontFamily: "Outfit, sans-serif",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(201, 153, 58, 0.3)",
              "&:hover": {
                opacity: 0.95,
                boxShadow: "0 4px 16px rgba(201, 153, 58, 0.4)",
              },
            }}
          >
            Edit Profile
          </Button>
        )}
      </Box>

      <Divider sx={{ borderColor: "#f0ece6" }} />

      <CardContent sx={{ p: 0 }}>
        {/* View Mode */}
        {!isEditing && (
          <Box>
            {fields.map((field, fieldIndex) => (
              <Box
                key={field.key}
                sx={{
                  px: 4,
                  py: 3,
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  borderBottom:
                    fieldIndex < fields.length - 1
                      ? "1px solid #f0ece6"
                      : "none",
                  transition: "background 0.2s ease",
                  background: "#fff",
                  "&:hover": {
                    background: "#fafaf8",
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #fffcf5 0%, #fff6e5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid #fde6b3",
                    boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)",
                  }}
                >
                  {keyIconMap[field.key]}
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#9ca3af",
                      letterSpacing: 1,
                      mb: 0.5,
                      textTransform: "uppercase",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {field.key}
                  </Box>
                  <Box
                    sx={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: saved[field.name] ? DARK : "#d1d5db",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {saved[field.name] || "Not set"}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <Box sx={{ p: 4 }}>
            <Stack spacing={3}>
              {fields.map((field) => (
                <Box key={field.key}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 1.5,
                      color: DARK,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {keyIconMap[field.key]}
                    {field.key}
                  </Box>
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
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        color: DARK,
                        fontFamily: "Outfit, sans-serif",
                        background: "#fafaf8",
                        transition: "all 0.2s ease",
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "#e5e7eb",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: GOLD,
                          borderWidth: "2px",
                        },
                        "&.Mui-focused": {
                          background: "#fff",
                          boxShadow: "0 4px 20px rgba(201,153,58,0.1)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: "12px 14px",
                        fontWeight: 500,
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>

            {/* Action Buttons */}
            <Box
               sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 5,
                pt: 4,
                borderTop: "1px solid #f0ece6",
              }}
            >
              <Button
                variant='outlined'
                onClick={handleCancel}
                sx={{
                  textTransform: "none",
                  borderRadius: "12px",
                  borderColor: "#e5e7eb",
                  color: "#5d5d5d",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 600,
                  px: 4,
                  py: 1.25,
                  "&:hover": {
                    borderColor: "#d1d5db",
                    background: "#fafaf8",
                    color: DARK,
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                onClick={handleSave}
                sx={{
                  textTransform: "none",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #d4a348 0%, #c9993a 100%)",
                  color: "white",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 600,
                  px: 4,
                  py: 1.25,
                  boxShadow: "0 4px 12px rgba(201, 153, 58, 0.3)",
                  "&:hover": {
                    opacity: 0.95,
                    boxShadow: "0 4px 16px rgba(201, 153, 58, 0.4)",
                  },
                }}
              >
                Save Details
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDetails;
