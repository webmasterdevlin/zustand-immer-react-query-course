import { render, screen, waitFor } from "test-utils/testing-library-utils";
import AntiHeroesPage from "pages/AntiHeroesPage";
import userEvent from "@testing-library/user-event";

describe("Anti Heroes Page", () => {
  it("should render title", () => {
    render(<AntiHeroesPage />);

    const title = screen.getByTestId("title-page");
    expect(title).toBeInTheDocument();
  });

  it("should render loading message", async () => {
    render(<AntiHeroesPage />);

    const loading = screen.getByTestId("loading");
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should save character button be in disabled", () => {
    render(<AntiHeroesPage />);

    const saveCharacterButton = screen.getByTestId("save-character");
    expect(saveCharacterButton).toBeDisabled();
  });

  it("should show exact number of anti heroes in main content and navigation bar", async () => {
    render(<AntiHeroesPage />);

    const cards = await screen.findAllByTestId("card");
    expect(cards).toHaveLength(2);
    const counter = screen.getByTestId("total-anti-heroes");
    expect(counter).toHaveTextContent("2");
  });

  it("should add new anti hero", async () => {
    const { rerender } = render(<AntiHeroesPage />);

    const firstNameTextInput = await screen.findByLabelText("First Name");
    expect(firstNameTextInput).toBeInTheDocument();
    userEvent.type(firstNameTextInput, "Devlin");
    expect(firstNameTextInput).toHaveValue("Devlin");

    const lastNameTextInput = await screen.findByLabelText("Last Name");
    expect(lastNameTextInput).toBeInTheDocument();
    userEvent.type(lastNameTextInput, "Duldulao");
    expect(lastNameTextInput).toHaveValue("Duldulao");

    const houseTextInput = await screen.findByLabelText("House");
    expect(houseTextInput).toBeInTheDocument();
    userEvent.type(houseTextInput, "Marvel");
    expect(houseTextInput).toHaveValue("Marvel");

    const knownAsTextInput = await screen.findByLabelText("Known As");
    expect(knownAsTextInput).toBeInTheDocument();
    userEvent.type(knownAsTextInput, "React Man");
    expect(knownAsTextInput).toHaveValue("React Man");

    const saveCharacterButton = await screen.findByTestId("save-character");
    expect(saveCharacterButton).toBeEnabled();
    userEvent.click(saveCharacterButton);

    rerender(<AntiHeroesPage />);

    await waitFor(() => {
      const cards = screen.getAllByTestId("card");
      expect(cards).toHaveLength(3);
      const counter = screen.getByTestId("total-anti-heroes");
      expect(counter).toHaveTextContent("3");
    });
  });

  it("should mark an anti hero", async () => {
    render(<AntiHeroesPage />);

    const buttons = await screen.findAllByTestId("mark-button");
    expect(buttons).toHaveLength(2);
    userEvent.click(buttons[0]);
    const cards = await screen.findAllByTestId("card");
    expect(cards[0]).toHaveTextContent("marked");
  });

  it("should remove an anti hero from the store", async () => {
    render(<AntiHeroesPage />);

    const buttons = await screen.findAllByRole("button", {
      name: "Remove",
    });
    userEvent.click(buttons[0]);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("total-anti-heroes")).toHaveTextContent("1");
  });

  it("should delete a hero from the database", async () => {
    render(<AntiHeroesPage />);

    const buttons = await screen.findAllByRole("button", {
      name: "DELETE in DB",
    });
    userEvent.click(buttons[0]);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("total-anti-heroes")).toHaveTextContent("1");
  });
});
