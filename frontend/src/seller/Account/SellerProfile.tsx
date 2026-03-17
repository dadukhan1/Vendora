/** @format */

import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Divider,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Store,
  Email,
  Phone,
  Edit,
  Check,
  Close,
  LocationOn,
  CreditCard,
  CheckCircle,
  VerifiedUser,
} from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import { updateSellerProfile } from "../../Redux Toolkit/features/seller/sellerSlice";

const keyIconMap: Record<string, React.ReactNode> = {
  "Business Name": <Store sx={{ fontSize: 20, color: "#1976d2" }} />,
  "Business Email": <Email sx={{ fontSize: 20, color: "#1976d2" }} />,
  "Business Mobile": <Phone sx={{ fontSize: 20, color: "#1976d2" }} />,
  "Business Address": <LocationOn sx={{ fontSize: 20, color: "#1976d2" }} />,
  "Seller Name": <VerifiedUser sx={{ fontSize: 20, color: "#1976d2" }} />,
  "Personal Email": <Email sx={{ fontSize: 20, color: "#1976d2" }} />,
  "Mobile Number": <Phone sx={{ fontSize: 20, color: "#1976d2" }} />,
  GSTIN: <CheckCircle sx={{ fontSize: 20, color: "#1976d2" }} />,
  "Account Number": <CreditCard sx={{ fontSize: 20, color: "#1976d2" }} />,
};

interface Field {
  key: string;
  name: string;
  value: string;
  section: string;
}

const SellerProfile = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((store) => store.seller);

  const fields: Field[] = [
    {
      key: "Business Name",
      name: "bussinessName",
      value: profile?.bussinessDetails?.bussinessName || "",
      section: "Business Details",
    },
    {
      key: "Business Email",
      name: "bussinessEmail",
      value: profile?.bussinessDetails?.bussinessEmail || "",
      section: "Business Details",
    },
    {
      key: "Business Mobile",
      name: "bussinessMobile",
      value: profile?.bussinessDetails?.bussinessMobile || "",
      section: "Business Details",
    },
    {
      key: "Business Address",
      name: "bussinessAddress",
      value: profile?.bussinessDetails?.bussinessAddress || "",
      section: "Business Details",
    },
    {
      key: "Seller Name",
      name: "sellerName",
      value: profile?.sellerName || "",
      section: "Personal Details",
    },
    {
      key: "Personal Email",
      name: "email",
      value: profile?.email || "",
      section: "Personal Details",
    },
    {
      key: "Mobile Number",
      name: "mobile",
      value: profile?.mobile || "",
      section: "Personal Details",
    },
    {
      key: "GSTIN",
      name: "GSTIN",
      value: profile?.GSTIN || "",
      section: "Tax & Banking",
    },
    {
      key: "Account Number",
      name: "accountNumber",
      value: profile?.bankDetails?.accountNumber || "",
      section: "Tax & Banking",
    },
  ];

  const initialForm = Object.fromEntries(fields.map((f) => [f.name, f.value]));
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const updatePayload = {
      sellerName: form.sellerName,
      email: form.email,
      mobile: form.mobile,
      GSTIN: form.GSTIN,
      bussinessDetails: {
        bussinessName: form.bussinessName,
        bussinessEmail: form.bussinessEmail,
        bussinessMobile: form.bussinessMobile,
        bussinessAddress: form.bussinessAddress,
      },
      bankDetails: {
        accountNumber: form.accountNumber,
      },
    };

    const result = await dispatch(updateSellerProfile(updatePayload));

    if (result.type.endsWith("/fulfilled")) {
      setSaved(form);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setForm(saved);
    setIsEditing(false);
  };

  const groupedFields = fields.reduce(
    (acc, field) => {
      if (!acc[field.section]) {
        acc[field.section] = [];
      }
      acc[field.section].push(field);
      return acc;
    },
    {} as Record<string, Field[]>,
  );

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", py: 4, px: 2 }}>
      <Card
        elevation={2}
        sx={{
          borderRadius: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%)",
          border: "1px solid #e8eef7",
        }}
      >
        {/* Header Section */}
        <CardHeader
          avatar={
            <Avatar
              sx={{
                width: 60,
                height: 60,
                background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {saved.bussinessName
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "S"}
            </Avatar>
          }
          title={
            <Box>
              <Box
                sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a" }}
              >
                Seller Information
              </Box>
              <Box sx={{ fontSize: "0.875rem", color: "#64748b", mt: 0.5 }}>
                {isEditing
                  ? "Make changes and save your profile"
                  : "Your complete seller profile"}
              </Box>
            </Box>
          }
          action={
            !isEditing && (
              <Button
                variant='contained'
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                  },
                  marginBottom: 8,
                }}
              >
                Edit Profile
              </Button>
            )
          }
          sx={{ pb: 0 }}
        />

        <Divider sx={{ opacity: 0.5 }} />

        <CardContent sx={{ p: 0 }}>
          {/* View Mode */}
          {!isEditing && (
            <Box>
              {Object.entries(groupedFields).map((entry, sectionIndex) => {
                const [section, sectionFields] = entry;
                return (
                  <Box key={section}>
                    {/* Section Header */}
                    <Box
                      sx={{
                        px: 3,
                        py: 2.5,
                        background: "#f1f5ff",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 4,
                          height: 24,
                          borderRadius: 1,
                          background:
                            "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                        }}
                      />
                      <Box
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#475569",
                          letterSpacing: 1.2,
                        }}
                      >
                        {section}
                      </Box>
                    </Box>

                    {/* Section Fields */}
                    {sectionFields.map((field, fieldIndex) => (
                      <Box
                        key={field.key}
                        sx={{
                          px: 3,
                          py: 2.5,
                          borderBottom:
                            fieldIndex < sectionFields.length - 1
                              ? "1px solid #e2e8f0"
                              : "none",
                          display: "flex",
                          gap: 2.5,
                          alignItems: "flex-start",
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

                    {sectionIndex <
                      Object.entries(groupedFields).length - 1 && (
                      <Divider sx={{ opacity: 0.3 }} />
                    )}
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Edit Mode */}
          {isEditing && (
            <Box sx={{ p: 3 }}>
              <Stack spacing={4}>
                {Object.entries(groupedFields).map((entry) => {
                  const [section, sectionFields] = entry;
                  return (
                    <Box key={section}>
                      {/* Section Title */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 2.5,
                          pb: 1.5,
                          borderBottom: "2px solid #e8eef7",
                        }}
                      >
                        <Box
                          sx={{
                            width: 3,
                            height: 20,
                            borderRadius: 1,
                            background:
                              "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                          }}
                        />
                        <Box
                          sx={{
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "#1976d2",
                          }}
                        >
                          {section}
                        </Box>
                      </Box>

                      {/* Section Fields */}
                      <Stack spacing={2.5}>
                        {sectionFields.map((field) => (
                          <Box key={field.key}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1.2,
                                color: "#1976d2",
                              }}
                            >
                              {keyIconMap[field.key]}
                              <Box
                                sx={{
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  letterSpacing: 0.8,
                                }}
                              >
                                {field.key}
                              </Box>
                            </Box>
                            <TextField
                              fullWidth
                              size='small'
                              name={field.name}
                              value={form[field.name]}
                              onChange={handleChange}
                              placeholder={`Enter ${field.key.toLowerCase()}`}
                              variant='outlined'
                              multiline={
                                field.name === "bussinessAddress" ||
                                field.name === "accountNumber"
                              }
                              rows={
                                field.name === "bussinessAddress" ||
                                field.name === "accountNumber"
                                  ? 3
                                  : 1
                              }
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
                                    borderColor: "#1976d2",
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
                    </Box>
                  );
                })}
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
                  startIcon={<Close />}
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
                  startIcon={<Check />}
                  onClick={handleSave}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
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
    </Box>
  );
};

export default SellerProfile;
