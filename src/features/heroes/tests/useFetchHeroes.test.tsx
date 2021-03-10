import { QueryClientProvider } from "react-query";
import { renderHook } from "@testing-library/react-hooks";
import useFetchHeroes from "../hooks/useFetchHeroes";
import { queryClient } from "../../../App";

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

it("should fire useFetchHeroes", async () => {
  const { result, waitFor } = renderHook(() => useFetchHeroes(), {
    wrapper,
  });

  await waitFor(() => result.current.isSuccess);
  expect(result.current.data.data).toHaveLength(2);
});
