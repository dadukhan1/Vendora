/** @format */

export const sumCartItemSellingPrice = (items) => {
  return items.reduce(
    (total, item) => total + item.sellingPrice * item.quantity,
    0,
  );
};

export const sumCartItemMrpPrice = (items) => {
  return items.reduce(
    (total, item) => total + item.mrpPrice * item.quantity,
    0,
  );
};
