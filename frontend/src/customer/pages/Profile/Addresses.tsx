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
  type Address,
} from "../../../Redux Toolkit/features/customer/addressSlice";
import AddressForm from "../Checkout/AddressForm";

const GOLD = "#c9993a";
const DARK = "#0a0a0a";

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
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {/* Header Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 4,
            pb: 3,
            borderBottom: "1px solid #f0ece6",
          }}
        >
          <Box>
            <Box
              sx={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: DARK,
                mb: 1,
                letterSpacing: "-0.5px",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              My Addresses
            </Box>
            <Box
              sx={{ fontSize: "0.9rem", color: "#9ca3af", fontWeight: 500, fontFamily: "Outfit, sans-serif" }}
            >
              Manage your delivery addresses
            </Box>
          </Box>
          <LocationOn
            sx={{
              fontSize: 32,
              color: GOLD,
              opacity: 0.2,
            }}
          />
        </Box>

        {/* Add Address Button */}
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={handleOpenDialog}
            sx={{
              background: "linear-gradient(135deg, #d4a348 0%, #c9993a 100%)",
              color: "white",
              textTransform: "none",
              fontSize: "0.9rem",
              fontWeight: 700,
              fontFamily: "Outfit, sans-serif",
              borderRadius: "12px",
              px: 3,
              py: 1.25,
              boxShadow: "0 4px 12px rgba(201, 153, 58, 0.3)",
              "&:hover": {
                opacity: 0.95,
                boxShadow: "0 4px 16px rgba(201, 153, 58, 0.4)",
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
            <CircularProgress size={40} sx={{ color: GOLD }} />
            <Box sx={{ color: "#9ca3af", fontWeight: 600, fontFamily: "Outfit, sans-serif" }}>
              Loading addresses...
            </Box>
          </Box>
        ) : addresses && addresses.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            {addresses.map((address: Address) => (
              <Card
                key={address._id}
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  border: "1px solid #f0ece6",
                  background: "white",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                    borderColor: "#d4c4a8",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Header with delete button */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 800,
                          color: DARK,
                          mb: 0.5,
                          fontFamily: "Outfit, sans-serif",
                        }}
                      >
                        {address.name}
                      </Box>
                    </Box>
                    <IconButton
                      size='small'
                      onClick={() => handleDeleteClick(address._id)}
                      sx={{
                        color: "#9ca3af",
                        "&:hover": {
                          color: "#f43f5e",
                          background: "#fef1f2",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      <Delete fontSize='small' />
                    </IconButton>
                  </Box>

                  {/* Address Details */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {/* Full Address */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                      }}
                    >
                      <LocationOn
                        sx={{
                          fontSize: 20,
                          color: GOLD,
                          mt: 0.25,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Box
                          sx={{
                            fontSize: "0.9rem",
                            color: "#5d5d5d",
                            lineHeight: 1.6,
                            fontFamily: "Outfit, sans-serif",
                          }}
                        >
                          {address.address}
                        </Box>
                        <Box
                          sx={{ fontSize: "0.85rem", color: "#9ca3af", mt: 0.5, fontFamily: "Outfit, sans-serif" }}
                        >
                          {address.locality && `${address.locality}, `}
                          {address.city && `${address.city} - `}
                          {address.pinCode && `${address.pinCode}`}
                        </Box>
                        {address.state && (
                          <Box sx={{ fontSize: "0.85rem", color: "#9ca3af", fontFamily: "Outfit, sans-serif" }}>
                            {address.state}
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* Mobile */}
                    <Box
                      sx={{ display: "flex", gap: 2, alignItems: "center" }}
                    >
                      <Phone
                        sx={{
                          fontSize: 20,
                          color: GOLD,
                          flexShrink: 0,
                        }}
                      />
                      <Box
                        sx={{
                          fontSize: "0.9rem",
                          color: "#5d5d5d",
                          fontWeight: 600,
                          fontFamily: "Outfit, sans-serif",
                        }}
                      >
                        {address.mobile}
                      </Box>
                    </Box>
                  </Box>

                  {/* Address Type Badge (Optional) */}
                  {address.addressType && (
                    <Box
                      sx={{ mt: 3, pt: 3, borderTop: "1px solid #f0ece6" }}
                    >
                      <Chip
                        label={address.addressType}
                        size='small'
                        variant='outlined'
                        sx={{
                          borderColor: "#e5e7eb",
                          color: "#5d5d5d",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          height: 26,
                          textTransform: "capitalize",
                          fontFamily: "Outfit, sans-serif",
                          background: "#fafaf8",
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
            elevation={0}
            sx={{
              borderRadius: "24px",
              border: "1px solid #f0ece6",
              background: "white",
              py: 10,
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
                  width: 72,
                  height: 72,
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #fffcf5 0%, #fff6e5 100%)",
                  border: "1px solid #fde6b3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)",
                }}
              >
                <LocationOn
                  sx={{
                    fontSize: 36,
                    color: GOLD,
                  }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: DARK,
                    mb: 1,
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  No Addresses Yet
                </Box>
                <Box
                  sx={{
                    fontSize: "0.95rem",
                    color: "#9ca3af",
                    maxWidth: 320,
                    fontFamily: "Outfit, sans-serif",
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
              borderRadius: "24px",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.12)",
              fontFamily: "Outfit, sans-serif",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.3rem",
            fontWeight: 800,
            color: DARK,
            pb: 2,
            pt: 3,
            px: 4,
            borderBottom: "1px solid #f0ece6",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          Add New Address
        </DialogTitle>
        <DialogContent sx={{ pt: 3, px: 4 }}>
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
              borderRadius: "20px",
              fontFamily: "Outfit, sans-serif",
              p: 1,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: DARK, fontFamily: "Outfit, sans-serif" }}>
          Delete Address
        </DialogTitle>
        <DialogContent>
          <Box sx={{ fontSize: "0.95rem", color: "#5d5d5d", mt: 1, fontFamily: "Outfit, sans-serif" }}>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              color: "#5d5d5d",
              textTransform: "none",
              fontWeight: 600,
              fontFamily: "Outfit, sans-serif",
              borderRadius: "10px",
              "&:hover": {
                background: "#fafaf8",
                color: DARK,
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
              background: "#f43f5e",
              textTransform: "none",
              fontWeight: 600,
              fontFamily: "Outfit, sans-serif",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(244, 63, 94, 0.2)",
              "&:hover": {
                background: "#e11d48",
                boxShadow: "0 4px 16px rgba(244, 63, 94, 0.3)",
              },
              "&:disabled": {
                background: "#fda4af",
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
