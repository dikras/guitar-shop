import { ThunkActionResult } from '../types/actions';
import { WarningMessage } from '../const';
import { loadGuitars, loadGuitarsNoComments, loadGuitarsSearch, getGuitarsTotalCount } from './action';
import { Guitar, GuitarNoComments } from '../types/guitar';
import { toast } from 'react-toastify';

export const fetchGuitars = (urlNoComments: string, urlWithComments: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const responseOne = await api.get<GuitarNoComments[]>(urlNoComments);
      const responseTwo = await api.get<Guitar[]>(urlWithComments);
      dispatch(loadGuitarsNoComments(responseOne.data));
      dispatch(loadGuitars(responseTwo.data));
      dispatch(getGuitarsTotalCount(responseTwo.headers['x-total-count']));
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

export const loadGuitarsByName = (url: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<Guitar[]>(url);
      dispatch(loadGuitarsSearch(response.data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };
