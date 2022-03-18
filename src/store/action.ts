import {createAction} from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { Guitar } from '../types/guitar';
import { SortingType, SortingOrder, GuitarType, StringCount, FilterQueryParam } from '../const';

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

export const changeSortingOrder = createAction(
  ActionType.ChangeSortingOrder,
  (sortingOrder: SortingOrder) => ({
    payload: sortingOrder,
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

export const addFilterAction = createAction(
  ActionType.AddFilterAction,
  (filterAction: FilterQueryParam) => ({
    payload: filterAction,
  }),
);

export const removeFilterAction = createAction(
  ActionType.RemoveFilterAction,
  (filterAction: FilterQueryParam) => ({
    payload: filterAction,
  }),
);
