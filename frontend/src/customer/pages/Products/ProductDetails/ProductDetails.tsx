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
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import SimilarProduct from "./SimilarProduct";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Redux Toolkit/store";
import { fetchProductById } from "../../../../Redux Toolkit/features/customer/productSlice";
import { addItemToCart, addItemToCartOptimistic, deleteCartItem, removeItemFromCartOptimistic } from "../../../../Redux Toolkit/features/customer/cartSlice";
import { toggleWishlist, toggleWishlistOptimistic } from "../../../../Redux Toolkit/features/customer/wishlistSlice";
import { useNavigate, useParams } from "react-router";
import { Rating } from "@mui/material";
import { checkUserPurchase, fetchReviewsByProduct } from "../../../../Redux Toolkit/features/customer/reviewSlice";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

const ProductDetails = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((store) => store.products);
  const { wishlist } = useAppSelector((store) => store.wishlist);
  const { cart } = useAppSelector((store) => store.cart);
  const { reviews, canReview, alreadyReviewed, purchaseCount, reviewCount } = useAppSelector((store) => store.review);
  const { jwt } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isWishlisted = wishlist?.products?.some((p: any) => p._id === product?._id);

  useEffect(() => {
    if (!productId) return;
    // Ensure the user lands at the top when switching products.
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(fetchProductById(productId));
    dispatch(fetchReviewsByProduct(productId));
    if (jwt) {
      dispatch(checkUserPurchase(productId));
    }
  }, [dispatch, productId, jwt]);

  const isProductInCart = cart?.cartItems?.some((item: any) => item.product?._id === product?._id);

  const handleAddItemToCart = () => {
    if (!jwt) {
      navigate("/signin");
      return;
    }
    if (!product) return;

    if (isProductInCart) {
      const cartItem = cart?.cartItems?.find((item: any) => item.product?._id === product?._id);
      if (cartItem) {
        // Optimistic update
        dispatch(removeItemFromCartOptimistic(product._id));
        // Backend update
        dispatch(deleteCartItem(cartItem._id));
      }
    } else {
      // Optimistic update
      dispatch(addItemToCartOptimistic(product));
      // Backend update
      dispatch(addItemToCart({ size: "M", productId: product._id, quantity }));
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((q) => Math.max(1, q + delta));
  };

  const handleToggleWishlist = () => {
    if (!jwt) {
      navigate("/signin");
      return;
    }
    if (product?._id) {
      // Optimistic update
      dispatch(toggleWishlistOptimistic(product));
      // Backend update
      dispatch(toggleWishlist(product._id));
    }
  };

  const images: string[] = product?.images ?? [];

  const trustBadges = [
    { icon: <Shield fontSize='small' />, label: "Authentic & Quality Assured" },
    {
      icon: <WorkspacePremium fontSize='small' />,
      label: "100% Money Back Guarantee",
    },
    {
      icon: <LocalShipping fontSize='small' />,
      label: "Free Shipping & Returns",
    },
    { icon: <Wallet fontSize='small' />, label: "Pay on Delivery Available" },
  ];

  if (loading || !product) {
    return (
      <div className='min-h-screen bg-white text-[#1F2937] flex items-center justify-center px-5'>
        <div className='flex flex-col items-center gap-3'>
          <CircularProgress size={34} />
          <p className='text-sm font-semibold text-gray-500'>Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white text-[#1F2937] font-sans'>
      <div className='px-5 lg:px-24 pt-10 pb-32 max-w-[1600px] mx-auto'>
        {/* Main 2-col grid */}
        <div className='flex flex-col lg:flex-row gap-16 lg:gap-24 relative'>
          {/* ── Left: Image gallery ── */}
          <section className='lg:w-3/5 flex flex-col-reverse lg:flex-row gap-6'>
            {/* Thumbnails */}
            <div className='flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible'>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`flex-shrink-0 rounded-xl p-0.5 bg-white transition-all duration-200
                    ${i === currentImage
                      ? "border-2 border-[#F59E0B]"
                      : "border-2 border-[#E2E8F0] hover:border-[#94A3B8]"
                    }`}
                >
                  <img
                    src={src}
                    alt=''
                    className='w-20 h-30 object-cover rounded-lg block'
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className='relative flex-1 rounded-2xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(15,82,255,0.10)]'>
              <img
                src={images[currentImage]}
                alt=''
                className='w-full h-full object-cover block min-h-[380px]'
              />

              {/* Discount badge */}
              {product?.discount && (
                <div className='absolute top-6 left-6 bg-white text-[#F43F5E] text-xs font-bold px-4 py-1.5 rounded-full tracking-wider shadow-sm'>
                  {product.discount}% OFF
                </div>
              )}

              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => Math.max(0, p - 1))}
                    className='absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 flex items-center
                      justify-center bg-white rounded-full shadow-md text-[#1F2937]
                      hover:bg-[#FAFAF9] transition-colors border-none cursor-pointer'
                  >
                    <ArrowBackIos fontSize='small' />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImage((p) => Math.min(images.length - 1, p + 1))
                    }
                    className='absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 flex items-center
                      justify-center bg-white rounded-full shadow-md text-[#1F2937]
                      hover:bg-[#FAFAF9] transition-colors border-none cursor-pointer'
                  >
                    <ArrowForwardIos fontSize='small' />
                  </button>
                </>
              )}
            </div>
          </section>

          {/* ── Right: Product info ── */}
          <section className='lg:w-2/5 flex flex-col gap-6 lg:sticky lg:top-32 self-start'>
            {/* Brand pill + product title */}
            <div>
              <span
                className='inline-block text-[#94A3B8] text-[10px] font-bold
                tracking-[0.2em] uppercase mb-4'
              >
                {product?.seller?.businessDetails?.businessName ||
                  product?.seller?.sellerName ||
                  "Brand"}
              </span>
              <h1 className='text-3xl lg:text-5xl font-medium leading-[1.1] text-[#1F2937] font-serif tracking-tight'>
                {product?.title}
              </h1>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-lg border border-green-100'>
                <Star className='!text-green-600 !text-[18px]' />
                <span className='font-black text-green-700 text-sm'>{product?.avgRating || 0}</span>
              </div>
              <p className='text-sm font-bold text-[#64748B]'>
                {product?.numReviews || 0} customer reviews
              </p>
            </div>

            {/* Price card */}
            <div className='py-6 border-y border-[#F1F5F9]'>
              <div className='flex items-end gap-4 flex-wrap'>
                <span className='text-4xl font-medium text-[#1F2937] font-serif'>
                  ${product?.sellingPrice}
                </span>
                {product?.mrpPrice > product?.sellingPrice && (
                  <span className='text-xl text-[#94A3B8] line-through mb-1'>
                    ${product?.mrpPrice}
                  </span>
                )}
              </div>
              <p className='text-sm text-[#94A3B8] mt-3 font-light'>
                Inclusive of all taxes. Free shipping on selected orders.
              </p>
            </div>

            {/* Trust badges 2×2 */}
            <div className='grid grid-cols-2 gap-2.5'>
              {trustBadges.map(({ icon, label }) => (
                <div
                  key={label}
                  className='flex items-center gap-2.5 bg-white border border-[#E2E8F0]
                    rounded-xl px-3.5 py-2.5 text-xs text-[#64748B]'
                >
                  <span className='text-[#F59E0B] flex'>{icon}</span>
                  {label}
                </div>
              ))}
            </div>

            {/* Quantity stepper */}
            <div>
              <p className='text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-2.5'>
                Quantity
              </p>
              <div
                className='inline-flex items-center border-[1.5px] border-[#E2E8F0]
                rounded-xl overflow-hidden bg-white'
              >
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className='px-4 py-2.5 flex items-center justify-center text-[#F59E0B]
                    hover:bg-[#FAFAF9] transition-colors border-none bg-transparent cursor-pointer'
                >
                  <Remove fontSize='small' />
                </button>
                <span className='min-w-[48px] text-center font-bold text-lg text-[#1F2937]'>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className='px-4 py-2.5 flex items-center justify-center text-[#F59E0B]
                    hover:bg-[#FAFAF9] transition-colors border-none bg-transparent cursor-pointer'
                >
                  <Add fontSize='small' />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className='flex gap-4 pt-2'>
              {/* Add to Cart / Remove from Cart */}
              <button
                onClick={handleAddItemToCart}
                className={`flex-1 flex items-center justify-center gap-3 rounded-full py-5 text-[15px] font-bold tracking-wide cursor-pointer
                  active:scale-[.98] transition-all duration-300 border-none
                  ${isProductInCart
                    ? 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                    : 'bg-[#1F2937] text-white shadow-xl hover:bg-[#F59E0B] hover:shadow-[0_8px_20px_rgba(245,158,11,0.2)]'
                  }`}
              >
                {isProductInCart ? <Remove fontSize='small' /> : <AddShoppingCart fontSize='small' />}
                {isProductInCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>

              {/* Wishlist */}
              <button
                onClick={handleToggleWishlist}
                className={`w-16 h-[60px] flex items-center justify-center rounded-full border-[1.5px] cursor-pointer active:scale-[.98] transition-all duration-300
                  ${isWishlisted
                    ? 'bg-[#F43F5E] text-white border-[#F43F5E] shadow-[0_4px_15px_rgba(244,63,94,0.3)]'
                    : 'bg-white text-[#F43F5E] border-[#E2E8F0] hover:border-[#F43F5E]'
                  }`}
              >
                {isWishlisted ? <Favorite fontSize='small' /> : <FavoriteBorder fontSize='small' />}
              </button>
            </div>

            {/* Description */}
            {product?.description && (
              <div className='border-t border-[#E2E8F0] pt-6'>
                <h3 className='text-lg font-black text-[#1F2937] mb-3'>
                  Product Details
                </h3>
                <div className='text-[0.925rem] text-[#475569] leading-relaxed'>
                  {product.description}
                </div>
              </div>
            )}

            {/* Reviews Section */}
          </section>
          <div className='border-t border-[#E2E8F0] pt-10 mt-10'>
            <div className='flex items-center justify-between mb-8'>
              <div>
                <h2 className='text-2xl font-black text-[#1F2937] tracking-tight'>
                  Customer Reviews
                </h2>
                <div className='flex items-center gap-2 mt-1'>
                  <Rating value={product?.avgRating || 0} readOnly precision={0.5} />
                  <span className='text-sm font-bold text-[#64748B]'>Based on {product?.numReviews || 0} reviews</span>
                </div>
              </div>
              {!showReviewForm && canReview && (
                <button
                  onClick={() => {
                    setShowReviewForm(true);
                  }}
                  className='px-6 py-2.5 border-[1.5px] border-[#F59E0B] text-[#F59E0B] font-black rounded-full text-sm hover:bg-amber-50 transition-all'
                >
                  Write a Review
                </button>
              )}
              {!showReviewForm && alreadyReviewed && (
                <div className='flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200'>
                  <Star className='text-slate-400' sx={{ fontSize: 16 }} />
                  <span className='text-sm font-bold text-slate-500'>You've reviewed all your purchases</span>
                </div>
              )}
              {!showReviewForm && canReview && purchaseCount > 1 && (
                <p className='text-xs font-bold text-[#F59E0B] mt-2 text-right'>
                  You have {purchaseCount - reviewCount} pending review{purchaseCount - reviewCount > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {showReviewForm && (
              <div className='mb-10'>
                <ReviewForm productId={product?._id} onCancel={() => setShowReviewForm(false)} />
              </div>
            )}

            <div className='space-y-2'>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))
              ) : (
                <div className='py-10 text-center bg-slate-50 rounded-2xl border border-dashed border-gray-200'>
                  <p className='text-[#64748B] font-medium'>No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className='mt-32 max-w-[1600px] mx-auto'>
          <div className='flex flex-col items-center gap-3 mb-12 text-center'>
            <h2 className='text-3xl font-medium text-[#1F2937] tracking-tight font-serif'>
              You May Also Like
            </h2>
            <div className='w-8 h-1 bg-[#F59E0B]/30 rounded-full'></div>
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
