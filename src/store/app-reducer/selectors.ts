import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { GuitarType, StringCount, SortingType, SortingOrder } from '../../const';

export const getCurrentSortType = (state: State): SortingType => state[NameSpace.app].currentSortingType;
export const getCurrentSortOrder = (state: State): SortingOrder => state[NameSpace.app].currentSortingOrder;

export const getCurrentGuitarType = (state: State): GuitarType => state[NameSpace.app].currentGuitarType;
export const getCurrentStringCount = (state: State): StringCount => state[NameSpace.app].currentStringCount;

export const getCurrentSortFilterURL = (state: State): string => state[NameSpace.app].currentSortFilterURL;

export const getCurrentStartPrice = (state: State): number => state[NameSpace.app].currentStartPrice;
export const getCurrentEndPricer = (state: State): number => state[NameSpace.app].currentEndPrice;
