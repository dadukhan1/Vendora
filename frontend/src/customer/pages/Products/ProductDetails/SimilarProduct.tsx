/** @format */

import ProductCard from "../ProductCard";

const product = {
  images: [
    "https://images.unsplash.com/photo-1619516388835-2b60acc4049e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  sellerDetails: {
    bussinessName: "Rana Clothing",
  },
};

const SimilarProduct = () => {
  return (
    <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between gap-2 gap-y-8'>
      {[1, 1, 1, 1].map((item) => (
        <ProductCard item={product} />
      ))}
    </div>
  );
};

export default SimilarProduct;
