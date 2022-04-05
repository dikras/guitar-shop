import { createReducer } from '@reduxjs/toolkit';
import { PaginationProcess } from '../../types/state';
import { PaginationNumber } from '../../const';
import { setStartNumber, setCurrentPageNumber } from '../action';

const initialState: PaginationProcess = {
  currentStartNumber: PaginationNumber.InitialStart,
  isPaginationDone: false,
  currentPage: 1,
};

const paginationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setStartNumber, (state, action) => {
      state.currentStartNumber = action.payload;
      state.isPaginationDone = true;
    })
    .addCase(setCurrentPageNumber, (state, action) => {
      state.currentPage = action.payload;
    });
});

export {initialState, paginationReducer};
