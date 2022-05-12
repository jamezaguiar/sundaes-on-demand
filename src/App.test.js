import { render, screen } from '@testing-library/react';
import App from './App';

test('should render `App`', () => {
  render(<App />);
  const text = screen.getByText('App');
  expect(text).toBeInTheDocument();
});
