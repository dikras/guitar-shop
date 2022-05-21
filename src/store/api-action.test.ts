import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import {Action} from 'redux';
import { APIRoute, QueryParam, COUPON_VALUES } from '../const';
import {
  createMockGuitarsWithoutComments,
  createMockGuitarWithoutComments,
  createMockGuitars
} from '../mocks/guitars';
import { createMockComments, createMockComment, createMockPost, createMockId } from '../mocks/comments';
import {
  loadGuitarsByName,
  loadGuitar,
  loadComments,
  loadGuitarsNoComments,
  loadGuitars,
  loadDiscount
} from '../store/action';
import {
  fetchGuitarsByName,
  fetchGuitar,
  fetchComments,
  loadFilteredGuitars,
  loadSortedGuitars,
  fetchGuitars,
  uploadReview,
  fetchDiscount
} from '../store/api-action';
import { lorem, datatype} from 'faker';

let mockAPI: MockAdapter;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: any;
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

beforeEach(() => {
  mockAPI = new MockAdapter(api);
  store = mockStore({});
});

afterEach(() => {
  mockAPI.reset();
});

describe('Async actions', () => {
  const mockGuitars = createMockGuitars();
  const mockGuitarsWithoutComments = createMockGuitarsWithoutComments();
  const mockGuitarWithoutComments = createMockGuitarWithoutComments();
  const mockGuitarComments = createMockComments();
  const mockGuitarComment = createMockComment();
  const mockPost = createMockPost();
  const mockId = createMockId();
  const mockDiscount = datatype.number();

  it('should dispatch loadGuitarsByName when GET /guitars?name_like=word', async () => {
    mockAPI
      .onGet(`${APIRoute.GuitarsNoComments}?${QueryParam.NameLike}=${lorem.word}`)
      .reply(200, mockGuitarsWithoutComments);

    await store.dispatch(fetchGuitarsByName(`${APIRoute.GuitarsNoComments}?${QueryParam.NameLike}=${lorem.word}`));

    expect(store.getActions()).toEqual([
      loadGuitarsByName(mockGuitarsWithoutComments),
    ]);
  });

  it('should dispatch loadGuitarsNoComments with id when GET /guitars', async () => {
    mockAPI
      .onGet(APIRoute.GuitarsNoComments)
      .reply(200, mockGuitarsWithoutComments);

    await store.dispatch(fetchGuitars());

    expect(store.getActions()).toEqual([
      loadGuitarsNoComments(mockGuitarsWithoutComments),
    ]);
  });

  it('should dispatch loadGuitar with id when GET /guitars/id', async () => {
    mockAPI
      .onGet(`${APIRoute.GuitarsNoComments}/${datatype.number}`)
      .reply(200, mockGuitarWithoutComments);

    await store.dispatch(fetchGuitar(`${datatype.number}`));

    expect(store.getActions()).toEqual([
      loadGuitar(mockGuitarWithoutComments),
    ]);
  });

  it('should dispatch loadComments for guitar with id when GET /guitars/id/comments', async () => {
    mockAPI
      .onGet(`${APIRoute.GuitarsNoComments}/${datatype.number}${APIRoute.Comments}`)
      .reply(200, mockGuitarComments);

    await store.dispatch(fetchComments(`${datatype.number}`));

    expect(store.getActions()).toEqual([
      loadComments(mockGuitarComments),
    ]);
  });

  it('should load sorted guitars when GET /guitars?_embed=comments&_sort=...', async () => {
    mockAPI
      .onGet(`${APIRoute.Guitars}&_sort=${lorem.word}`)
      .reply(200, mockGuitars);

    await store.dispatch(loadSortedGuitars(`_sort=${lorem.word}`));

    expect(store.getActions()).toEqual([
      loadGuitars(mockGuitars),
    ]);
  });

  it(`should load filtered guitars by type and strings count when GET
      /guitars?_embed=comments&type=...&stringCount=...`, async () => {
    mockAPI
      .onGet(`${APIRoute.Guitars}&type=${lorem.word}&stringCount=${datatype.number}`)
      .reply(200, mockGuitars);

    await store.dispatch(loadFilteredGuitars(`type=${lorem.word}&stringCount=${datatype.number}`));

    expect(store.getActions()).toEqual([
      loadGuitars(mockGuitars),
    ]);
  });

  it('should post comment when POST /comments and load new comments when GET /guitars/id/comments', async () => {
    mockAPI
      .onPost(APIRoute.Comments, mockPost)
      .reply(200, mockGuitarComment);

    mockAPI
      .onGet(`${APIRoute.GuitarsNoComments}/${mockId}${APIRoute.Comments}`)
      .reply(200, mockGuitarComments);

    await store.dispatch(uploadReview(mockPost, mockId));

    expect(store.getActions()).toEqual([
      loadComments(mockGuitarComments),
    ]);
  });

  it('should dispatch loadDiscount with coupon-object when POST /coupons', async () => {
    mockAPI
      .onPost(APIRoute.Coupon)
      .reply(200, mockDiscount);

    await store.dispatch(fetchDiscount({coupon: COUPON_VALUES[0]}));

    expect(store.getActions()).toEqual([
      loadDiscount(mockDiscount),
    ]);
  });

});
