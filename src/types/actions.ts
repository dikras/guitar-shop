import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'guitars/loadGuitars',
  GetGuitarsTotalCount = 'guitars/getGuitarsTotalCount',
  ChangeSortingType = 'app/changeSortingType',
  ChangeSortingOrder = 'app/changeSortingOrder',
  ChangeGuitarType = 'app/changeGuitarType',
  ChangeStringCount = 'app/changeStringCount',
  SetStartPrice = 'app/setStartPrice',
  SetEndPrice = 'app/setEndPrice',
  SetStartNumber = 'pagination/setStartNumber',
  AddFilterAction = 'app/addFilterAction',
  RemoveFilterAction = 'app/removeFilterAction',
  SetGuitarName = 'search/setGuitarName',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
