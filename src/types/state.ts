import { SortingType, SortingOrder } from '../const';
import { Guitar, GuitarNoComments } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitarsNoComments: GuitarNoComments[],
  guitars: Guitar[],
  guitarsTotalCount: number,
};

export type AppProcess = {
  currentSortingType: SortingType,
  currentSortingOrder: SortingOrder,
};

export type PaginationProcess = {
  currentStartNumber: number,
  isPaginationDone: boolean,
  currentPage: number,
};

export type SearchGuitarByNameProcess = {
  currentGuitarName: string,
  isSearchDone: boolean,
  guitarsByName: GuitarNoComments[],
};

export type State = RootState;
