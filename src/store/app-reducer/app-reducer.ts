import { createReducer } from '@reduxjs/toolkit';
import { FilterProcess } from '../../types/state';
import { INITIAL_URL_FILTER, SortingType, SortingOrder, GuitarType, StringCount } from '../../const';
import { changeGuitarType, changeStringCount, addFilterAction, removeFilterAction, changeSortingOrder, changeSortingType } from '../action';

const initialState: FilterProcess = {
  currentGuitarType: GuitarType.Default,
  currentStringCount: StringCount.Default,
  currentSortingType: SortingType.Default,
  currentSortingOrder: SortingOrder.Default,
  currentUrlFilter: INITIAL_URL_FILTER,
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
    })
    .addCase(addFilterAction, (state, action) => {
      state.currentUrlFilter += action.payload;
    })
    .addCase(removeFilterAction, (state, action) => {
      state.currentUrlFilter = state.currentUrlFilter.replace(action.payload, '');
    });
});

export {appReducer};
