/** @format */

import {
  Add,
  AddShoppingCart,
  Favorite,
  LocalShipping,
  Remove,
  Shield,
  Star,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
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
  const { categoryid, productId } = useParams();
  const handleChangeCurrentImage = (index: number) => {
    setCurrentImage(index);
  };
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (value: number) => {
    setQuantity(value + quantity);
  };
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((store) => store.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch]);

  const handleAddItemToCart = () => {
    console.log(product);
    const request = {
      size: "M",
      productId: product?._id,
      quantity,
    };
    dispatch(addItemToCart(request));
  };

  return (
    <div className='min-h-screen px-5 lg:px-20 pt-10'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <section className='flex flex-col lg:flex-row gap-5'>
          <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
            {product?.images?.map((item, index) => (
              <img
                onClick={() => handleChangeCurrentImage(index)}
                className='lg:w-full w-[50px] cursor-pointer rounded-md'
                src={item}
              />
            ))}
          </div>
          <div className='w-full lg:w-[85%]'>
            <img
              className='w-full rounded-md'
              src={product?.images[currentImage]}
              alt=''
            />
          </div>
        </section>
        <section>
          <h1 className='font-bold text-lg text-teal-500'>Rana Clothing</h1>
          <p className='text-gray-500'>{product?.item}</p>
          <div
            className='flex justify-between items-center py-2
            border border-gray-500 w-[180px] px-3 mt-5'
          >
            <div className='flex gap-1 items-center'>
              <span>4</span>
              <Star color='primary' />
            </div>
            <Divider orientation='vertical' flexItem />
            <span>478 Rating</span>
          </div>
          <div className='space-y-2 pt-5'>
            <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
              <div className='price flex items-center gap-3'>
                <span className='font-semibold text-teal-800'>
                  {product?.sellingPrice}
                </span>
                <span className='text font-thin line-through text-gray-400'>
                  {product?.mrpPrice}
                </span>
                <span className='font-semibold text-teal-600'>
                  {product?.discount}% off
                </span>
              </div>
              <p className='text-sm'>
                Inclusive of all taxes. Free Shipping above 1500.
              </p>
            </div>
            <div className='mt-7 space-y-3'>
              <div className='flex items-center gap-4'>
                <Shield color='primary' />
                <p>Authentic & Quality Assured</p>
              </div>
              <div className='flex items-center gap-4'>
                <WorkspacePremium color='primary' />
                <p>100% money back guarantee</p>
              </div>
              <div className='flex items-center gap-4'>
                <LocalShipping color='primary' />
                <p>Free shipping & returns</p>
              </div>
              <div className='flex items-center gap-4'>
                <Wallet color='primary' />
                <p>Pay on delivery might be available</p>
              </div>
            </div>
            <div className='mt-7 space-y-2'>
              <h1>QUANTITY</h1>
              <div className='flex items-center gap-2 w-[140px] justify-between'>
                <Button
                  onClick={() => handleQuantityChange(-1)}
                  variant='outlined'
                >
                  <Remove />
                </Button>
                <span>{quantity}</span>
                <Button
                  onClick={() => handleQuantityChange(+1)}
                  variant='outlined'
                >
                  <Add />
                </Button>
              </div>
            </div>
          </div>
          <div className='mt-12 flex items-center gap-5'>
            <Button
              startIcon={<AddShoppingCart />}
              fullWidth
              onClick={handleAddItemToCart}
              variant='outlined'
              sx={{ py: "1rem" }}
            >
              Add to Cart
            </Button>
            <Button
              startIcon={<Favorite />}
              fullWidth
              variant='outlined'
              sx={{ py: "1rem" }}
            >
              Whishlist
            </Button>
          </div>
          <div className='mt-5'>
            <p>{product?.description} </p>
          </div>
        </section>
      </div>
      <section className='mt-20'>
        <h1 className='text-lg font-bold'>Similar Product</h1>
        <div className='pt-5'>
          <SimilarProduct />
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
