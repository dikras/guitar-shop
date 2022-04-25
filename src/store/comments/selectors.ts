import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Comment } from '../../types/comment';

export const getSortedCommentsByDate = (state: State): Comment[] => [...state[NameSpace.comments].comments].sort((a , b) => new Date(a.createAt) > new Date(b.createAt) ? -1 : 1);
export const getIsCommentsError = (state: State): boolean => state[NameSpace.comments].isCommentsError;
export const getCommentsTotalCount = (state: State): number => state[NameSpace.comments].comments.length;
