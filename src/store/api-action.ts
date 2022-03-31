import { ThunkActionResult } from '../types/actions';
import { APIRoute, WarningMessage, PaginationNumber } from '../const';
import { loadGuitars, loadGuitarsNoComments, getGuitarsTotalCount } from './action';
import { Guitar } from '../types/guitar';
import { toast } from 'react-toastify';

export const fetchGuitarsNoComments = (url: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<Guitar[]>(url);
      dispatch(loadGuitarsNoComments(response.data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const fetchGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<Guitar[]>(`${APIRoute.Guitars}&_start=${PaginationNumber.InitialStart}&_limit=${PaginationNumber.Limit}`);
      dispatch(loadGuitars(response.data));
      dispatch(getGuitarsTotalCount(response.headers['x-total-count']));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const loadSortFilterGuitars = (urlSortFilter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<Guitar[]>(urlSortFilter);
      dispatch(loadGuitars(response.data));
      dispatch(getGuitarsTotalCount(response.headers['x-total-count']));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };
