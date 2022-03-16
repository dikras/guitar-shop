/* eslint-disable no-console */
import { ThunkActionResult } from '../types/actions';
import { APIRoute, WarningMessage, QueryParamName, SortingType, SortingOrder, GuitarType, StringCount } from '../const';
import { loadGuitars } from './action';
import { Guitar } from '../types/guitar';
import { toast } from 'react-toastify';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const loadSortedGuitars = (sortingType: SortingType, sortingOrder: SortingOrder): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?${QueryParamName.SortingType}=${sortingType}&${QueryParamName.SortingOrder}=${sortingOrder}`);
      dispatch(loadGuitars(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const loadGuitarsByType = (guitarType: GuitarType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?${QueryParamName.FilterType}=${guitarType}`);
      dispatch(loadGuitars(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const loadGuitarsByStringCount = (stringCount: StringCount): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?${QueryParamName.FilterString}=${stringCount}`);
      dispatch(loadGuitars(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const loadGuitarsByPrice = (startPrice: number, endPrice: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?${QueryParamName.StartPrice}=${startPrice}&${QueryParamName.EndPrice}=${endPrice}`);
      dispatch(loadGuitars(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };
