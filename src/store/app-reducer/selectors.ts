import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SortingType, SortingRanking, GuitarType, StringCount } from '../../const';

export const getCurrentSortType = (state: State): SortingType => state[NameSpace.app].currentSortingType;
export const getCurrentSortRanking = (state: State): SortingRanking => state[NameSpace.app].currentSortingRanking;
export const getCurrentGuitarType = (state: State): GuitarType => state[NameSpace.app].currentGuitarType;
export const getCurrentStringCount = (state: State): StringCount => state[NameSpace.app].currentStringCount;
