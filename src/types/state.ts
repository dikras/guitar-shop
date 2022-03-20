import { SortingType, SortingOrder, GuitarType, StringCount } from '../const';
import { Guitar } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitars: Guitar[],
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

export type State = RootState;
