import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { loadGuitars, loadGuitarsNotComment } from '../action';

const initialState: GuitarsData = {
  guitars: [],
  guitarsNotComment: [],
};

const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadGuitarsNotComment, (state, action) => {
      state.guitarsNotComment = action.payload;
    });
});

export {guitarsReducer};
