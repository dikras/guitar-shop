import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SortingType, SortingOrder, GuitarType, StringCount } from '../../const';

export const getCurrentSortType = (state: State): SortingType => state[NameSpace.app].currentSortingType;
export const getCurrentSortOrder = (state: State): SortingOrder => state[NameSpace.app].currentSortingOrder;
export const getCurrentGuitarType = (state: State): GuitarType => state[NameSpace.app].currentGuitarType;
export const getCurrentStringCount = (state: State): StringCount => state[NameSpace.app].currentStringCount;
