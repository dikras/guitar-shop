import { createReducer } from '@reduxjs/toolkit';
import { setGuitarName } from '../action';
import { SearchGuitarByNameProcess } from '../../types/state';

const initialState: SearchGuitarByNameProcess = {
  currentGuitarName: '',
};

const searchGuitarNameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitarName, (state, action) => {
      state.currentGuitarName = action.payload;
    });
});

export {initialState, searchGuitarNameReducer};
