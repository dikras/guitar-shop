import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'guitars/loadGuitars',
  ChangeSortingType = 'app/changeSortingType',
  ChangeSortingOrder = 'app/changeSortingOrder',
  ChangeGuitarType = 'app/changeGuitarType',
  ChangeStringCount = 'app/changeStringCount',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;