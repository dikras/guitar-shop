import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getCurrentStartNumber = (state: State): number => state[NameSpace.pagination].currentStartNumber;
export const getCurrentPageNumber = (state: State): number => state[NameSpace.pagination].currentPageNumber;
