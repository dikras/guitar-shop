import { createMockComments } from '../../mocks/comments';
import { initialState, commentsReducer } from '../comments-reducer/comments-reducer';
import { loadComments, loadCommentsError } from '../action';

describe('Reducer: comments-reducer', () => {
  const mockActionType = 'UNKNOWN_ACTION';

  it('without additional parameters should return initial state', () => {
    expect(commentsReducer(void 0, {type: mockActionType}))
      .toEqual(initialState);
  });

  it('load guitar\'s comments', () => {
    const mockComments = createMockComments();

    expect(commentsReducer(initialState, loadComments(mockComments)))
      .toEqual({
        ...initialState,
        comments: mockComments,
      });
  });

  it('set true if server sends comment\'s error', () => {
    expect(commentsReducer(initialState, loadCommentsError()))
      .toEqual({
        ...initialState,
        isCommentsError: true,
      });
  });

});
