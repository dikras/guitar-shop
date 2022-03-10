import { combineReducers } from 'redux';
import { guitarsReducer } from './guitars-reducer/guitars-reducer';

export enum NameSpace {
  data = 'DATA',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
