import { createReducer } from '@reduxjs/toolkit';
import { AppProcess } from '../../types/state';
import { SortingType, SortingOrder, GuitarType, StringCount } from '../../const';
import { changeSortingType, changeSortingOrder, changeGuitarType, changeStringCount } from '../action';

const initialState: AppProcess = {
  currentSortingType: SortingType.Default,
  currentSortingOrder: SortingOrder.Default,
  currentGuitarType: GuitarType.Default,
  currentStringCount: StringCount.Default,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSortingType, (state, action) => {
      state.currentSortingType = action.payload;
    })
    .addCase(changeSortingOrder, (state, action) => {
      state.currentSortingOrder = action.payload;
    })
    .addCase(changeGuitarType, (state, action) => {
      state.currentGuitarType = action.payload;
    })
    .addCase(changeStringCount, (state, action) => {
      state.currentStringCount = action.payload;
    });
});

export {appReducer};
