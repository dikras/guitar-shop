import { SortingType, SortingOrder, GuitarType, StringCount } from '../const';
import { Guitar } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitars: Guitar[],
  guitarsTotalCount: number,
};

export type SortProcess = {
  currentSortingType: SortingType,
  currentSortingOrder: SortingOrder,
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
};

export type SearchGuitarByNameProcess = {
  currentGuitarName: string,
};

export type State = RootState;
