import { createReducer } from '@reduxjs/toolkit';
import { FilterProcess } from '../../types/state';
import { INITIAL_URL_FILTER, GuitarType, StringCount } from '../../const';
import { changeGuitarType, changeStringCount, addFilterAction, removeFilterAction } from '../action';

const initialState: FilterProcess = {
  currentGuitarType: GuitarType.Default,
  currentStringCount: StringCount.Default,
  currentUrlFilter: INITIAL_URL_FILTER,
};

const filterReducer = createReducer(initialState, (builder) => {
  builder
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

export {filterReducer};
