import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { SearchBar } from './SearchBar';

beforeEach(() =>
  render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>
  )
);

const setup = () => {
  const input = screen.getByLabelText('search-input');
  return {
    input,
    ...screen,
  };
};

describe('SearchBar', () => {
  it('Should have Logo', () => {
    expect(screen.getByAltText('Logo Mercado Libre')).toBeInTheDocument();
  });

  it('Should have placeholder text', () => {
    expect(
      screen.getByPlaceholderText(/Nunca dejes de buscar/i)
    ).toBeInTheDocument();
  });

  it('Should write on input', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { inputValue: 'test' } });
    expect(input.inputValue).toBe('test');
  });
});
