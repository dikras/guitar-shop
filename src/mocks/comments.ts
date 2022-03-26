import {datatype, lorem, internet} from 'faker';
import { Comment } from '../types/comment';

const createMockComment = (): Comment => ({
  id: datatype.string(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  comment: lorem.sentences(),
  rating: datatype.number(),
  createAt: datatype.datetime().toISOString(),
  guitarId: datatype.number(),
});

const createMockComments = (): Comment[] => new Array(5).fill(null).map(() => createMockComment());

export {createMockComment, createMockComments};
