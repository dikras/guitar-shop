import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { GuitarNoComments } from '../../types/guitar';

export const getCurrentGuitarName = (state: State): string => state[NameSpace.search].currentGuitarName;
export const getGuitarsByName = (state: State): GuitarNoComments[] => state[NameSpace.search].guitarsByName;
