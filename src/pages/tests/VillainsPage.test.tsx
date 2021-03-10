import { render, screen, waitFor } from "test-utils/testing-library-utils";
import VillainsPage from "pages/VillainsPage";

describe("VillainsPage", () => {
  it("should render VillainsPage's title", async () => {
    render(<VillainsPage />);

    const title = await screen.findByRole("heading", {
      name: "Super Villains Page",
    });

    expect(title).toBeInTheDocument();
  });

  it("should render loading message", async () => {
    render(<VillainsPage />);

    const loading = await screen.findByRole("heading", {
      name: "Loading.. Please wait..",
    });
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should save character button be in disabled", async () => {
    render(<VillainsPage />);

    const saveCharacterButton = await screen.findByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeDisabled();
  });

  it("should show exact number of villains in main content and navigation bar", async () => {
    render(<VillainsPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(2);
      expect(screen.queryByRole("total-villains")).toHaveTextContent("2");
    });
  });
});
