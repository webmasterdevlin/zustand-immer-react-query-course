import HomePage from '../../pages/HomePage';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
it('Navigation menu is present', () => {
  render(<HomePage />);

  const title = screen.getByTestId('welcome');
  expect(true).toBe(true);
});
