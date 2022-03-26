import {createAction} from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { Guitar } from '../types/guitar';
import { SortingType, SortingOrder, GuitarType } from '../const';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

export const getGuitarsTotalCount = createAction(
  ActionType.GetGuitarsTotalCount,
  (guitarsTotalCount: number) => ({
    payload: guitarsTotalCount,
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
  (stringCount: number) => ({
    payload: stringCount,
  }),
);

export const addFilterAction = createAction(
  ActionType.AddFilterAction,
  (filterAction: string) => ({
    payload: filterAction,
  }),
);

export const removeFilterAction = createAction(
  ActionType.RemoveFilterAction,
  (filterAction: string) => ({
    payload: filterAction,
  }),
);

export const setStartPrice = createAction(
  ActionType.SetStartPrice,
  (startPrice: number) => ({
    payload: startPrice,
  }),
);

export const setEndPrice = createAction(
  ActionType.SetEndPrice,
  (endPrice: number) => ({
    payload: endPrice,
  }),
);

export const setStartNumber = createAction(
  ActionType.SetStartNumber,
  (startNumber: number) => ({
    payload: startNumber,
  }),
);

export const setGuitarName = createAction(
  ActionType.SetGuitarName,
  (guitarName: string) => ({
    payload: guitarName,
  }),
);
