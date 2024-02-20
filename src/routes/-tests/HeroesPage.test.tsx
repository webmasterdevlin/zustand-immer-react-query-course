import { render, screen } from '../../test-utils/testing-library-utils';
import Heroes from '../heroes';

// integration testing
describe('Heroes Page', () => {
  it('should render hero lists', async () => {
    render(<Heroes />);

    const heroList = await screen.findAllByTestId('hero-card');
    expect(heroList.length).toEqual(2);
  });
});
