import { createReducer } from '@reduxjs/toolkit';
import { SortingType, SortingOrder } from '../../const';
import { SortProcess } from '../../types/state';
import { changeSortingType, changeSortingOrder } from '../action';

const initialState: SortProcess = {
  currentSortingType: SortingType.Default,
  currentSortingOrder: SortingOrder.Default,
};

const sortReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSortingType, (state, action) => {
      state.currentSortingType = action.payload;
    })
    .addCase(changeSortingOrder, (state, action) => {
      state.currentSortingOrder = action.payload;
    });
});

export {sortReducer};
