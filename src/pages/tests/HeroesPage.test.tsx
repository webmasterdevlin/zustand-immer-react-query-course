import { render, screen, waitFor } from "test-utils/testing-library-utils";

import HeroesPage from "../HeroesPage";

describe("HeroesPage", () => {
  it("should render HeroesPage's title", async () => {
    render(<HeroesPage />);

    const title = await screen.findByRole("heading", {
      name: "Super Heroes Page",
    });

    expect(title).toBeInTheDocument();
  });

  it("should show exact number of heroes in main content and navigation bar", async () => {
    render(<HeroesPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(2);
      expect(screen.queryByRole("total-heroes")).toHaveTextContent("2");
    });
  });
});
