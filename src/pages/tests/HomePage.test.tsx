import HomePage from '../../pages/HomePage';
import { render, screen } from '../../test-utils/testing-library-utils';

describe('Home Page', () => {
  it('should have welcome back', () => {
    render(<HomePage />);

    const welcomeBack = screen.getByTestId('welcome-message');
    expect(welcomeBack).toHaveTextContent(/welcome/i);
  });
});
