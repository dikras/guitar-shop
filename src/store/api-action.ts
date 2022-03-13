/* eslint-disable no-console */
import { ThunkActionResult } from '../types/actions';
import { APIRoute } from '../const';
import { loadGuitars } from './action';
import { Guitar } from '../types/guitar';
import { WarningMessage } from '../const';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
    } catch {
      console.error(WarningMessage.FetchFail);
    }
  };
