import { createReducer } from '@reduxjs/toolkit';
import { PaginationProcess } from '../../types/state';
import { PaginationNumber } from '../../const';
import { setStartNumber, setCurrentPageNumber } from '../action';

const initialState: PaginationProcess = {
  currentStartNumber: PaginationNumber.InitialStart,
  currentPageNumber: PaginationNumber.FirstPage,
};

const paginationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setStartNumber, (state, action) => {
      state.currentStartNumber = action.payload;
    })
    .addCase(setCurrentPageNumber, (state, action) => {
      state.currentPageNumber = action.payload;
    });
});

export {initialState, paginationReducer};
