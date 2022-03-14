import { createReducer } from '@reduxjs/toolkit';
import { AppProcess } from '../../types/state';
import { SortingType, SortingRanking, GuitarType, StringCount } from '../../const';
import { changeSortingType, changeSortingRanking, changeGuitarType, changeStringCount } from '../action';

const initialState: AppProcess = {
  currentSortingType: SortingType.Default,
  currentSortingRanking: SortingRanking.Default,
  currentGuitarType: GuitarType.Default,
  currentStringCount: StringCount.Default,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSortingType, (state, action) => {
      state.currentSortingType = action.payload;
    })
    .addCase(changeSortingRanking, (state, action) => {
      state.currentSortingRanking = action.payload;
    })
    .addCase(changeGuitarType, (state, action) => {
      state.currentGuitarType = action.payload;
    })
    .addCase(changeStringCount, (state, action) => {
      state.currentStringCount = action.payload;
    });
});

export {appReducer};
