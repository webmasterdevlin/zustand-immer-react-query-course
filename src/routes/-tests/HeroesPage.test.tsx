import { render, screen } from '../../test-utils/testing-library-utils';
import HeroesPage from '../HeroesPage';

// integration testing
describe('Heroes Page', () => {
  it('should render hero lists', async () => {
    render(<HeroesPage />);

    const heroList = await screen.findAllByTestId('hero-card');
    expect(heroList.length).toEqual(2);
  });
});
