import { createReducer } from '@reduxjs/toolkit';
import { AppProcess } from '../../types/state';
import { SortingType, SortingOrder } from '../../const';
import { changeSortingOrder, changeSortingType } from '../action';

const initialState: AppProcess = {
  currentSortingType: SortingType.Default,
  currentSortingOrder: SortingOrder.Default,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSortingType, (state, action) => {
      state.currentSortingType = action.payload;
    })
    .addCase(changeSortingOrder, (state, action) => {
      state.currentSortingOrder = action.payload;
    });
});

export {initialState, appReducer};
