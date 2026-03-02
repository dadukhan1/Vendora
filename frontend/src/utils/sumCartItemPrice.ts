/** @format */

export const sumCartItemSellingPrice = (items) => {
  return items.reduce((total, item) => total + item.sellingPrice, 0);
};

export const sumCartItemMrpPrice = (items) => {
  return items.reduce((total, item) => total + item.mrpPrice, 0);
};
