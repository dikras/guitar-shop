import { SortingType, SortingOrder, GuitarType, StringCount } from '../const';
import { Guitar } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitars: Guitar[],
};

export type AppProcess = {
  currentSortingType: SortingType,
  currentSortingOrder: SortingOrder,
  currentGuitarType: GuitarType,
  currentStringCount: StringCount,
};

export type State = RootState;
