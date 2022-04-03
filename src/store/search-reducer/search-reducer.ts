import { createReducer } from '@reduxjs/toolkit';
import { setGuitarName, loadGuitarsByName } from '../action';
import { SearchGuitarByNameProcess } from '../../types/state';

const initialState: SearchGuitarByNameProcess = {
  currentGuitarName: '',
  isSearchDone: false,
  guitarsByName: [],
};

const searchGuitarNameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitarName, (state, action) => {
      state.currentGuitarName = action.payload;
      state.isSearchDone = true;
    })
    .addCase(loadGuitarsByName, (state, action) => {
      state.guitarsByName = action.payload;
      state.isSearchDone = true;
    });
});

export {initialState, searchGuitarNameReducer};
