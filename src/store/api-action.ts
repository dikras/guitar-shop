import { ThunkActionResult } from '../types/actions';
import { APIRoute, WarningMessage } from '../const';
import {
  loadGuitars,
  loadGuitarsNoComments,
  loadGuitarsByName,
  loadGuitar,
  loadGuitarError,
  loadComments,
  loadCommentsError,
  getGuitarsTotalCount,
  loadDiscount
} from './action';
import { Guitar, GuitarNoComments } from '../types/guitar';
import { toast } from 'react-toastify';
import { Comment, CommentPost } from '../types/comment';
import { CouponPost } from '../types/post';

export const fetchGuitarsByName = (url: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarNoComments[]>(url);
      dispatch(loadGuitarsByName(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const fetchGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarNoComments[]>(`${APIRoute.GuitarsNoComments}`);
      dispatch(loadGuitarsNoComments(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const fetchGuitar = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarNoComments>(`${APIRoute.GuitarsNoComments}/${id}`);
      dispatch(loadGuitar(data));
    } catch {
      dispatch(loadGuitarError());
    }
  };

export const fetchComments = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<Comment[]>(`${APIRoute.GuitarsNoComments}/${id}${APIRoute.Comments}`);
      dispatch(loadComments(data));
    } catch {
      dispatch(loadCommentsError());
    }
  };

export const loadFilteredGuitars = (filterURL: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<Guitar[]>(`${APIRoute.Guitars}&${filterURL}`);
      dispatch(loadGuitars(response.data));
      dispatch(getGuitarsTotalCount(response.headers['x-total-count']));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const loadSortedGuitars = (sortURL: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<Guitar[]>(`${APIRoute.Guitars}&${sortURL}`);
      dispatch(loadGuitars(response.data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export  const uploadReview = (review: CommentPost, id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post<CommentPost>(APIRoute.Comments, review);
      const { data } = await api.get<Comment[]>(`${APIRoute.GuitarsNoComments}/${id}${APIRoute.Comments}`);
      dispatch(loadComments(data));
    }
    catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export  const fetchDiscount = ({coupon}: CouponPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<number>(APIRoute.Coupon, {coupon});
      dispatch(loadDiscount(data));
    }
    catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };
