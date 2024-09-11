import { render, screen } from '../../test-utils/testing-library-utils';
import Index from '../index';

// component testing
describe('Home Page', () => {
  it('should have welcome', () => {
    render(<Index />);

    const welcome = screen.getByTestId('welcome-message');
    expect(welcome).toHaveTextContent(/welcome/i);
  });
});
