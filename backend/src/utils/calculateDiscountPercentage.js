/** @format */
export const calculateDiscountPercentage = (mrpPrice, sellingPrice) => {
  if (!mrpPrice || mrpPrice <= 0) {
    return 0;
  }

  if (!sellingPrice || sellingPrice < 0) {
    sellingPrice = 0;
  }

  const discount = mrpPrice - sellingPrice;
  return Math.round((discount / mrpPrice) * 100);
};