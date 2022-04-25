/* eslint-disable no-console */
import { ThunkActionResult } from '../types/actions';
import { APIRoute, WarningMessage } from '../const';
import {
  loadGuitars,
  loadGuitarsNoComments,
  getGuitarsTotalCount,
  loadGuitarsByName,
  loadGuitar,
  loadGuitarError,
  loadComments,
  loadCommentsError
} from './action';
import { Guitar, GuitarNoComments } from '../types/guitar';
import { toast } from 'react-toastify';
import { Comment, CommentPost } from '../types/comment';

export const fetchGuitarsByName = (url: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarNoComments[]>(url);
      dispatch(loadGuitarsByName(data));
    } catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };

export const fetchGuitar = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarNoComments>(`/guitars/${id}`);
      dispatch(loadGuitar(data));
    } catch {
      dispatch(loadGuitarError());
    }
  };

export const fetchComments = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<Comment[]>(`/guitars/${id}/comments`);
      dispatch(loadComments(data));
    } catch {
      dispatch(loadCommentsError());
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

export  const uploadReview = (review: CommentPost, id: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.post<CommentPost>(APIRoute.Comments, review);
      const { data } = await api.get<Comment[]>(`/guitars/${id}/comments`);
      dispatch(loadComments(data));
    }
    catch {
      toast.warn(WarningMessage.FetchFail);
    }
  };
