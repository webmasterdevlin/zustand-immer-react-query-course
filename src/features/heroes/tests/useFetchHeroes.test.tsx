import { renderHook } from "@testing-library/react-hooks";
import useFetchHeroes from "../hooks/useFetchHeroes";
import { wrapper } from "test-utils/testing-library-utils";

describe("Heroes hooks", () => {
  it("should fire useFetchHeroes", async () => {
    const { result, waitFor } = renderHook(() => useFetchHeroes(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data.data).toHaveLength(2);
  });
});
