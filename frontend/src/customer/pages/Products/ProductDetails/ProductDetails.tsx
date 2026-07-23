/** @format */

import {
  Add,
  AddShoppingCart,
  ArrowBackIos,
  ArrowForwardIos,
  Favorite,
  FavoriteBorder,
  LocalShipping,
  Remove,
  Shield,
  Star,
  Wallet,
  WorkspacePremium,
  CheckCircle,
} from "@mui/icons-material";
import { CircularProgress, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import SimilarProduct from "./SimilarProduct";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Redux Toolkit/store";
import { fetchProductById } from "../../../../Redux Toolkit/features/customer/productSlice";
import {
  addItemToCart,
  addItemToCartOptimistic,
  deleteCartItem,
  removeItemFromCartOptimistic,
} from "../../../../Redux Toolkit/features/customer/cartSlice";
import {
  toggleWishlist,
  toggleWishlistOptimistic,
} from "../../../../Redux Toolkit/features/customer/wishlistSlice";
import { useNavigate, useParams } from "react-router";
import {
  checkUserPurchase,
  fetchReviewsByProduct,
} from "../../../../Redux Toolkit/features/customer/reviewSlice";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

const GOLD = "#c9993a";
const DARK = "#0a0a0a";

const ProductDetails = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((store) => store.products);
  const { wishlist } = useAppSelector((store) => store.wishlist);
  const { cart } = useAppSelector((store) => store.cart);
  const { reviews, canReview, alreadyReviewed, purchaseCount, reviewCount } =
    useAppSelector((store) => store.review);
  const { jwt } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isWishlisted = wishlist?.products?.some(
    (p: any) => p._id === product?._id
  );

  useEffect(() => {
    if (!productId) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(fetchProductById(productId));
    dispatch(fetchReviewsByProduct(productId));
    if (jwt) dispatch(checkUserPurchase(productId));
  }, [dispatch, productId, jwt]);

  const isProductInCart = cart?.cartItems?.some(
    (item: any) => item.product?._id === product?._id
  );

  const handleAddItemToCart = () => {
    if (!jwt) { navigate("/signin"); return; }
    if (!product) return;
    if (isProductInCart) {
      const cartItem = cart?.cartItems?.find(
        (item: any) => item.product?._id === product?._id
      );
      if (cartItem) {
        dispatch(removeItemFromCartOptimistic(product._id));
        dispatch(deleteCartItem(cartItem._id));
      }
    } else {
      dispatch(addItemToCartOptimistic(product));
      dispatch(addItemToCart({ size: "M", productId: product._id, quantity }));
    }
  };

  const handleQuantityChange = (delta: number) =>
    setQuantity((q) => Math.max(1, q + delta));

  const handleToggleWishlist = () => {
    if (!jwt) { navigate("/signin"); return; }
    if (product?._id) {
      dispatch(toggleWishlistOptimistic(product));
      dispatch(toggleWishlist(product._id));
    }
  };

  const images: string[] = product?.images ?? [];

  const trustBadges = [
    { icon: <Shield sx={{ fontSize: 18, color: GOLD }} />, label: "Authentic & Quality Assured" },
    { icon: <WorkspacePremium sx={{ fontSize: 18, color: GOLD }} />, label: "100% Money Back Guarantee" },
    { icon: <LocalShipping sx={{ fontSize: 18, color: GOLD }} />, label: "Free Shipping & Returns" },
    { icon: <Wallet sx={{ fontSize: 18, color: GOLD }} />, label: "Pay on Delivery Available" },
  ];

  if (loading || !product) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#fafaf8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
        fontFamily: "Outfit, sans-serif",
      }}>
        <CircularProgress size={32} sx={{ color: GOLD }} />
        <p style={{ color: "#9ca3af", fontWeight: 600, fontSize: 14 }}>Loading product...</p>
      </div>
    );
  }

  const discount = product?.discount;
  const seller =
    product?.seller?.businessDetails?.businessName ||
    product?.seller?.sellerName ||
    "Brand";

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf8", fontFamily: "Outfit, sans-serif" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── MAIN PRODUCT GRID ── */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: 56,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>

          {/* ── LEFT: Image Gallery ── */}
          <div style={{ flex: "1 1 460px", display: "flex", gap: 12, maxWidth: 620 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  style={{
                    width: 74,
                    height: 90,
                    borderRadius: 10,
                    border: i === currentImage ? `2px solid ${GOLD}` : "2px solid #e5e7eb",
                    padding: 2,
                    background: "#fff",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 7, display: "block" }}
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div style={{
              flex: 1,
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              height: 540,
            }}>
              <img
                src={images[currentImage]}
                alt={product?.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "opacity 0.25s ease",
                }}
              />

              {/* Discount badge */}
              {discount && (
                <div style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  background: GOLD,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 800,
                  padding: "6px 14px",
                  borderRadius: 999,
                  letterSpacing: "0.05em",
                  fontFamily: "Outfit, sans-serif",
                }}>
                  {discount}% OFF
                </div>
              )}

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => Math.max(0, p - 1))}
                    style={{
                      position: "absolute", top: "50%", left: 12,
                      transform: "translateY(-50%)",
                      width: 36, height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.95)",
                      border: "none",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    <ArrowBackIos sx={{ fontSize: 14, color: DARK }} />
                  </button>
                  <button
                    onClick={() => setCurrentImage((p) => Math.min(images.length - 1, p + 1))}
                    style={{
                      position: "absolute", top: "50%", right: 12,
                      transform: "translateY(-50%)",
                      width: 36, height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.95)",
                      border: "none",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    <ArrowForwardIos sx={{ fontSize: 14, color: DARK }} />
                  </button>
                </>
              )}

              {/* Dot indicators */}
              {images.length > 1 && (
                <div style={{
                  position: "absolute", bottom: 16, left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex", gap: 6,
                }}>
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      style={{
                        width: i === currentImage ? 20 : 6,
                        height: 6,
                        borderRadius: 999,
                        background: i === currentImage ? GOLD : "rgba(255,255,255,0.6)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 0.25s ease",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div style={{
            flex: "0 1 400px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "sticky",
            top: 100,
            alignSelf: "flex-start",
          }}>
            {/* Seller tag */}
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: GOLD,
              fontFamily: "Outfit, sans-serif",
            }}>
              {seller}
            </span>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 700,
              color: DARK,
              lineHeight: 1.15,
              margin: 0,
            }}>
              {product?.title}
            </h1>

            {/* Rating row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                background: "#fdf6e3",
                border: "1px solid #f0e0a0",
                borderRadius: 8,
                padding: "4px 10px",
              }}>
                <Star sx={{ fontSize: 16, color: GOLD }} />
                <span style={{ fontWeight: 800, color: "#92710a", fontSize: 14 }}>
                  {product?.avgRating || 0}
                </span>
              </div>
              <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>
                {product?.numReviews || 0} reviews
              </span>
            </div>

            {/* Price */}
            <div style={{
              padding: "20px 0",
              borderTop: "1px solid #f0ece6",
              borderBottom: "1px solid #f0ece6",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 36,
                  fontWeight: 700,
                  color: DARK,
                }}>
                  ${product?.sellingPrice}
                </span>
                {product?.mrpPrice > product?.sellingPrice && (
                  <span style={{
                    fontSize: 18,
                    color: "#9ca3af",
                    textDecoration: "line-through",
                    fontFamily: "Outfit, sans-serif",
                  }}>
                    ${product?.mrpPrice}
                  </span>
                )}
                {discount && (
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: GOLD,
                    background: "rgba(201,153,58,0.1)",
                    padding: "3px 10px",
                    borderRadius: 999,
                  }}>
                    Save {discount}%
                  </span>
                )}
              </div>
              <p style={{ marginTop: 8, fontSize: 12, color: "#9ca3af" }}>
                Inclusive of all taxes. Free shipping on selected orders.
              </p>
            </div>

            {/* Trust badges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {trustBadges.map(({ icon, label }) => (
                <div key={label} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#fff",
                  border: "1px solid #f0ece6",
                  borderRadius: 12,
                  padding: "10px 12px",
                  fontSize: 11.5,
                  color: "#5d5d5d",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}>
                  {icon}
                  {label}
                </div>
              ))}
            </div>

            {/* Quantity stepper */}
            <div>
              <p style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#9ca3af",
                marginBottom: 10,
              }}>
                Quantity
              </p>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1.5px solid #e5e7eb",
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
              }}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  style={{
                    width: 44, height: 44,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: GOLD,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafaf8")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <Remove sx={{ fontSize: 18 }} />
                </button>
                <span style={{
                  minWidth: 48,
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: 16,
                  color: DARK,
                  fontFamily: "Outfit, sans-serif",
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  style={{
                    width: 44, height: 44,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: GOLD,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafaf8")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <Add sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleAddItemToCart}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "16px 24px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: "0.02em",
                  transition: "all 0.25s ease",
                  background: isProductInCart ? "#f1f5f9" : DARK,
                  color: isProductInCart ? "#475569" : "#fff",
                  boxShadow: isProductInCart
                    ? "none"
                    : "0 6px 24px rgba(10,10,10,0.18)",
                }}
                onMouseEnter={e => {
                  if (!isProductInCart) {
                    e.currentTarget.style.background = GOLD;
                    e.currentTarget.style.boxShadow = `0 8px 28px rgba(201,153,58,0.3)`;
                  } else {
                    e.currentTarget.style.background = "#e2e8f0";
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isProductInCart ? "#f1f5f9" : DARK;
                  e.currentTarget.style.boxShadow = isProductInCart ? "none" : "0 6px 24px rgba(10,10,10,0.18)";
                }}
              >
                {isProductInCart ? <Remove sx={{ fontSize: 18 }} /> : <AddShoppingCart sx={{ fontSize: 18 }} />}
                {isProductInCart ? "Remove from Cart" : "Add to Cart"}
              </button>

              <button
                onClick={handleToggleWishlist}
                style={{
                  width: 56, height: 56,
                  borderRadius: "50%",
                  border: isWishlisted ? "none" : "1.5px solid #e5e7eb",
                  background: isWishlisted ? "#fde8ec" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#f43f5e";
                  e.currentTarget.style.background = "#fde8ec";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isWishlisted ? "transparent" : "#e5e7eb";
                  e.currentTarget.style.background = isWishlisted ? "#fde8ec" : "#fff";
                }}
              >
                {isWishlisted
                  ? <Favorite sx={{ fontSize: 20, color: "#f43f5e" }} />
                  : <FavoriteBorder sx={{ fontSize: 20, color: "#f43f5e" }} />}
              </button>
            </div>

            {/* Description */}
            {product?.description && (
              <div style={{
                borderTop: "1px solid #f0ece6",
                paddingTop: 20,
              }}>
                <h3 style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#9ca3af",
                  marginBottom: 10,
                }}>
                  Product Details
                </h3>
                <p style={{
                  fontSize: 14,
                  color: "#5d5d5d",
                  lineHeight: 1.75,
                  fontFamily: "Outfit, sans-serif",
                }}>
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── REVIEWS SECTION ── */}
        <div style={{
          marginTop: 80,
          paddingTop: 48,
          borderTop: "1px solid #f0ece6",
        }}>
          {/* Reviews header */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 40,
          }}>
            <div>
              <p style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: GOLD,
                marginBottom: 6,
                fontFamily: "Outfit, sans-serif",
              }}>
                Community
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                fontWeight: 700,
                color: DARK,
                margin: 0,
              }}>
                Customer Reviews
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                <Rating value={product?.avgRating || 0} readOnly precision={0.5} sx={{
                  "& .MuiRating-iconFilled": { color: GOLD },
                }} />
                <span style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Outfit, sans-serif" }}>
                  Based on {product?.numReviews || 0} reviews
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              {!showReviewForm && canReview && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 999,
                    border: `1.5px solid ${GOLD}`,
                    background: "transparent",
                    color: GOLD,
                    fontWeight: 700,
                    fontSize: 13,
                    fontFamily: "Outfit, sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = GOLD;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = GOLD;
                  }}
                >
                  Write a Review
                </button>
              )}
              {!showReviewForm && alreadyReviewed && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px",
                  background: "#f5f3ef",
                  borderRadius: 999,
                  border: "1px solid #e5e7eb",
                }}>
                  <CheckCircle sx={{ fontSize: 14, color: "#9ca3af" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", fontFamily: "Outfit, sans-serif" }}>
                    You've reviewed all your purchases
                  </span>
                </div>
              )}
              {!showReviewForm && canReview && purchaseCount > 1 && (
                <p style={{ fontSize: 12, fontWeight: 700, color: GOLD, fontFamily: "Outfit, sans-serif" }}>
                  {purchaseCount - reviewCount} pending review{purchaseCount - reviewCount > 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {showReviewForm && (
            <div style={{ marginBottom: 40 }}>
              <ReviewForm productId={product?._id} onCancel={() => setShowReviewForm(false)} />
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))
            ) : (
              <div style={{
                padding: "48px 24px",
                textAlign: "center",
                background: "#fff",
                borderRadius: 20,
                border: "1.5px dashed #e5e7eb",
              }}>
                <Star sx={{ fontSize: 36, color: "#e5e7eb", mb: 1 }} />
                <p style={{
                  color: "#9ca3af",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                }}>
                  No reviews yet. Be the first to share your experience!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── SIMILAR PRODUCTS ── */}
        <section style={{ marginTop: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: GOLD,
              marginBottom: 8,
              fontFamily: "Outfit, sans-serif",
            }}>
              Explore More
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 700,
              color: DARK,
              margin: 0,
            }}>
              You May Also Like
            </h2>
            <div style={{
              width: 40,
              height: 3,
              background: `linear-gradient(to right, ${GOLD}, rgba(201,153,58,0.2))`,
              borderRadius: 999,
              margin: "12px auto 0",
            }} />
          </div>
          <SimilarProduct
            category={product?.category}
            currentProductId={product?._id}
          />
        </section>

      </div>
    </div>
  );
};

export default ProductDetails;
