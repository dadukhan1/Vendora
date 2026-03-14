/** @format */

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  CloudUpload,
  CheckCircle,
  ImageOutlined,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  fetchSingleHomeCategory,
  updateHomeCategory,
  clearSelectedCategory,
} from "../../Redux Toolkit/features/admin/adminSlice.ts";

const T = {
  blue: "#0F52FF",
  orange: "#FF4F00",
  dark: "#0F172A",
  bg: "#F8FAFC",
  secondary: "#64748B",
  border: "#E2E8F0",
  muted: "#94A3B8",
};

export default function UpdateHomeCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedCategory, loading, error } = useAppSelector(
    (state) => state.admin,
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({ categoryId: "", image: "" });

  useEffect(() => {
    if (id) dispatch(fetchSingleHomeCategory(id));
    return () => { dispatch(clearSelectedCategory()); };
  }, [id]);

  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        categoryId: selectedCategory?.categoryId || "",
        image: selectedCategory?.image || "",
      });
      setPreviewImage(selectedCategory?.image || null);
    }
  }, [selectedCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    const payload = new FormData();
    payload.append("categoryId", formData.categoryId);
    if (imageFile) payload.append("image", imageFile);
    const result = await dispatch(updateHomeCategory({ id, data: payload }));
    if (updateHomeCategory.fulfilled.match(result)) {
      setSuccessMsg("Category updated successfully!");
      setTimeout(() => navigate("/admin/home-page"), 1500);
    }
  };

  if (loading && !selectedCategory) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={32} sx={{ color: T.blue }} thickness={3} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: T.bg, py: 5, px: 2 }}>
      <Box sx={{ maxWidth: 560, mx: "auto" }}>

        {/* ── Header ── */}
        <Box display="flex" alignItems="center" gap={1.5} mb={4}>
          <IconButton
            onClick={() => navigate(-1)}
            size="small"
            sx={{
              border: `1.5px solid ${T.border}`,
              borderRadius: "8px",
              color: T.secondary,
              "&:hover": { borderColor: T.blue, color: T.blue, background: "transparent" },
            }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>
          <Box>
            <Typography sx={{ fontSize: "1.15rem", fontWeight: 700, color: T.dark, letterSpacing: "-0.3px" }}>
              Update Category
            </Typography>
            <Typography sx={{ fontSize: "0.72rem", color: T.muted }}>
              {id}
            </Typography>
          </Box>
        </Box>

        {/* ── Alerts ── */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: "10px", fontSize: "0.82rem" }}
          >
            {typeof error === "string" ? error : "Something went wrong."}
          </Alert>
        )}
        {successMsg && (
          <Alert
            severity="success"
            icon={<CheckCircle fontSize="small" />}
            sx={{ mb: 3, borderRadius: "10px", fontSize: "0.82rem" }}
          >
            {successMsg}
          </Alert>
        )}

        {/* ── Form Card ── */}
        <Box
          sx={{
            background: "#fff",
            border: `1.5px solid ${T.border}`,
            borderRadius: "16px",
            p: { xs: 3, md: 4 },
          }}
        >
          <form onSubmit={handleSubmit}>

            {/* Category Name */}
            <Box mb={3.5}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: T.secondary, mb: 1, letterSpacing: 0.3 }}>
                Category Name
              </Typography>
              <TextField
                fullWidth
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                placeholder="e.g. electronics"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    color: T.dark,
                    background: T.bg,
                    "& fieldset": { borderColor: T.border },
                    "&:hover fieldset": { borderColor: T.muted },
                    "&.Mui-focused fieldset": { borderColor: T.blue, borderWidth: "1.5px" },
                  },
                  "& input::placeholder": { color: T.muted, fontSize: "0.88rem" },
                }}
              />
            </Box>

            {/* Image */}
            <Box mb={4}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: T.secondary, mb: 1.5, letterSpacing: 0.3 }}>
                Category Image
              </Typography>

              {/* Images Row */}
              <Box display="flex" alignItems="flex-end" gap={2.5} mb={2}>

                {/* Current */}
                <Box>
                  <Typography sx={{ fontSize: "0.65rem", color: T.muted, mb: 0.8, textTransform: "uppercase", letterSpacing: 1 }}>
                    Current
                  </Typography>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "10px",
                      border: `1.5px solid ${T.border}`,
                      background: T.bg,
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedCategory?.image ? (
                      <img
                        src={selectedCategory.image}
                        alt="current"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <ImageOutlined sx={{ color: T.border, fontSize: 28 }} />
                    )}
                  </Box>
                </Box>

                {/* New Preview */}
                {imageFile && previewImage && (
                  <Box>
                    <Typography sx={{ fontSize: "0.65rem", color: T.blue, mb: 0.8, textTransform: "uppercase", letterSpacing: 1 }}>
                      New
                    </Typography>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "10px",
                        border: `1.5px solid ${T.blue}`,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={previewImage}
                        alt="new"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Upload */}
              <Button
                component="label"
                variant="outlined"
                size="small"
                startIcon={<CloudUpload sx={{ fontSize: "16px !important" }} />}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  borderColor: T.border,
                  color: T.secondary,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  px: 2,
                  "&:hover": { borderColor: T.blue, color: T.blue, background: "transparent" },
                }}
              >
                {imageFile ? "Change Image" : "Upload Image"}
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Button>

              {imageFile && (
                <Typography sx={{ fontSize: "0.7rem", color: T.muted, mt: 0.8 }}>
                  {imageFile.name}
                </Typography>
              )}
            </Box>

            {/* Divider */}
            <Box sx={{ height: "1px", background: T.border, mb: 3 }} />

            {/* Buttons */}
            <Box display="flex" justifyContent="flex-end" gap={1.5}>
              <Button
                variant="text"
                onClick={() => navigate(-1)}
                disabled={loading}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  color: T.secondary,
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  px: 2.5,
                  "&:hover": { background: T.bg, color: T.dark },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={14} color="inherit" /> : null}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  background: T.blue,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  px: 3,
                  boxShadow: "none",
                  "&:hover": { background: "#0a42d4", boxShadow: "none" },
                  "&:disabled": { background: T.border, color: T.muted, boxShadow: "none" },
                }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>

          </form>
        </Box>
      </Box>
    </Box>
  );
}