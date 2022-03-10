import { Guitar } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarsData = {
  guitars: Guitar[],
};

export type State = RootState;
