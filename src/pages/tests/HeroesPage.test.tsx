import { render, screen } from "test-utils/testing-library-utils";

import HeroesPage from "../HeroesPage";

describe("HeroesPage", () => {
  it("should render HeroesPage's title", async () => {
    render(<HeroesPage />);

    const title = await screen.findByRole("heading", {
      name: "Super Heroes Page",
    });

    expect(title).toBeInTheDocument();
  });
});
