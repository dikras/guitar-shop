import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getCurrentGuitarName = (state: State): string => state[NameSpace.search].currentGuitarName;
