import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import LoadingScreen from './loading-screen';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <LoadingScreen />
        </Router>
      </Provider>);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
