import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Guitar, GuitarNoComments } from '../../types/guitar';

export const getGuitarsNoComments = (state: State): GuitarNoComments[] => state[NameSpace.data].guitarsNoComments;
export const getGuitars = (state: State): Guitar[] => state[NameSpace.data].guitars;
export const getGuitar = (state: State): GuitarNoComments | null => state[NameSpace.data].guitar;

export const getIsGuitarError = (state: State): boolean => state[NameSpace.data].isGuitarError;
export const getAllGuitarsTotalCount = (state: State): number => state[NameSpace.data].guitarsTotalCount;

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
