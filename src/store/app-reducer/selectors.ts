import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SortingType, SortingRanking } from '../../const';

export const getCurrentSortType = (state: State): SortingType => state[NameSpace.app].currentSortingType;
export const getCurrentSortRanking = (state: State): SortingRanking => state[NameSpace.app].currentSortingRanking;
