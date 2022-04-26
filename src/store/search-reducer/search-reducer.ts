import { createReducer } from '@reduxjs/toolkit';
import { setGuitarName, loadGuitarsByName } from '../action';
import { SearchGuitarByNameProcess } from '../../types/state';

const initialState: SearchGuitarByNameProcess = {
  currentGuitarName: '',
  guitarsByName: [],
};

const searchGuitarNameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitarName, (state, action) => {
      state.currentGuitarName = action.payload;
    })
    .addCase(loadGuitarsByName, (state, action) => {
      state.guitarsByName = action.payload;
    });
});

export {initialState, searchGuitarNameReducer};
