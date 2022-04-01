import { SortingType, SortingOrder, GuitarType, StringCount } from '../const';
import { Guitar, GuitarNoComments } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitarsNoComments: GuitarNoComments[],
  guitars: Guitar[],
  guitarsSearch: GuitarNoComments[],
  guitarsTotalCount: number,
};

export type FilterProcess = {
  currentGuitarType: GuitarType,
  currentStringCount: StringCount,
  currentSortingType: SortingType,
  currentSortingOrder: SortingOrder,
  currentUrlFilter: string,
  currentStartPrice: number,
  currentEndPrice: number,
};

export type PaginationProcess = {
  currentStartNumber: number,
  isPaginationDone: boolean,
};

export type SearchGuitarByNameProcess = {
  currentGuitarName: string,
};

export type State = RootState;
