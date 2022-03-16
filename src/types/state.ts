import { SortingType, SortingOrder, GuitarType } from '../const';
import { Guitar } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitars: Guitar[],
};

export type AppProcess = {
  currentGuitarType: GuitarType,
};

export type SortProcess = {
  currentSortingType: SortingType,
  currentSortingOrder: SortingOrder,
};

export type FilterProcess = {
  currentGuitarType: GuitarType,
  currentUrlFilter: string,
};

export type State = RootState;
