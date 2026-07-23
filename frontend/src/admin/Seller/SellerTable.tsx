/** @format */

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Button,
  type SelectChangeEvent,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/store";
import {
  fetchSellers,
  updateSellerAccountStatus,
} from "../../Redux Toolkit/features/seller/sellerSlice";
import {
  MoreVert,
  Storefront,
  Email,
  Phone,
  CheckCircle,
  Warning,
  Block,
  HourglassEmpty,
  Groups,
} from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(() => ({
  fontFamily: "Outfit, sans-serif",
  fontWeight: 700,
  fontSize: 13,
  color: "#0a0a0a",
  borderBottom: "1px solid #f0ece6",
  padding: "16px 24px",
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#fafaf8 !important",
  },
}));

const accountStatus = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    icon: <HourglassEmpty sx={{ fontSize: 16 }} />,
    color: "warning",
  },
  {
    status: "ACTIVE",
    title: "Active",
    icon: <CheckCircle sx={{ fontSize: 16 }} />,
    color: "success",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    icon: <Warning sx={{ fontSize: 16 }} />,
    color: "error",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    icon: <Block sx={{ fontSize: 16 }} />,
    color: "default",
  },
  {
    status: "BANNED",
    title: "Banned",
    icon: <Block sx={{ fontSize: 16 }} />,
    color: "error",
  },
  {
    status: "CLOSED",
    title: "Closed",
    icon: <Block sx={{ fontSize: 16 }} />,
    color: "default",
  },
];

export default function SellerTable() {
  const dispatch = useAppDispatch();
  const { sellers } = useAppSelector((store) => store.seller);
  const [status, setStatus] = useState(accountStatus[0].status);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedSellerId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedSellerId(null);
  };

  const handleUpdateSeller = async (newStatus: string) => {
    if (selectedSellerId) {
      await dispatch(
        updateSellerAccountStatus({ id: selectedSellerId, status: newStatus }),
      );
      dispatch(fetchSellers(status));
      handleCloseMenu();
    }
  };

  useEffect(() => {
    dispatch(fetchSellers(status));
  }, [status, dispatch]);

  const getStatusConfig = (s: string | undefined) => {
    const found = accountStatus.find((a) => a.status === (s ?? ""));
    return found || accountStatus[0];
  };

  return (
    <Box sx={{ p: { xs: 0, md: 2 } }}>
      <Box
        sx={{
          mb: 5,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { sm: "flex-end" },
          gap: 3,
        }}
      >
        <Box>
          <Typography
            variant='overline'
            sx={{
              color: "#c9993a",
              fontWeight: 700,
              letterSpacing: 1.5,
              fontFamily: "Outfit",
            }}
          >
            Partners
          </Typography>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 800,
              fontFamily: "Playfair Display",
              color: "#0a0a0a",
              mt: 0.5,
            }}
          >
            Seller Directory
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: "#9ca3af",
              fontFamily: "Outfit",
              mt: 1,
              maxWidth: 500,
            }}
          >
            Manage merchant accounts, review pending applications, and enforce
            platform compliance.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <FormControl size='small' sx={{ minWidth: 240 }}>
            <Select
              value={status}
              onChange={handleStatusFilterChange}
              displayEmpty
              sx={{
                borderRadius: "9999px",
                fontFamily: "Outfit",
                fontSize: 14,
                fontWeight: 600,
                bgcolor: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#f0ece6",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d4c4a8",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#c9993a",
                  borderWidth: "1px",
                },
                "& .MuiSelect-select": { py: 1.5, px: 3 },
              }}
            >
              {accountStatus.map((item) => (
                <MenuItem
                  key={item.status}
                  value={item.status}
                  sx={{
                    fontFamily: "Outfit",
                    fontSize: 14,
                    fontWeight: 500,
                    py: 1.5,
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                  >
                    <Box
                      sx={{
                        color:
                          item.color === "success"
                            ? "#2d6a4f"
                            : item.color === "warning"
                              ? "#c9993a"
                              : item.color === "error"
                                ? "#e03c54"
                                : "#9ca3af",
                        display: "flex",
                      }}
                    >
                      {item.icon}
                    </Box>
                    {item.title}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant='contained'
            onClick={() => {
              setStatus("ALL");
              dispatch(fetchSellers(undefined));
            }}
            startIcon={<Groups sx={{ fontSize: 16 }} />}
            sx={{
              borderRadius: "9999px",
              bgcolor: "#c9993a",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              fontFamily: "Outfit",
              fontSize: 14,
              px: 2.5,
              py: 1.1,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#e03c54",
                boxShadow: "0 4px 16px rgba(224,60,84,0.25)",
              },
              transition: "all 0.2s ease",
            }}
          >
            View All
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #f0ece6",
          borderRadius: "24px",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2.5,
            borderBottom: "1px solid #f0ece6",
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant='subtitle2'
            sx={{ fontWeight: 700, fontFamily: "Outfit", color: "#0a0a0a" }}
          >
            {accountStatus.find((a) => a.status === status)?.title} Sellers
          </Typography>
          <Typography
            variant='caption'
            sx={{
              fontWeight: 600,
              fontFamily: "Outfit",
              color: "#9ca3af",
              bgcolor: "#f5f3ef",
              px: 1.5,
              py: 0.5,
              borderRadius: "999px",
            }}
          >
            {sellers.length} {sellers.length === 1 ? "Account" : "Accounts"}
          </Typography>
        </Box>

        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 900 }} aria-label='seller table'>
            <TableHead>
              <TableRow sx={{ bgcolor: "#fafaf8" }}>
                <StyledTableCell>Business Details</StyledTableCell>
                <StyledTableCell>Contact Info</StyledTableCell>
                <StyledTableCell>Tax ID</StyledTableCell>
                <StyledTableCell align='center'>Account Status</StyledTableCell>
                <StyledTableCell align='right'>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center' sx={{ py: 8 }}>
                    <Storefront
                      sx={{ fontSize: 48, color: "#f0ece6", mb: 2 }}
                    />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontFamily: "Outfit",
                        fontWeight: 600,
                      }}
                    >
                      No sellers found in this category.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                sellers.map((seller) => {
                  const sConf = getStatusConfig(seller?.accountStatus);
                  return (
                    <StyledTableRow key={seller?._id}>
                      <TableCell
                        sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: "12px",
                              bgcolor: "rgba(201,153,58,0.05)",
                              border: "1px solid rgba(201,153,58,0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#c9993a",
                              fontWeight: 800,
                              fontFamily: "Playfair Display",
                              fontSize: 20,
                            }}
                          >
                            {seller?.businessDetails?.businessName
                              ?.charAt(0)
                              .toUpperCase() ||
                              seller?.sellerName?.charAt(0).toUpperCase() ||
                              "S"}
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontFamily: "Outfit",
                                color: "#0a0a0a",
                                fontSize: 14,
                              }}
                            >
                              {seller?.businessDetails?.businessName ||
                                "Unnamed Business"}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#9ca3af",
                                fontFamily: "Outfit",
                                fontSize: 12,
                                mt: 0.5,
                              }}
                            >
                              Owner: {seller?.sellerName}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell
                        sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Email sx={{ fontSize: 14, color: "#9ca3af" }} />
                            <Typography
                              sx={{
                                fontFamily: "Outfit",
                                color: "#1a1a1a",
                                fontSize: 13,
                              }}
                            >
                              {seller?.email}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Phone sx={{ fontSize: 14, color: "#9ca3af" }} />
                            <Typography
                              sx={{
                                fontFamily: "Outfit",
                                color: "#1a1a1a",
                                fontSize: 13,
                              }}
                            >
                              {seller?.mobile}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell
                        sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Outfit",
                            fontWeight: 600,
                            color: "#0a0a0a",
                            fontSize: 13,
                            letterSpacing: 0.5,
                          }}
                        >
                          {seller?.GSTIN || "N/A"}
                        </Typography>
                      </TableCell>

                      <TableCell
                        align='center'
                        sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                      >
                        <Chip
                          icon={sConf.icon}
                          label={sConf.title}
                          size='small'
                          sx={{
                            fontFamily: "Outfit",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            bgcolor:
                              sConf.color === "success"
                                ? "rgba(45,106,79,0.08)"
                                : sConf.color === "warning"
                                  ? "rgba(201,153,58,0.08)"
                                  : sConf.color === "error"
                                    ? "rgba(224,60,84,0.08)"
                                    : "#f5f3ef",
                            color:
                              sConf.color === "success"
                                ? "#2d6a4f"
                                : sConf.color === "warning"
                                  ? "#c9993a"
                                  : sConf.color === "error"
                                    ? "#e03c54"
                                    : "#5d5d5d",
                            border: "none",
                            px: 1,
                            "& .MuiChip-icon": { color: "inherit", ml: 0.5 },
                          }}
                        />
                      </TableCell>

                      <TableCell
                        align='right'
                        sx={{ borderBottom: "1px solid #f0ece6", px: 3, py: 2 }}
                      >
                        <IconButton
                          onClick={(e) => handleOpenMenu(e, seller?._id)}
                          size='small'
                          sx={{
                            color: "#9ca3af",
                            "&:hover": {
                              bgcolor: "rgba(201,153,58,0.08)",
                              color: "#c9993a",
                            },
                          }}
                        >
                          <MoreVert sx={{ fontSize: 20 }} />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu
        id='status-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            border: "1px solid #f0ece6",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            mt: 1,
            minWidth: 200,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #f0ece6", mb: 1 }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 800,
              fontFamily: "Outfit",
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Change Status
          </Typography>
        </Box>
        {accountStatus.map((item) => (
          <MenuItem
            key={item.status}
            onClick={() => handleUpdateSeller(item.status)}
            sx={{
              fontFamily: "Outfit",
              fontSize: 14,
              fontWeight: 600,
              color: item.color === "error" ? "#e03c54" : "#0a0a0a",
              gap: 1.5,
              py: 1.5,
              px: 2,
              "&:hover": {
                bgcolor:
                  item.color === "error" ? "rgba(224,60,84,0.04)" : "#fafaf8",
              },
            }}
          >
            <Box
              sx={{
                color:
                  item.color === "success"
                    ? "#2d6a4f"
                    : item.color === "warning"
                      ? "#c9993a"
                      : item.color === "error"
                        ? "#e03c54"
                        : "#9ca3af",
                display: "flex",
              }}
            >
              {item.icon}
            </Box>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
