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
import { Person, Email, Phone, Edit, Check, Close } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import { updateProfile } from "../../../Redux Toolkit/features/customer/userSlice";

const keyIconMap: Record<string, React.ReactNode> = {
  Name: <Person sx={{ fontSize: 20, color: "#0F52FF" }} />,
  Email: <Email sx={{ fontSize: 20, color: "#0F52FF" }} />,
  Mobile: <Phone sx={{ fontSize: 20, color: "#0F52FF" }} />,
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
      elevation={2}
      sx={{
        borderRadius: 3,
        background: "linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%)",
        border: "1px solid #e8eef7",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Left Section: Avatar + Text */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {/* Avatar */}
          <Avatar
            sx={{
              width: 60,
              height: 60,
              background: "#0F52FF",
              fontSize: "1.3rem",
              fontWeight: "bold",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(15, 82, 255, 0.2)",
            }}
          >
            {initials}
          </Avatar>

          {/* Title Section */}
          <Box>
            <Box
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0f172a",
                mb: 0.25,
              }}
            >
              Personal Information
            </Box>
            <Box sx={{ fontSize: "0.8rem", color: "#64748b" }}>
              {isEditing ? "Editing Profile" : "Your account details"}
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
              borderRadius: 2,
              background: "#0F52FF",
              boxShadow: "0 2px 8px rgba(15, 82, 255, 0.2)",
              px: 2,
              py: 1,
              fontSize: "0.875rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              "&:hover": {
                background: "#0040cc",
                boxShadow: "0 4px 12px rgba(15, 82, 255, 0.3)",
              },
            }}
          >
            Edit
          </Button>
        )}
      </Box>

      <Divider sx={{ opacity: 0.5 }} />

      <CardContent sx={{ p: 0 }}>
        {/* View Mode */}
        {!isEditing && (
          <Box>
            {fields.map((field, fieldIndex) => (
              <Box
                key={field.key}
                sx={{
                  px: 3,
                  py: 2.5,
                  display: "flex",
                  gap: 2.5,
                  alignItems: "flex-start",
                  borderBottom:
                    fieldIndex < fields.length - 1
                      ? "1px solid #e2e8f0"
                      : "none",
                  transition: "background 0.2s",
                  background: "#fff",
                  "&:hover": {
                    background: "#fafbff",
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {keyIconMap[field.key]}
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#94a3b8",
                      letterSpacing: 0.8,
                      mb: 0.75,
                      textTransform: "uppercase",
                    }}
                  >
                    {field.key}
                  </Box>
                  <Box
                    sx={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: saved[field.name] ? "#0f172a" : "#cbd5e1",
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
          <Box sx={{ p: 3 }}>
            <Stack spacing={2.5}>
              {fields.map((field) => (
                <Box key={field.key}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.2,
                      color: "#0F52FF",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
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
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        color: "#0f172a",
                        background: "#f8fafc",
                        transition: "all 0.3s ease",
                        "& fieldset": {
                          borderColor: "#e2e8f0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#cbd5e1",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0F52FF",
                          borderWidth: "2px",
                        },
                        "&.Mui-focused": {
                          background: "#f0f4ff",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: "11px 13px",
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
                mt: 4,
                pt: 3,
                borderTop: "1px solid #e2e8f0",
              }}
            >
              <Button
                variant='outlined'
                startIcon={<Close sx={{ fontSize: 16 }} />}
                onClick={handleCancel}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  borderColor: "#e2e8f0",
                  color: "#64748b",
                  "&:hover": {
                    borderColor: "#cbd5e1",
                    background: "#f8fafc",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                startIcon={<Check sx={{ fontSize: 16 }} />}
                onClick={handleSave}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  background: "#0F52FF",
                  boxShadow: "0 4px 12px rgba(15, 82, 255, 0.3)",
                  "&:hover": {
                    background: "#0040cc",
                    boxShadow: "0 6px 16px rgba(15, 82, 255, 0.4)",
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDetails;
