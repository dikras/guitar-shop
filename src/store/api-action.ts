import { ThunkActionResult } from '../types/actions';
import { APIRoute, WarningMessage } from '../const';
import { loadGuitars, loadGuitarsNoComments, getGuitarsTotalCount, loadGuitarsByName } from './action';
import { Guitar, GuitarNoComments } from '../types/guitar';
import { toast } from 'react-toastify';

export const fetchGuitarsByName = (url: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarNoComments[]>(url);
      dispatch(loadGuitarsByName(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const loadFilteredGuitars = (filterURL: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const responseNoComments = await api.get<GuitarNoComments[]>(`${APIRoute.GuitarsNoComments}`);
      const responseWithComments = await api.get<Guitar[]>(`${APIRoute.Guitars}&${filterURL}`);
      dispatch(loadGuitarsNoComments(responseNoComments.data));
      dispatch(loadGuitars(responseWithComments.data));
      dispatch(getGuitarsTotalCount(responseWithComments.headers['x-total-count']));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const loadSortedGuitars = (sortURL: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const responseWithComments = await api.get<Guitar[]>(`${APIRoute.Guitars}&${sortURL}`);
      dispatch(loadGuitars(responseWithComments.data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };
