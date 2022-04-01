import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Guitar, GuitarNoComments } from '../../types/guitar';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.data].guitars;
export const getGuitarsByName = (state: State): GuitarNoComments[] => state[NameSpace.data].guitarsSearch;

export const getAllGuitarsTotalCount = (state: State): number => state[NameSpace.data].guitarsNoComments.length;

export const getGuitarMinPrice = (state: State): number => {
  const guitarPrices = state[NameSpace.data].guitarsNoComments.map((guitar) => guitar.price);
  const minGuitarPrice = Math.min(...guitarPrices);
  return minGuitarPrice;
};

export const getGuitarMaxPrice = (state: State): number => {
  const guitarPrices = state[NameSpace.data].guitarsNoComments.map((guitar) => guitar.price);
  const maxGuitarPrice = Math.max(...guitarPrices);
  return maxGuitarPrice;
};
