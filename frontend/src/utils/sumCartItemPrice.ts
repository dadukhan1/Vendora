/** @format */

export interface CartItem {
  sellingPrice: number;
  mrpPrice: number;
  quantity: number;
}

export const sumCartItemSellingPrice = (items: CartItem[]) => {
  return items.reduce(
    (total: number, item: CartItem) =>
      total + Number(item.sellingPrice ?? 0) * Number(item.quantity ?? 1),
    0,
  );
};

export const sumCartItemMrpPrice = (items: CartItem[]) => {
  return items.reduce(
    (total: number, item: CartItem) =>
      total + Number(item.mrpPrice ?? 0) * Number(item.quantity ?? 1),
    0,
  );
};
