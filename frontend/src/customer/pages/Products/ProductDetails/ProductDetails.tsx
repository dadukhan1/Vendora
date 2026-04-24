/** @format */

import {
  Add,
  AddShoppingCart,
  ArrowBackIos,
  ArrowForwardIos,
  Favorite,
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
import { addItemToCart } from "../../../../Redux Toolkit/features/customer/cartSlice";
import { useParams } from "react-router";

const ProductDetails = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((store) => store.products);

  useEffect(() => {
    if (!productId) return;
    // Ensure the user lands at the top when switching products.
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleAddItemToCart = () => {
    dispatch(addItemToCart({ size: "M", productId: product?._id, quantity }));
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((q) => Math.max(1, q + delta));
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
      <div className='min-h-screen bg-white text-[#0F172A] flex items-center justify-center px-5'>
        <div className='flex flex-col items-center gap-3'>
          <CircularProgress size={34} />
          <p className='text-sm font-semibold text-gray-500'>Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white text-[#0F172A] font-sans'>
      <div className='px-5 lg:px-20 pt-10 pb-24'>
        {/* Main 2-col grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-14'>
          {/* ── Left: Image gallery ── */}
          <section className='flex flex-col-reverse lg:flex-row gap-4'>
            {/* Thumbnails */}
            <div className='flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible'>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`flex-shrink-0 rounded-xl p-0.5 bg-white transition-all duration-200
                    ${
                      i === currentImage
                        ? "border-2 border-[#0F52FF]"
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
                <div className='absolute top-4 left-4 bg-[#FF4F00] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide'>
                  {product.discount}% OFF
                </div>
              )}

              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => Math.max(0, p - 1))}
                    className='absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 flex items-center
                      justify-center bg-white rounded-full shadow-md text-[#0F172A]
                      hover:bg-[#F8FAFC] transition-colors border-none cursor-pointer'
                  >
                    <ArrowBackIos fontSize='small' />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImage((p) => Math.min(images.length - 1, p + 1))
                    }
                    className='absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 flex items-center
                      justify-center bg-white rounded-full shadow-md text-[#0F172A]
                      hover:bg-[#F8FAFC] transition-colors border-none cursor-pointer'
                  >
                    <ArrowForwardIos fontSize='small' />
                  </button>
                </>
              )}
            </div>
          </section>

          {/* ── Right: Product info ── */}
          <section className='flex flex-col gap-5'>
            {/* Brand pill + product title */}
            <div>
              <span
                className='inline-block bg-[#0F52FF]/10 text-[#0F52FF] text-[11px] font-bold
                tracking-widest uppercase px-3 py-0.5 rounded-full mb-2'
              >
                {product?.seller?.businessDetails?.businessName ||
                  product?.seller?.sellerName ||
                  "Brand"}
              </span>
              <h1 className='text-2xl font-bold leading-snug text-[#0F172A]'>
                {product?.item}
              </h1>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-1 bg-[#0F52FF]/10 px-2.5 py-1 rounded-lg'>
                <Star className='!text-[#0F52FF] !text-[18px]' />
                <span className='font-bold text-[#0F52FF] text-sm'>4.0</span>
              </div>
              <span className='text-[#64748B] text-sm'>478 Ratings</span>
              <span className='text-[#64748B] text-sm'>· 124 Reviews</span>
            </div>

            {/* Price card */}
            <div className='border border-[#E2E8F0] rounded-2xl px-5 py-4 bg-white'>
              <div className='flex items-end gap-3 flex-wrap'>
                <span className='text-3xl font-extrabold text-[#0F172A]'>
                  ₹{product?.sellingPrice}
                </span>
                <span className='text-lg text-[#94A3B8] line-through mb-0.5'>
                  ₹{product?.mrpPrice}
                </span>
                <span
                  className='text-sm font-bold text-[#FF4F00] bg-[#FF4F00]/10
                  px-2.5 py-0.5 rounded-full mb-0.5'
                >
                  {product?.discount}% off
                </span>
              </div>
              <p className='text-xs text-[#64748B] mt-1.5'>
                Inclusive of all taxes &nbsp;·&nbsp; Free shipping above ₹1500
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
                  <span className='text-[#0F52FF] flex'>{icon}</span>
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
                  className='px-4 py-2.5 flex items-center justify-center text-[#0F52FF]
                    hover:bg-[#F8FAFC] transition-colors border-none bg-transparent cursor-pointer'
                >
                  <Remove fontSize='small' />
                </button>
                <span className='min-w-[48px] text-center font-bold text-lg text-[#0F172A]'>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className='px-4 py-2.5 flex items-center justify-center text-[#0F52FF]
                    hover:bg-[#F8FAFC] transition-colors border-none bg-transparent cursor-pointer'
                >
                  <Add fontSize='small' />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className='flex gap-4 pt-2'>
              {/* Add to Cart */}
              <button
                onClick={handleAddItemToCart}
                className='flex-1 flex items-center justify-center gap-2 bg-[#0F52FF] text-white
                  rounded-[14px] py-4 text-[15px] font-bold tracking-wide cursor-pointer
                  shadow-[0_4px_20px_rgba(15,82,255,0.35)] hover:opacity-90
                  active:scale-[.98] transition-all duration-150 border-none'
              >
                <AddShoppingCart fontSize='small' />
                Add to Cart
              </button>

              {/* Wishlist */}
              <button
                className='flex-1 flex items-center justify-center gap-2 bg-white text-[#FF4F00]
                  border-[1.5px] border-[#FF4F00] rounded-[14px] py-4 text-[15px] font-bold
                  tracking-wide cursor-pointer hover:bg-[#FF4F00]/10
                  active:scale-[.98] transition-all duration-150'
              >
                <Favorite fontSize='small' />
                Wishlist
              </button>
            </div>

            {/* Description */}
            {product?.description && (
              <div className='border-t border-[#E2E8F0] pt-4 text-sm text-[#64748B] leading-relaxed'>
                <p className='font-semibold text-[#0F172A] mb-1.5'>
                  About this product
                </p>
                {product.description}
              </div>
            )}
          </section>
        </div>

        {/* Similar Products */}
        <section className='mt-20'>
          <div className='flex items-center gap-3 mb-6'>
            <span className='inline-block w-1 h-6 rounded bg-gradient-to-b from-[#0F52FF] to-[#FF4F00]' />
            <h2 className='text-xl font-bold text-[#0F172A]'>
              Similar Products
            </h2>
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
