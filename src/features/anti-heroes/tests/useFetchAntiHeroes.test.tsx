import { renderHook } from "@testing-library/react-hooks";
import { wrapper } from "test-utils/testing-library-utils";

import useFetchAntiHeroes from "../hooks/useFetchAntiHeroes";

it("should fire useFetchAntiHeroes", async () => {
  const { result, waitFor } = renderHook(() => useFetchAntiHeroes(), {
    wrapper,
  });

  await waitFor(() => result.current.isSuccess);
  expect(result.current.data.data).toHaveLength(2);
});
