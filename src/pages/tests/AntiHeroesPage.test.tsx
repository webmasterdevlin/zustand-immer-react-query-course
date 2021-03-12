import { render, screen, waitFor } from "test-utils/testing-library-utils";
import AntiHeroesPage from "pages/AntiHeroesPage";
import userEvent from "@testing-library/user-event";

describe("AntiHeroesPage", () => {
  it("should render AntiHeroesPage's title", async () => {
    render(<AntiHeroesPage />);

    const title = await screen.findByRole("heading", {
      name: "Anti Heroes Page",
    });

    expect(title).toBeInTheDocument();
  });

  it("should render loading message", async () => {
    render(<AntiHeroesPage />);

    const loading = await screen.findByRole("heading", {
      name: "Loading.. Please wait..",
    });
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should save character button be in disabled", async () => {
    render(<AntiHeroesPage />);

    const saveCharacterButton = await screen.findByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeDisabled();
  });

  it("should show exact number of anti heroes in main content and navigation bar", async () => {
    render(<AntiHeroesPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(2);
      expect(screen.queryByRole("total-anti-heroes")).toHaveTextContent("2");
    });
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

    const saveCharacterButton = await screen.findByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeEnabled();
    userEvent.click(saveCharacterButton);

    rerender(<AntiHeroesPage />);

    await waitFor(() => {
      const cards = screen.getAllByRole("card");
      expect(cards).toHaveLength(3);
      const counter = screen.getByRole("total-anti-heroes");
      expect(counter).toHaveTextContent("3");
    });
  });
});
