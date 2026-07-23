/** @format */

import { Add, Close, Remove } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton } from "@mui/material";
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
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        border: "1px solid #f0ece6",
        background: "#ffffff",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0,0,0,0.02)",
          borderColor: "#d4c4a8",
        },
      }}
    >
      {/* Delete button */}
      <Box sx={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}>
        <IconButton
          onClick={handleDeleteCartItem}
          size="small"
          sx={{
            color: "#9ca3af",
            transition: "all 0.2s",
            "&:hover": {
              color: "#e03c54",
              background: "rgba(224, 60, 84, 0.05)",
            },
          }}
        >
          <Close sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* Main content */}
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <div className="flex gap-4">
          <img
            src={item?.product?.images?.[0]}
            alt={item?.product?.title || "Cart item"}
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover bg-[#f5f3ef] border border-[#f0ece6]"
          />
          <div className="min-w-0 flex-1 flex flex-col justify-between">
            <div>
              <p className="label-overline text-[#c9993a] mb-1" style={{ fontSize: "8px", letterSpacing: "0.15em" }}>
                {item?.product?.seller?.businessDetails?.businessName || "Vendor"}
              </p>
              <h4 className="text-[14px] lg:text-[15px] font-[700] font-[Outfit] text-[#0a0a0a] truncate tracking-[-0.01em] mb-1">
                {item?.product?.title}
              </h4>
              <p className="text-[11px] text-[#9ca3af] font-[500] font-[Outfit]">
                Sold by: <span className="text-[#0a0a0a]">{item?.product?.seller?.businessDetails?.businessName || "Vendora Partner"}</span>
              </p>
            </div>

            {/* Stepper + Price row */}
            <div className="flex items-end justify-between mt-3">
              {/* Stepper */}
              <div className="flex items-center bg-[#f5f3ef] rounded-xl overflow-hidden border border-[#ede9e2]">
                <button
                  disabled={item?.quantity === 1}
                  onClick={() => handleUpdateCartItem(item?.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#0a0a0a] hover:bg-[#ede9e2] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                  <Remove sx={{ fontSize: 14 }} />
                </button>
                <span className="w-8 text-center text-[12px] font-[700] font-[Outfit] text-[#0a0a0a]">
                  {item?.quantity}
                </span>
                <button
                  onClick={() => handleUpdateCartItem(item?.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#0a0a0a] hover:bg-[#ede9e2] transition-colors"
                >
                  <Add sx={{ fontSize: 14 }} />
                </button>
              </div>

              {/* Price */}
              <span className="text-[15px] font-[800] font-[Outfit] text-[#0a0a0a]">
                ${item?.product?.sellingPrice}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
