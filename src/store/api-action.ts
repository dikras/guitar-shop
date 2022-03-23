import { ThunkActionResult } from '../types/actions';
import { APIRoute, WarningMessage, PaginationNumber } from '../const';
import { loadGuitars, loadGuitarsNotComment } from './action';
import { GuitarNotComment, Guitar } from '../types/guitar';
import { toast } from 'react-toastify';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}&_start=${PaginationNumber.InitialStart}&_limit=${PaginationNumber.Limit}`);
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

export const loadAllGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<GuitarNotComment[]>(APIRoute.GuitarsNotComment);
      dispatch(loadGuitarsNotComment(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };
