import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import heroesQueryOptions from '../serverState/heroesQueryOptions';
import useRemoveHero from '../serverState/useRemoveHero';

describe('Heroes serverState', () => {
  it('should fire heroesQueryOptions', async () => {
    const { result, waitFor: addWaitFor } = renderHook(
      () => {
        return heroesQueryOptions();
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
