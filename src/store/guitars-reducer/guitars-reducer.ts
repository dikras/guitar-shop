import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { loadGuitarsNoComments, loadGuitars, getGuitarsTotalCount } from '../action';

const initialState: GuitarsData = {
  guitarsNoComments: [],
  guitars: [],
  guitarsTotalCount: 0,
};

const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadGuitarsNoComments, (state, action) => {
      state.guitarsNoComments = action.payload;
    })
    .addCase(getGuitarsTotalCount, (state, action) => {
      state.guitarsTotalCount = action.payload;
    });
});

export {initialState, guitarsReducer};
