import { combineReducers } from 'redux';
import { guitarsReducer } from './guitars-reducer/guitars-reducer';
import { commentsReducer } from './comments-reducer/comments-reducer';
import { appReducer } from './app-reducer/app-reducer';
import { paginationReducer } from './pagination-reducer/pagination-reducer';
import { searchGuitarNameReducer } from './search-reducer/search-reducer';
import { cartReducer } from './cart-reducer/cart-reducer';

export enum NameSpace {
  data = 'DATA',
  app = 'APP',
  pagination = 'PAGINATION',
  search = 'SEARCH',
  comments ='COMMENTS',
  cart = 'CART',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsReducer,
  [NameSpace.comments]: commentsReducer,
  [NameSpace.app]: appReducer,
  [NameSpace.pagination]: paginationReducer,
  [NameSpace.search]: searchGuitarNameReducer,
  [NameSpace.cart]: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
