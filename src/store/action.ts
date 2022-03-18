import {createAction} from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { Guitar } from '../types/guitar';
import { SortingType, SortingRanking, GuitarType, StringCount } from '../const';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const changeSortingType = createAction(
  ActionType.ChangeSortingType,
  (sortingType: SortingType) => ({
    payload: sortingType,
  }),
);

export const changeSortingRanking = createAction(
  ActionType.ChangeSortingRanking,
  (sortingRanking: SortingRanking) => ({
    payload: sortingRanking,
  }),
);

export const changeGuitarType = createAction(
  ActionType.ChangeGuitarType,
  (guitarType: GuitarType) => ({
    payload: guitarType,
  }),
);

export const changeStringCount = createAction(
  ActionType.ChangeStringCount,
  (stringCount: StringCount) => ({
    payload: stringCount,
  }),
);
