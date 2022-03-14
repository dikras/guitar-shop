import { SortingType, SortingRanking } from '../const';
import { Guitar } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitars: Guitar[],
};

export type AppProcess = {
  currentSortingType: SortingType,
  currentSortingRanking: SortingRanking,
};

export type State = RootState;
