import { combineReducers } from 'redux';
import { guitarsReducer } from './guitars-reducer/guitars-reducer';
import { filterReducer } from './filter-reducer/filter-reducer';
import { sortReducer } from './sort-reducer/sort-reducer';

export enum NameSpace {
  data = 'DATA',
  filter = 'FILTER',
  sort = 'SORT',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsReducer,
  [NameSpace.filter]: filterReducer,
  [NameSpace.sort]: sortReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
