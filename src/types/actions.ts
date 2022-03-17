import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'guitars/loadGuitars',
  ChangeSortingType = 'sort/changeSortingType',
  ChangeSortingOrder = 'sort/changeSortingOrder',
  ChangeGuitarType = 'filter/changeGuitarType',
  ChangeStringCount = 'filter/changeStringCount',
  AddFilterAction = 'filter/addFilterAction',
  RemoveFilterAction = 'filter/removeFilterAction',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
