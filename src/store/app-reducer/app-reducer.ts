import { createReducer } from '@reduxjs/toolkit';
import { FilterProcess } from '../../types/state';
import {
  APIRoute,
  SortingType,
  SortingOrder,
  GuitarType,
  StringCount,
  InitialPrice
} from '../../const';
import {
  changeGuitarType,
  changeStringCount,
  addFilterAction,
  removeFilterAction,
  changeSortingOrder,
  changeSortingType,
  setStartPrice,
  setEndPrice
} from '../action';

const initialState: FilterProcess = {
  currentSortingType: SortingType.Default,
  currentSortingOrder: SortingOrder.Default,
  currentStringCount: StringCount.Default,
  currentGuitarType: GuitarType.Default,
  currentUrlFilter: APIRoute.Guitars,
  currentStartPrice: InitialPrice.Min,
  currentEndPrice: InitialPrice.Max,
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
    })
    .addCase(setStartPrice, (state, action) => {
      state.currentStartPrice = action.payload;
    })
    .addCase(setEndPrice, (state, action) => {
      state.currentEndPrice = action.payload;
    });
});

export {initialState, appReducer};
