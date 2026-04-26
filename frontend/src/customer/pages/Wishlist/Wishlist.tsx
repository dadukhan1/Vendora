/** @format */

import { useAppSelector } from "../../../Redux Toolkit/store";
import ProductCard from "../Products/ProductCard";
import { Favorite } from "@mui/icons-material";

const Wishlist = () => {
  const { wishlist, loading } = useAppSelector((state) => state.wishlist);

  if (loading && !wishlist) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F52FF]'></div>
      </div>
    );
  }

  const products = wishlist?.products || [];

  return (
    <div className='px-5 lg:px-20 py-10 min-h-[80vh]'>
      <div className='flex items-center gap-4 mb-10'>
        <div className='w-12 h-12 bg-[#FF4F00]/10 rounded-2xl flex items-center justify-center'>
          <Favorite sx={{ color: '#FF4F00', fontSize: 28 }} />
        </div>
        <div>
          <h1 className='text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tighter'>
            My Wishlist
          </h1>
          <p className='text-[#64748B] font-medium'>
            {products.length} {products.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </div>

      {products.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {products.map((product: any) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-20 text-center space-y-6'>
          <div className='w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center'>
            <Favorite sx={{ fontSize: 48, color: '#CBD5E1' }} />
          </div>
          <div className='space-y-2'>
             <h2 className='text-2xl font-black text-[#1E293B]'>Your wishlist is empty</h2>
             <p className='text-[#64748B] max-w-xs mx-auto'>
               Save items that you like in your wishlist to review them later and purchase.
             </p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className='px-8 py-4 bg-[#0F52FF] text-white font-black rounded-full shadow-lg hover:bg-[#0D3ABF] transition-all'
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
