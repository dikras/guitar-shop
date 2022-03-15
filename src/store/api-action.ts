/* eslint-disable no-console */
import { ThunkActionResult } from '../types/actions';
import { APIRoute, WarningMessage, QueryParamName, SortingType, SortingOrder } from '../const';
import { loadGuitars } from './action';
import { Guitar } from '../types/guitar';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
    } catch {
      console.error(WarningMessage.FetchFail);
    }
  };

export const loadSortedGuitars = (sortingType: SortingType, sortingOrder: SortingOrder): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?${QueryParamName.SortingType}=${sortingType}&${QueryParamName.SortingOrder}=${sortingOrder}`);
      dispatch(loadGuitars(data));
    } catch {
      console.error(WarningMessage.FetchFail);
    }
  };
