import { ThunkActionResult } from '../types/actions';
import { APIRoute, WarningMessage } from '../const';
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

export const loadSortFilterGuitars = (urlSortFilter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(urlSortFilter);
      dispatch(loadGuitars(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };
