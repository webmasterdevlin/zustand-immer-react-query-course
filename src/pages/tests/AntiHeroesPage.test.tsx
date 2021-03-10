import { render, screen } from "test-utils/testing-library-utils";

import AntiHeroesPage from "../AntiHeroesPage";

describe("AntiHeroesPage", () => {
  it("should render AntiHeroesPage's title", async () => {
    render(<AntiHeroesPage />);

    const title = await screen.findByRole("heading", {
      name: "Anti Heroes Page",
    });

    expect(title).toBeInTheDocument();
  });
});
