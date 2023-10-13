import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import useFetchHeroes from '../hooks/useFetchHeroes';
import useRemoveHero from '../hooks/useRemoveHero';

describe('Heroes hooks', () => {
  it('should fire useFetchHeroes', async () => {
    const { result, waitFor: addWaitFor } = renderHook(
      () => {
        return useFetchHeroes();
      },
      {
        wrapper: createQueryProviderWrapper(),
      },
    );

    await addWaitFor(() => {
      return result.current.isSuccess;
    });

    const { result: removeResult, waitFor: removeWaitFor } = renderHook(
      () => {
        return useRemoveHero();
      },
      {
        wrapper: createQueryProviderWrapper(),
      },
    );

    const response = result.current.data;
    expect(result.current.data?.data).toHaveLength(2);

    await act(async () => {
      if (response?.data[0]) await removeResult.current.mutate(response?.data[0].id);
    });

    await removeWaitFor(() => {
      return removeResult.current.isSuccess;
    });

    const newResponse = removeResult.current.isError;
    expect(newResponse).toBeFalsy();
  });
});
