import {
  render,
  screen,
  waitFor,
} from '../../test-utils/testing-library-utils';
import HeroesPage from '../../pages/HeroesPage';
import userEvent from '@testing-library/user-event';
import { queryClient } from '../../App';

describe('Heroes Page', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('should render title', () => {
    render(<HeroesPage />);

    const title = screen.getByTestId('title-page');
    expect(title).toBeInTheDocument();
  });

  it('should render loading message', async () => {
    render(<HeroesPage />);

    const loading = screen.getByTestId('loading');
    expect(loading).toHaveTextContent('Loading.. Please wait..');
  });

  it('should save character button be in disabled', () => {
    render(<HeroesPage />);

    const saveCharacterButton = screen.getByTestId('save-character');
    expect(saveCharacterButton).toBeDisabled();
  });

  it('should show exact number of heroes in main content and navigation bar', async () => {
    render(<HeroesPage />);

    const cards = await screen.findAllByTestId('card');
    expect(cards).toHaveLength(2);
    const counter = screen.getByTestId('total-heroes');
    expect(counter).toHaveTextContent('2');
  });

  it('should add new hero', async () => {
    const { rerender } = render(<HeroesPage />);

    const firstNameTextInput = await screen.findByLabelText('First Name');
    expect(firstNameTextInput).toBeInTheDocument();
    userEvent.type(firstNameTextInput, 'Devlin');
    expect(firstNameTextInput).toHaveValue('Devlin');

    const lastNameTextInput = await screen.findByLabelText('Last Name');
    expect(lastNameTextInput).toBeInTheDocument();
    userEvent.type(lastNameTextInput, 'Duldulao');
    expect(lastNameTextInput).toHaveValue('Duldulao');

    const houseTextInput = await screen.findByLabelText('House');
    expect(houseTextInput).toBeInTheDocument();
    userEvent.type(houseTextInput, 'Marvel');
    expect(houseTextInput).toHaveValue('Marvel');

    const knownAsTextInput = await screen.findByLabelText('Known As');
    expect(knownAsTextInput).toBeInTheDocument();
    userEvent.type(knownAsTextInput, 'React Man');
    expect(knownAsTextInput).toHaveValue('React Man');

    const saveCharacterButton = await screen.findByTestId('save-character');
    expect(saveCharacterButton).toBeEnabled();
    userEvent.click(saveCharacterButton);

    rerender(<HeroesPage />);

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(3);
      const counter = screen.getByTestId('total-heroes');
      expect(counter).toHaveTextContent('3');
    });
  });

  it('should mark a hero', async () => {
    render(<HeroesPage />);

    const buttons = await screen.findAllByTestId('mark-button');
    expect(buttons).toHaveLength(2);
    userEvent.click(buttons[0]);

    const cards = await screen.findAllByTestId('card');
    expect(cards[0]).toHaveTextContent('marked');
  });

  it('should remove a hero from the store', async () => {
    render(<HeroesPage />);

    const buttons = await screen.findAllByTestId('remove-button');

    userEvent.click(buttons[0]);

    expect(await screen.findByTestId('card')).toBeInTheDocument();
    expect(await screen.findByTestId('total-heroes')).toHaveTextContent('1');
  });

  it('should delete a hero from the database', async () => {
    render(<HeroesPage />);

    const buttons = await screen.findAllByTestId('delete-button');
    userEvent.click(buttons[0]);

    expect(await screen.findByTestId('card')).toBeInTheDocument();
    expect(await screen.findByTestId('total-heroes')).toHaveTextContent('1');
  });
});
