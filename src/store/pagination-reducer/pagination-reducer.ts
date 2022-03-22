import { createReducer } from '@reduxjs/toolkit';
import { PaginationProcess } from '../../types/state';
import { PaginationNumber } from '../../const';
import { setStartNumber } from '../action';

const initialState: PaginationProcess = {
  currentStartNumber: PaginationNumber.InitialStart,
};

const paginationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setStartNumber, (state, action) => {
      state.currentStartNumber = action.payload;
    });
});

export {paginationReducer};
