import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { GuitarNoComments, GuitarToCount } from '../../types/guitar';

export const getGuitarsInCart = (state: State): GuitarNoComments[] => state[NameSpace.cart].guitarsInCart;
export const getGuitarsInCartQuantity = (state: State): number => state[NameSpace.cart].guitarsInCart.length;
export const getGuitarsInCartIDs = (state: State): number[] => state[NameSpace.cart].guitarsInCart.map((guitar) => guitar.id);
export const getGuitarsInCartUniqIDs = (state: State): (string | undefined)[] => state[NameSpace.cart].guitarsInCart.map((guitar) => guitar.uniqID);
export const getDiscount = (state: State): number => state[NameSpace.cart].discount;
export const getTotalSumByCartItem = (state: State): number => {
  let sum = 0;
  if (state[NameSpace.cart].guitarsToCount.length !== 0) {
    sum = state[NameSpace.cart].guitarsToCount.map((guitar) =>
      guitar.price * guitar.quantity).reduce((prevItem, currentItem) => prevItem + currentItem);
  }
  return sum;
};
export const getGuitarsToCount = (state: State): GuitarToCount[] => state[NameSpace.cart].guitarsToCount;
