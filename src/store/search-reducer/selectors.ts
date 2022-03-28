import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getCurrentGuitarName = (state: State): string => state[NameSpace.search].currentGuitarName;
export const getIsSearchDone = (state: State): boolean => state[NameSpace.search].isSearchDone;
