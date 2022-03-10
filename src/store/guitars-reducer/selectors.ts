import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Guitar } from '../../types/guitar';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.data].guitars;
