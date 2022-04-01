import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import Filter from './filter';
import { createMockGuitars, createMockGuitarsCount } from '../../mocks/guitars';
import {
  createMockGuitarType,
  createMockStringCount,
  createMockSortingType,
  createMockSortingOrder,
  createMockUrlFilter,
  createMockStartPrice,
  createMockEndPrice
} from '../../mocks/sort-filter-data';
import { createMockStartNumber } from '../../mocks/pagination';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  DATA: {
    guitars: createMockGuitars(),
    guitarsTotalCount: createMockGuitarsCount(),
  },
  APP: {
    currentSortingType: createMockSortingType(),
    currentSortingOrder: createMockSortingOrder(),
    currentStringCount: createMockStringCount(),
    currentGuitarType: createMockGuitarType(),
    currentUrlFilter: createMockUrlFilter(),
    currentStartPrice: createMockStartPrice(),
    currentEndPrice: createMockEndPrice(),
  },
  PAGINATION: {
    currentStartNumber: createMockStartNumber(),
  },
});

describe('Component: Filter', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Filter />
        </Router>
      </Provider>);

    expect(screen.getByTestId('checkbox-electric')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-12-strings')).toBeInTheDocument();
  });
});
