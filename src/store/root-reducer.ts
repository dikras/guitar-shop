import { combineReducers } from 'redux';
import { guitarsReducer } from './guitars-reducer/guitars-reducer';
import { appReducer } from './app-reducer/app-reducer';
import { paginationReducer } from './pagination-reducer/pagination-reducer';

export enum NameSpace {
  data = 'DATA',
  app = 'APP',
  pagination = 'PAGINATION',
  search = 'SEARCH',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsReducer,
  [NameSpace.app]: appReducer,
  [NameSpace.pagination]: paginationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
