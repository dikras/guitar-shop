import { combineReducers } from 'redux';
import { guitarsReducer } from './guitars-reducer/guitars-reducer';
import { appReducer } from './app-reducer/app-reducer';

export enum NameSpace {
  data = 'DATA',
  app = 'APP',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsReducer,
  [NameSpace.app]: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
