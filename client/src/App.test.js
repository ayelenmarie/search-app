import {
  render,
  fireEvent,
  screen,
  act,
  cleanup,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from './App';

jest.mock('axios');

afterEach(cleanup);

beforeEach(() =>
  act(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  })
);

describe('App', () => {
  test('Should type into input and display search results', async () => {
    // Find input
    const input = screen.queryByLabelText('search-input');
    // Check results are not showing yet
    expect(screen.queryByLabelText('search-results')).not.toBeInTheDocument();

    // Define our search string
    const searchString = 'nintendo';

    // Writes search string into input
    fireEvent.change(input, { target: { inputValue: searchString } });

    // Check our input value is the searched string
    expect(input.inputValue).toBe(searchString);

    // Clicks on search button

    act(() => {
      fireEvent.click(screen.getByLabelText('search-button'));
    });

    // Check if mocked was triggered
    expect(axios.get).toHaveBeenCalled();
  });
});
