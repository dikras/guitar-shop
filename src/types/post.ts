export type CouponPost = {
  coupon: string;
};

export type OrderPost = {
  guitarsIds: number[],
  coupon: string | null;
};
