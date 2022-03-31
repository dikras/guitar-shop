import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import {Action} from 'redux';
import { APIRoute, PaginationNumber, FilterQueryParam } from '../const';
import { createMockGuitars } from '../mocks/guitars';
import { createMockUrlFilter } from '../mocks/sort-filter-data';
import { loadGuitars } from '../store/action';
import { fetchGuitars, loadSortFilterGuitars } from '../store/api-action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  const mockGuitars = createMockGuitars();
  const mockUrlFilter = createMockUrlFilter();

  it('should dispatch loadGuitars when GET /guitars?_embed=comments&', async () => {
    const store = mockStore();

    mockAPI
      .onGet(`${APIRoute.Guitars}&_start=${PaginationNumber.InitialStart}&_limit=${PaginationNumber.Limit}`)
      .reply(200, mockGuitars);

    await store.dispatch(fetchGuitars());

    expect(store.getActions()).toEqual([
      loadGuitars(mockGuitars),
    ]);
  });

  it('should dispatch loadGuitars when GET /guitars?_embed=comments&&_sort=price&', async () => {
    const store = mockStore();

    mockAPI
      .onGet(`${APIRoute.Guitars}${FilterQueryParam.SortByPrice}`)
      .reply(200, mockGuitars);

    await store.dispatch(loadSortFilterGuitars(`${APIRoute.Guitars}${mockUrlFilter}`));

    expect(store.getActions()).toEqual([
      loadGuitars(mockGuitars),
    ]);
  });

});
