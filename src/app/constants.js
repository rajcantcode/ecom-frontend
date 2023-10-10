export const ITEMS_PER_PAGE = 10;
export function discountedPrice(item) {
  return Math.round(
    item.product.price * (1 - item.product.discountPercentage / 100),
    2
  );
}
