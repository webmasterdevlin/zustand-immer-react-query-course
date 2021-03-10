import { render, screen, waitFor } from "test-utils/testing-library-utils";

import VillainsPage from "../VillainsPage";

describe("VillainsPage", () => {
  it("should render VillainsPage's title", async () => {
    render(<VillainsPage />);

    const title = await screen.findByRole("heading", {
      name: "Super Villains Page",
    });

    expect(title).toBeInTheDocument();
  });

  it("should show exact number of villains in main content and navigation bar", async () => {
    render(<VillainsPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(2);
      expect(screen.queryByRole("total-villains")).toHaveTextContent("2");
    });
  });
});
