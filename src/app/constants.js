export const PRODUCT_LIMIT_PER_PAGE_FOR_USER = 8;
export const PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN = 4;

export const DISCOUNTED_PRICE = (item) => {
  return Math.round(item.price * (1 - item.discountPercentage / 100));
};
