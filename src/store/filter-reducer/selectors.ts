import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { GuitarType, StringCount } from '../../const';

export const getCurrentGuitarType = (state: State): GuitarType => state[NameSpace.filter].currentGuitarType;
export const getCurrentStringCount = (state: State): StringCount => state[NameSpace.filter].currentStringCount;
export const getCurrentUrlFilter = (state: State): string => state[NameSpace.filter].currentUrlFilter;
