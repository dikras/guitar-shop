import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { SortingType, SortingOrder } from '../../const';

export const getCurrentSortType = (state: State): SortingType => state[NameSpace.sort].currentSortingType;
export const getCurrentSortOrder = (state: State): SortingOrder => state[NameSpace.sort].currentSortingOrder;
