import { render, screen, waitFor } from "test-utils/testing-library-utils";
import HeroesPage from "pages/HeroesPage";

describe("HeroesPage", () => {
  it("should render HeroesPage's title", async () => {
    render(<HeroesPage />);

    const title = await screen.findByRole("heading", {
      name: "Super Heroes Page",
    });

    expect(title).toBeInTheDocument();
  });

  it("should render loading message", async () => {
    render(<HeroesPage />);

    const loading = await screen.findByRole("heading", {
      name: "Loading.. Please wait..",
    });
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should save character button be in disabled", async () => {
    render(<HeroesPage />);

    const saveCharacterButton = await screen.findByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeDisabled();
  });

  it("should show exact number of heroes in main content and navigation bar", async () => {
    render(<HeroesPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(2);
      expect(screen.queryByRole("total-heroes")).toHaveTextContent("2");
    });
  });
});
