import { render, screen } from "test-utils/testing-library-utils";

import VillainsPage from "../VillainsPage";

describe("VillainsPage", () => {
  it("should render VillainsPage's title", async () => {
    render(<VillainsPage />);

    const title = await screen.findByRole("heading", {
      name: "Super Villains Page",
    });

    expect(title).toBeInTheDocument();
  });
});
