import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { GuitarNoComments } from '../../types/guitar';

export const getGuitarsInCart = (state: State): GuitarNoComments[] => state[NameSpace.cart].guitarsInCart;
export const getGuitarsInCartQuantity = (state: State): number => state[NameSpace.cart].guitarsInCart.length;
export const getGuitarsInCartIDs = (state: State): number[] => state[NameSpace.cart].guitarsInCart.map((guitar) => guitar.id);
export const getDiscount = (state: State): number => state[NameSpace.cart].discount;
export const getTotalSumByCartItem = (state: State): number => {
  let sum = 0;
  if (state[NameSpace.cart].guitarsToCount.length !== 0) {
    sum = state[NameSpace.cart].guitarsToCount.map((guitar) =>
      guitar.price * guitar.quantity).reduce((prevItem, currentItem) => prevItem + currentItem);
  }
  return sum;
};
export const getTotalQuantityIncart = (state: State): number => {
  let quantity = 0;
  if (state[NameSpace.cart].guitarsToCount.length !== 0) {
    quantity = state[NameSpace.cart].guitarsToCount.map((guitar) =>
      guitar.quantity).reduce((prevItem, currentItem) => prevItem + currentItem);
  }
  return quantity;
};
export const getGuitarToCountQuantity = (state: State, id: number): number | undefined => state[NameSpace.cart].guitarsToCount.find((guitar) => guitar.id === id)?.quantity;
export const getCouponValue = (state: State): string => state[NameSpace.cart].coupon;
