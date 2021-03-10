import { renderHook } from "@testing-library/react-hooks";
import { wrapper } from "test-utils/testing-library-utils";
import useFetchHeroes from "../hooks/useFetchHeroes";

describe("Heroes hooks", () => {
  it("should fire useFetchHeroes", async () => {
    const { result, waitFor } = renderHook(() => useFetchHeroes(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data.data).toHaveLength(2);
  });
});
