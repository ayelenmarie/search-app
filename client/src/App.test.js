import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

beforeEach(() =>
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
);

describe('App', () => {
  it('Must have Search Bar', () => {
    expect(
      screen.getByPlaceholderText('Nunca dejes de buscar')
    ).toBeInTheDocument();
  });
});
