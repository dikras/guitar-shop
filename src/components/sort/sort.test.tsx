import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import Sort from './sort';
import { createMockSortingType } from '../../mocks/sort-filter-data';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  currentSortingType: createMockSortingType(),
});

describe('Component: Sort', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Sort />
        </Router>
      </Provider>);

    expect(screen.getByTestId('sorting-block')).toBeInTheDocument();
  });
});
