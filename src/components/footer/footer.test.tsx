import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import Footer from './footer';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <Footer />
        </Router>
      </Provider>);

    expect(screen.getByTestId('footer-block')).toBeInTheDocument();
  });
});
