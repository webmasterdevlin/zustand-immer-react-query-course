import { act, renderHook } from '@testing-library/react-hooks';

import useFetchHeroes from '../hooks/useFetchHeroes';
import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';

describe('Heroes hooks', () => {
  it('should fire useFetchHeroes', async () => {
    const { result, waitFor } = renderHook(() => useFetchHeroes(), {
      wrapper: createQueryProviderWrapper(),
    });
    await waitFor(() => result.current.isSuccess);

    const response = result.current.data;
    expect(response?.data).toHaveLength(2);
  });
});
