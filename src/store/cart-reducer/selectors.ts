import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { GuitarNoComments } from '../../types/guitar';

export const getGuitarsInCart = (state: State): GuitarNoComments[] => state[NameSpace.cart].guitarsInCart;
export const getTotalSum = (state: State): number => state[NameSpace.cart].totalSum;
export const getGuitarsInCartQuantity = (state: State): number => state[NameSpace.cart].guitarsInCart.length;
export const getGuitarsInCartIDs = (state: State): number[] => state[NameSpace.cart].guitarsInCart.map((guitar) => guitar.id);
export const getGuitarsInCartUniqIDs = (state: State): (string | undefined)[] => state[NameSpace.cart].guitarsInCart.map((guitar) => guitar.uniqID);
export const getDiscount = (state: State): number => state[NameSpace.cart].discount;
