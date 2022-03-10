import { ThunkActionResult } from '../types/actions';
import { APIRoute } from '../const';
import { loadGuitars } from './action';
import { Guitar } from '../types/guitar';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
    dispatch(loadGuitars(data));
  };
