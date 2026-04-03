/** @format */
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import api from "../../../../config/api";
import ProductCard from "../ProductCard";

type SimilarProductProps = {
  category?: string;
  currentProductId?: string;
};

const SimilarProduct = ({
  category,
  currentProductId,
}: SimilarProductProps) => {
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) return;

    const fetchSimilar = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products", {
          params: {
            category,
            sort: "price_low",
            pageNumber: 1,
          },
        });

        const content = response.data?.content ?? [];
        const filtered = currentProductId
          ? content.filter((p: any) => p?._id !== currentProductId)
          : content;

        // UI: we only need a small set for the details page.
        setSimilarProducts(filtered.slice(0, 4));
      } catch (e) {
        setSimilarProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [category, currentProductId]);

  if (!category) return null;
  if (loading && similarProducts.length === 0) {
    return (
      <div className='w-full flex items-center justify-center py-10'>
        <CircularProgress />
      </div>
    );
  }

  if (!similarProducts.length) return null;

  return (
    <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between gap-2 gap-y-8'>
      {similarProducts.map((item) => (
        <ProductCard key={item?._id ?? item?.title} item={item} />
      ))}
    </div>
  );
};

export default SimilarProduct;
