import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import {Action} from 'redux';
import { APIRoute, QueryParam } from '../const';
import { createMockGuitarsWithoutComments } from '../mocks/guitars';
import { loadGuitarsByName } from '../store/action';
import { fetchGuitarsByName } from '../store/api-action';
import {lorem} from 'faker';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  const mockGuitarsWithoutComments = createMockGuitarsWithoutComments();

  it('should dispatch loadGuitarsByName when GET /guitars?name_like=word', async () => {
    const store = mockStore();

    mockAPI
      .onGet(`${APIRoute.GuitarsNoComments}?${QueryParam.NameLike}=${lorem.word}`)
      .reply(200, mockGuitarsWithoutComments);

    await store.dispatch(fetchGuitarsByName(`${APIRoute.GuitarsNoComments}?${QueryParam.NameLike}=${lorem.word}`));

    expect(store.getActions()).toEqual([
      loadGuitarsByName(mockGuitarsWithoutComments),
    ]);
  });

});
