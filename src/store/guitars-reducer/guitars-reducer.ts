import { createReducer } from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import {
  loadGuitarsNoComments,
  loadGuitars, getGuitarsTotalCount,
  loadGuitar,
  loadGuitarError,
  fetchGuitarInitial
} from '../action';

const initialState: GuitarsData = {
  guitarsNoComments: [],
  guitars: [],
  guitarsTotalCount: 0,
  guitar: null,
  isGuitarError: false,
  isGuitarLoading: false,
};

const guitarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchGuitarInitial, (state, action) => {
      // state.isGuitarLoading = true;
    })
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isGuitarError = false;
    })
    .addCase(loadGuitarsNoComments, (state, action) => {
      state.guitarsNoComments = action.payload;
    })
    .addCase(getGuitarsTotalCount, (state, action) => {
      state.guitarsTotalCount = action.payload;
    })
    .addCase(loadGuitar, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(loadGuitarError, (state) => {
      state.isGuitarError = true;
    });
});

export {initialState, guitarsReducer};

