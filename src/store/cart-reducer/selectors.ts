import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { GuitarNoComments } from '../../types/guitar';

export const getGuitarsInCart = (state: State): GuitarNoComments[] => state[NameSpace.cart].guitarsInCart;
export const getTotalSum = (state: State): number => state[NameSpace.cart].totalSum;
