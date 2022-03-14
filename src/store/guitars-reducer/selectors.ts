import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Guitar } from '../../types/guitar';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.data].guitars;
export const getGuitarNames = (state: State): string[] => state[NameSpace.data].guitars.map((guitar) => guitar.name);
