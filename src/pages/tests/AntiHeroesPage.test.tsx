import { render, screen, waitFor } from "test-utils/testing-library-utils";
import AntiHeroesPage from "pages/AntiHeroesPage";

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
});
