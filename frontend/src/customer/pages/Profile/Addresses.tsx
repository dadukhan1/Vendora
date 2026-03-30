/** @format */

import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Add, Delete, LocationOn, Phone } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/store";
import {
  fetchAddresses,
  deleteAddress,
} from "../../../Redux Toolkit/features/customer/addressSlice";
import AddressForm from "../Checkout/AddressForm";

interface Address {
  _id: string;
  name: string;
  address: string;
  locality?: string;
  city: string;
  pinCode: string;
  state?: string;
  mobile: string;
  addressType?: string;
}

const Addresses = () => {
  const dispatch = useAppDispatch();
  const { addresses, loading } = useAppSelector((store) => store.address);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteClick = (addressId: string) => {
    setAddressToDelete(addressId);
    setDeleteDialogOpen(true);
};

const handleConfirmDelete = async () => {
  if (addressToDelete) {
    setIsDeleting(true);
    try {
      await dispatch(deleteAddress(addressToDelete));
      setDeleteDialogOpen(false);
      setAddressToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  }
};

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Header Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 3,
            pb: 3,
            borderBottom: "1px solid #e8eef7",
          }}
        >
          <Box>
            <Box
              sx={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "#0f172a",
                mb: 1,
                letterSpacing: "-0.5px",
              }}
            >
              My Addresses
            </Box>
            <Box
              sx={{ fontSize: "0.875rem", color: "#94a3b8", fontWeight: 500 }}
            >
              Manage your delivery addresses
            </Box>
          </Box>
          <LocationOn
            sx={{
              fontSize: 32,
              color: "#1976d2",
              opacity: 0.15,
            }}
          />
        </Box>

        {/* Add Address Button */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={handleOpenDialog}
            sx={{
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
              color: "white",
              textTransform: "none",
              fontSize: "0.95rem",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1.25,
              boxShadow: "0 4px 20px rgba(25, 118, 210, 0.28)",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
                boxShadow: "0 6px 24px rgba(25, 118, 210, 0.35)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Add New Address
          </Button>
        </Box>
      </Box>

      {/* Addresses List Section */}
      <Box>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 300,
              gap: 2,
            }}
          >
            <CircularProgress size={40} sx={{ color: "#1976d2" }} />
            <Box sx={{ color: "#64748b", fontWeight: 500 }}>
              Loading addresses...
            </Box>
          </Box>
        ) : addresses && addresses.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2.5,
            }}
          >
            {addresses.map((address: Address) => (
              <Card
                key={address._id}
                sx={{
                  borderRadius: 2.5,
                  border: "1px solid #e8eef7",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                    borderColor: "#cbd5e1",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Header with delete button */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      mb: 2.5,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "#0f172a",
                          mb: 0.5,
                        }}
                      >
                        {address.name}
                      </Box>
                    </Box>
                    <IconButton
                      size='small'
                      onClick={() => handleDeleteClick(address._id)}
                      sx={{
                        color: "#94a3b8",
                        "&:hover": {
                          color: "#ef4444",
                          background: "rgba(239, 68, 68, 0.08)",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      <Delete fontSize='small' />
                    </IconButton>
                  </Box>

                  {/* Address Details */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    {/* Full Address */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "flex-start",
                      }}
                    >
                      <LocationOn
                        sx={{
                          fontSize: 18,
                          color: "#1976d2",
                          mt: 0.5,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Box
                          sx={{
                            fontSize: "0.875rem",
                            color: "#64748b",
                            lineHeight: 1.6,
                          }}
                        >
                          {address.address}
                        </Box>
                        <Box
                          sx={{ fontSize: "0.8rem", color: "#94a3b8", mt: 0.5 }}
                        >
                          {address.locality && `${address.locality}, `}
                          {address.city && `${address.city} - `}
                          {address.pinCode && `${address.pinCode}`}
                        </Box>
                        {address.state && (
                          <Box sx={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                            {address.state}
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* Mobile */}
                    <Box
                      sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
                    >
                      <Phone
                        sx={{
                          fontSize: 18,
                          color: "#1976d2",
                          flexShrink: 0,
                        }}
                      />
                      <Box
                        sx={{
                          fontSize: "0.875rem",
                          color: "#64748b",
                          fontWeight: 500,
                        }}
                      >
                        {address.mobile}
                      </Box>
                    </Box>
                  </Box>

                  {/* Address Type Badge (Optional) */}
                  {address.addressType && (
                    <Box
                      sx={{ mt: 2.5, pt: 2.5, borderTop: "1px solid #e8eef7" }}
                    >
                      <Chip
                        label={address.addressType}
                        size='small'
                        variant='outlined'
                        sx={{
                          borderColor: "#cbd5e1",
                          color: "#475569",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          height: 24,
                          textTransform: "capitalize",
                        }}
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #e8eef7",
              background: "linear-gradient(135deg, #f8fafc 0%, #f1f5ff 100%)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
              py: 8,
              px: 4,
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #e8eef7 0%, #f1f5ff 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LocationOn
                  sx={{
                    fontSize: 32,
                    color: "#cbd5e1",
                  }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "#1e293b",
                    mb: 0.5,
                  }}
                >
                  No Addresses Yet
                </Box>
                <Box
                  sx={{
                    fontSize: "0.875rem",
                    color: "#94a3b8",
                    maxWidth: 300,
                  }}
                >
                  Add your first address to get started with fast checkout!
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Add Address Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='sm'
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#0f172a",
            pb: 1,
            borderBottom: "1px solid #e8eef7",
          }}
        >
          Add New Address
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <AddressForm onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#0f172a" }}>
          Delete Address
        </DialogTitle>
        <DialogContent>
          <Box sx={{ fontSize: "0.95rem", color: "#475569", mt: 1 }}>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              color: "#475569",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                background: "rgba(71, 85, 105, 0.08)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            variant='contained'
            sx={{
              background: "#ef4444",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                background: "#dc2626",
              },
              "&:disabled": {
                background: "#fca5a5",
              },
            }}
          >
            {isDeleting ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1, color: "white" }} />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Addresses;
