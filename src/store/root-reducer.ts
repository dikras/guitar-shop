import { combineReducers } from 'redux';
import { guitarsReducer } from './guitars-reducer/guitars-reducer';
import { commentsReducer } from './comments/comments-reducer';
import { appReducer } from './app-reducer/app-reducer';
import { paginationReducer } from './pagination-reducer/pagination-reducer';
import { searchGuitarNameReducer } from '../store/search-reducer/search-reducer';

export enum NameSpace {
  data = 'DATA',
  app = 'APP',
  pagination = 'PAGINATION',
  search = 'SEARCH',
  comments ='COMMENTS',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsReducer,
  [NameSpace.comments]: commentsReducer,
  [NameSpace.app]: appReducer,
  [NameSpace.pagination]: paginationReducer,
  [NameSpace.search]: searchGuitarNameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
