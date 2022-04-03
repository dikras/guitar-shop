import { ThunkActionResult } from '../types/actions';
import { APIRoute, WarningMessage, PaginationNumber } from '../const';
import { loadGuitars, loadGuitarsNoComments, getGuitarsTotalCount, loadGuitarsByName } from './action';
import { Guitar, GuitarNoComments } from '../types/guitar';
import { toast } from 'react-toastify';

export const initialFetchGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const responseNoComments = await api.get<GuitarNoComments[]>(APIRoute.GuitarsNoComments);
      const responseWithComments = await api.get<Guitar[]>(`${APIRoute.Guitars}_start=${PaginationNumber.InitialStart}&_limit=${PaginationNumber.Limit}`);
      dispatch(loadGuitarsNoComments(responseNoComments.data));
      dispatch(loadGuitars(responseWithComments.data));
      dispatch(getGuitarsTotalCount(responseWithComments.headers['x-total-count']));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const fetchGuitarsByName = (url: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarNoComments[]>(url);
      dispatch(loadGuitarsByName(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const loadSortedGuitars = (urlSort: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<Guitar[]>(urlSort);
      dispatch(loadGuitars(response.data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const loadFilteredGuitars = (filterNoCommentsURL: string, filterWithCommentsURL: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const responseNoComments = await api.get<GuitarNoComments[]>(filterNoCommentsURL);
      const responseWithComments = await api.get<Guitar[]>(filterWithCommentsURL);
      dispatch(loadGuitarsNoComments(responseNoComments.data));
      dispatch(loadGuitars(responseWithComments.data));
      dispatch(getGuitarsTotalCount(responseWithComments.headers['x-total-count']));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };
