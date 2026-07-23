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
  Avatar,
  Typography,
  Grid,
} from "@mui/material";
import {
  Store,
  Email,
  Phone,
  Edit,
  LocationOn,
  CreditCard,
  CheckCircle,
  VerifiedUser,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  updateSellerProfile,
  fetchSellerProfile,
} from "../../Redux Toolkit/features/seller/sellerSlice";

const keyIconMap: Record<string, React.ReactNode> = {
  "Business Name": <Store sx={{ fontSize: 20, color: "#c9993a" }} />,
  "Business Email": <Email sx={{ fontSize: 20, color: "#c9993a" }} />,
  "Business Mobile": <Phone sx={{ fontSize: 20, color: "#c9993a" }} />,
  "Business Address": <LocationOn sx={{ fontSize: 20, color: "#c9993a" }} />,
  "Seller Name": <VerifiedUser sx={{ fontSize: 20, color: "#c9993a" }} />,
  "Personal Email": <Email sx={{ fontSize: 20, color: "#c9993a" }} />,
  "Mobile Number": <Phone sx={{ fontSize: 20, color: "#c9993a" }} />,
  "GSTIN": <CheckCircle sx={{ fontSize: 20, color: "#c9993a" }} />,
  "Account Number": <CreditCard sx={{ fontSize: 20, color: "#c9993a" }} />,
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
      name: "businessName",
      value: profile?.businessDetails?.businessName || "",
      section: "Business Details",
    },
    {
      key: "Business Email",
      name: "businessEmail",
      value: profile?.businessDetails?.businessEmail || "",
      section: "Business Details",
    },
    {
      key: "Business Mobile",
      name: "businessPhone",
      value: profile?.businessDetails?.businessPhone || "",
      section: "Business Details",
    },
    {
      key: "Business Address",
      name: "businessAddress",
      value: profile?.businessDetails?.businessAddress || "",
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

  useEffect(() => {
    dispatch(fetchSellerProfile()).then((result) => {
      if (result.type.endsWith("/fulfilled") && result.payload) {
        const fetchedProfile = result.payload;
        if (typeof fetchedProfile === "string") return;
        const newForm = Object.fromEntries([
          ["businessName", fetchedProfile.businessDetails?.businessName || ""],
          [
            "businessEmail",
            fetchedProfile.businessDetails?.businessEmail || "",
          ],
          [
            "businessPhone",
            fetchedProfile.businessDetails?.businessPhone || "",
          ],
          [
            "businessAddress",
            fetchedProfile.businessDetails?.businessAddress || "",
          ],
          ["sellerName", fetchedProfile.sellerName || ""],
          ["email", fetchedProfile.email || ""],
          ["mobile", fetchedProfile.mobile || ""],
          ["GSTIN", fetchedProfile.GSTIN || ""],
          ["accountNumber", fetchedProfile.bankDetails?.accountNumber || ""],
        ]);
        setForm(newForm);
        setSaved(newForm);
      }
    });
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const updatePayload = {
      sellerName: form.sellerName,
      email: form.email,
      mobile: form.mobile,
      GSTIN: form.GSTIN,
      businessDetails: {
        businessName: form.businessName,
        businessEmail: form.businessEmail,
        businessPhone: form.businessPhone,
        businessAddress: form.businessAddress,
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
      if (!acc[field.section]) acc[field.section] = [];
      acc[field.section].push(field);
      return acc;
    },
    {} as Record<string, Field[]>,
  );

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      fontSize: "0.85rem",
      "& fieldset": { borderColor: "#f0ece6" },
      "&:hover fieldset": { borderColor: "#d4c4a8" },
      "&.Mui-focused fieldset": { borderColor: "#c9993a" },
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.85rem",
      color: "#9ca3af",
      fontFamily: "Outfit",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#c9993a" },
    "& .MuiInputBase-input": { fontFamily: "Outfit" },
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", py: 4, px: 2 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: "32px",
          border: "1px solid #f0ece6",
          bgcolor: "#fff",
          overflow: "hidden",
        }}
      >
        <CardHeader
          sx={{ p: 4, pb: 3 }}
          avatar={
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: "#0a0a0a",
                color: "#c9993a",
                fontFamily: "Playfair Display",
                fontSize: "1.75rem",
                fontWeight: 700,
              }}
            >
              {saved.businessName
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "S"}
            </Avatar>
          }
          title={
            <Box>
              <Typography
                variant='h5'
                sx={{
                  fontFamily: "Playfair Display",
                  fontWeight: 800,
                  color: "#0a0a0a",
                }}
              >
                Seller Profile
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontFamily: "Outfit", color: "#9ca3af", mt: 0.5 }}
              >
                {isEditing
                  ? "Update your account details and business information."
                  : "Your complete store and business identity."}
              </Typography>
            </Box>
          }
          action={
            !isEditing && (
              <Button
                variant='contained'
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                sx={{
                  borderRadius: "9999px",
                  bgcolor: "#0a0a0a",
                  textTransform: "none",
                  fontWeight: 700,
                  fontFamily: "Outfit",
                  boxShadow: "none",
                  mt: 2,
                  "&:hover": { bgcolor: "#c9993a", boxShadow: "none" },
                }}
              >
                Edit Profile
              </Button>
            )
          }
        />

        <Divider sx={{ borderColor: "#f0ece6" }} />

        <CardContent sx={{ p: 0 }}>
          {!isEditing && (
            <Box>
              {Object.entries(groupedFields).map((entry, sectionIndex) => {
                const [section, sectionFields] = entry;
                return (
                  <Box key={section}>
                    <Box
                      sx={{
                        px: 4,
                        py: 2.5,
                        bgcolor: "#fafaf8",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 4,
                          height: 24,
                          borderRadius: 1,
                          bgcolor: "#c9993a",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          fontWeight: 800,
                          fontFamily: "Outfit",
                          color: "#0a0a0a",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                        }}
                      >
                        {section}
                      </Typography>
                    </Box>

                    {sectionFields.map((field, fieldIndex) => (
                      <Box
                        key={field.key}
                        sx={{
                          px: 4,
                          py: 3,
                          borderBottom:
                            fieldIndex < sectionFields.length - 1
                              ? "1px solid #f0ece6"
                              : "none",
                          display: "flex",
                          gap: 3,
                          alignItems: "center",
                          transition: "background 0.2s",
                          "&:hover": { bgcolor: "#fafaf8" },
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "12px",
                            bgcolor: "rgba(201, 153, 58, 0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {keyIconMap[field.key]}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              fontFamily: "Outfit",
                              color: "#9ca3af",
                              mb: 0.5,
                            }}
                          >
                            {field.key}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              fontWeight: 600,
                              fontFamily: "Outfit",
                              color: saved[field.name] ? "#0a0a0a" : "#d1d5db",
                            }}
                          >
                            {saved[field.name] || "Not configured"}
                          </Typography>
                        </Box>
                      </Box>
                    ))}

                    {sectionIndex <
                      Object.entries(groupedFields).length - 1 && (
                      <Divider sx={{ borderColor: "#f0ece6" }} />
                    )}
                  </Box>
                );
              })}
            </Box>
          )}

          {isEditing && (
            <Box sx={{ p: 4 }}>
              <Stack spacing={5}>
                {Object.entries(groupedFields).map((entry) => {
                  const [section, sectionFields] = entry;
                  return (
                    <Box key={section}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 3,
                          pb: 1.5,
                          borderBottom: "1px solid #f0ece6",
                        }}
                      >
                        <Box
                          sx={{
                            width: 4,
                            height: 20,
                            borderRadius: 1,
                            bgcolor: "#c9993a",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            fontWeight: 800,
                            fontFamily: "Outfit",
                            color: "#0a0a0a",
                          }}
                        >
                          {section}
                        </Typography>
                      </Box>

                      <Grid container spacing={3}>
                        {sectionFields.map((field) => (
                          <Grid
                            size={{
                              xs: 12,
                              sm: field.name === "businessAddress" ? 12 : 6,
                            }}
                            key={field.key}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                                color: "#0a0a0a",
                              }}
                            >
                              <Box sx={{ color: "#c9993a", display: "flex" }}>
                                {keyIconMap[field.key]}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "0.85rem",
                                  fontWeight: 700,
                                  fontFamily: "Outfit",
                                }}
                              >
                                {field.key}
                              </Typography>
                            </Box>
                            <TextField
                              fullWidth
                              name={field.name}
                              value={form[field.name]}
                              onChange={handleChange}
                              placeholder={`Enter ${field.key.toLowerCase()}`}
                              multiline={field.name === "businessAddress"}
                              rows={field.name === "businessAddress" ? 3 : 1}
                              sx={inputSx}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  );
                })}
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  mt: 6,
                  pt: 4,
                  borderTop: "1px solid #f0ece6",
                }}
              >
                <Button
                  onClick={handleCancel}
                  sx={{
                    borderRadius: "9999px",
                    color: "#9ca3af",
                    fontFamily: "Outfit",
                    fontWeight: 700,
                    textTransform: "none",
                    px: 3,
                    "&:hover": { bgcolor: "#f5f3ef" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  onClick={handleSave}
                  sx={{
                    borderRadius: "9999px",
                    bgcolor: "#0a0a0a",
                    textTransform: "none",
                    fontWeight: 700,
                    fontFamily: "Outfit",
                    px: 4,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#c9993a", boxShadow: "none" },
                  }}
                >
                  Save Profile
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
