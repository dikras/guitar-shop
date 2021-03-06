import { SortingType, SortingOrder } from '../const';
import { Guitar, GuitarNoComments, GuitarToCount } from './guitar';
import { RootState } from '../store/root-reducer';
import { Comment } from './comment';

export type GuitarsData = {
  guitarsNoComments: GuitarNoComments[],
  guitars: Guitar[],
  guitarsTotalCount: number,
  guitar: GuitarNoComments | null,
  isGuitarError: boolean,
  isGuitarLoading: boolean;
};

export type CommentsData = {
  comments: Comment[],
  isCommentsError: boolean,
};

export type AppProcess = {
  currentSortingType: SortingType,
  currentSortingOrder: SortingOrder,
};

export type PaginationProcess = {
  currentStartNumber: number,
  currentPageNumber: number,
};

export type SearchGuitarByNameProcess = {
  currentGuitarName: string,
  guitarsByName: GuitarNoComments[],
};

export type CartProcess = {
  guitarsInCart: GuitarNoComments[],
  guitarsToCount: GuitarToCount[],
  discount: number,
  coupon: string,
}

export type State = RootState;
