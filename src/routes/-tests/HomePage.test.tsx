import HomePage from '../../pages/HomePage';
import { render, screen } from '../../test-utils/testing-library-utils';

// component testing
describe('Home Page', () => {
  it('should have welcome', () => {
    render(<HomePage />);

    const welcome = screen.getByTestId('welcome-message');
    expect(welcome).toHaveTextContent(/welcome/i);
  });
});
