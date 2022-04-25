import { createReducer } from '@reduxjs/toolkit';
import { CommentsData } from '../../types/state';
import { loadComments, loadCommentsError } from '../action';

const initialState: CommentsData = {
  comments: [],
  isCommentsError: false,
};

const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadCommentsError, (state) => {
      state.isCommentsError = true;
    });
});

export {initialState, commentsReducer};
