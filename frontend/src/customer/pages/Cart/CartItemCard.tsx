/** @format */

import { Add, Close, Remove } from "@mui/icons-material";
import { Box, Card, CardContent, Divider, IconButton, Typography } from "@mui/material";
import { useAppDispatch } from "../../../Redux Toolkit/store";
import {
  deleteCartItem,
  updateCartItem,
} from "../../../Redux Toolkit/features/customer/cartSlice";

type CartItem = {
  _id?: string;
  quantity: number;
  product?: {
    title?: string;
    sellingPrice?: number | string;
    images?: string[];
    seller?: {
      businessDetails?: {
        businessName?: string;
      };
    };
  };
};

type CartItemCardProps = {
  item: CartItem;
};

const CartItemCard = ({ item }: CartItemCardProps) => {
  const dispatch = useAppDispatch();

  const handleUpdateCartItem = (quantity: number) => {
    dispatch(updateCartItem({ cartItemId: item?._id, quantity }));
  };

  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem(item?._id));
  };

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
        border: "1px solid #e8eef7",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Delete button */}
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
        <IconButton
          onClick={handleDeleteCartItem}
          size='small'
          sx={{
            color: "#94a3b8",
            transition: "all 0.2s",
            "&:hover": {
              color: "#ea580c",
              background: "rgba(234, 88, 12, 0.08)",
            },
          }}
        >
          <Close fontSize='small' />
        </IconButton>
      </Box>

      {/* Main content */}
      <CardContent sx={{ p: 2, pr: 5 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            component='img'
            src={item?.product?.images?.[0]}
            alt={item?.product?.title || "Cart item image"}
            sx={{
              width: 84,
              height: 84,
              borderRadius: 2.5,
              objectFit: "cover",
              flexShrink: 0,
              border: "1px solid #e2e8f0",
              backgroundColor: "#f8fafc",
            }}
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#1976d2",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                mb: 0.5,
              }}
            >
              {item?.product?.seller?.businessDetails?.businessName || "Vendor"}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.92rem",
                fontWeight: 700,
                color: "#0f172a",
                lineHeight: 1.35,
                mb: 0.5,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item?.product?.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.76rem",
                color: "#94a3b8",
                mb: 0.5,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Sold by: {item?.product?.seller?.businessDetails?.businessName || "Vendora Partner"}
            </Typography>
            <Typography sx={{ fontSize: "0.76rem", color: "#64748b" }}>
              <Box component='span' sx={{ color: "#0f172a", fontWeight: 700 }}>
                7 days
              </Box>{" "}
              replacement available
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Divider sx={{ borderColor: "#e8eef7" }} />

      {/* Footer: qty + price */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Stepper */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #e2e8f0",
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <IconButton
            disabled={item?.quantity === 1}
            onClick={() => handleUpdateCartItem(item?.quantity - 1)}
            size='small'
            sx={{
              borderRadius: 0,
              color: "#1976d2",
              px: 1.25,
              "&:hover": { backgroundColor: "#f8fafc" },
              "&.Mui-disabled": { color: "#cbd5e1" },
            }}
          >
            <Remove fontSize='small' />
          </IconButton>
          <Typography
            sx={{
              minWidth: 34,
              textAlign: "center",
              fontSize: "0.92rem",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            {item?.quantity}
          </Typography>
          <IconButton
            onClick={() => handleUpdateCartItem(item?.quantity + 1)}
            size='small'
            sx={{
              borderRadius: 0,
              color: "#1976d2",
              px: 1.25,
              "&:hover": { backgroundColor: "#f8fafc" },
            }}
          >
            <Add fontSize='small' />
          </IconButton>
        </Box>

        {/* Price */}
        <Typography sx={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
          ${item?.product?.sellingPrice}
        </Typography>
      </Box>
    </Card>
  );
};

export default CartItemCard;
