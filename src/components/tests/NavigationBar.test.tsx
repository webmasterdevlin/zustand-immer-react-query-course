import HomePage from '../../pages/HomePage';
import { render, screen } from '@testing-library/react';

it('Navigation menu is present', () => {
  render(<HomePage />);

  const title = screen.getByTestId('welcome');
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent(/welcome/i);
  expect(true).toBe(true);
});
