import {datatype, lorem, internet} from 'faker';
import { Comment, CommentPost } from '../types/comment';

const createMockComment = (): Comment => ({
  id: datatype.number.toString(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  comment: lorem.sentences(),
  rating: datatype.number(),
  createAt: datatype.datetime().toISOString(),
  guitarId: datatype.number(),
});

const createMockPost = (): CommentPost => ({
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  comment: lorem.sentences(),
  rating: datatype.number(),
  guitarId: datatype.number(),
});

const createMockComments = (): Comment[] => new Array(5).fill(null).map(() => createMockComment());

const createMockId = (): string => datatype.number.toString();

export {createMockComment, createMockComments, createMockPost, createMockId};
