import { renderHook } from "@testing-library/react-hooks";
import { wrapper } from "test-utils/testing-library-utils";

import useFetchVillains from "../hooks/useFetchVillains";

it("should fire useFetchVillains", async () => {
  const { result, waitFor } = renderHook(() => useFetchVillains(), {
    wrapper,
  });

  await waitFor(() => result.current.isSuccess);
  expect(result.current.data.data).toHaveLength(2);
});
