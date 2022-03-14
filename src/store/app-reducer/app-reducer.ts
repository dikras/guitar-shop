import { createReducer } from '@reduxjs/toolkit';
import { AppProcess } from '../../types/state';
import { SortingType, SortingRanking } from '../../const';
import { changeSortingType, changeSortingRanking } from '../action';

const initialState: AppProcess = {
  currentSortingType: SortingType.Default,
  currentSortingRanking: SortingRanking.Default,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSortingType, (state, action) => {
      state.currentSortingType = action.payload;
    })
    .addCase(changeSortingRanking, (state, action) => {
      state.currentSortingRanking = action.payload;
    });
});

export {appReducer};
