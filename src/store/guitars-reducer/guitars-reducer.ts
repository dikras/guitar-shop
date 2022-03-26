import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import { loadGuitars, getGuitarsTotalCount } from '../action';

const initialState: GuitarsData = {
  guitars: [],
  guitarsTotalCount: 0,
};

const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(getGuitarsTotalCount, (state, action) => {
      state.guitarsTotalCount = action.payload;
    });
});

export {initialState, guitarsReducer};
