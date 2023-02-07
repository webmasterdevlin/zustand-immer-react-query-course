import { act, renderHook } from '@testing-library/react-hooks';

import useFetchAntiHeroes from '../hooks/useFetchAntiHeroes';
import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';

describe('Anti Heroes hooks', () => {
  it('should fire useFetchAntiHeroes', async () => {
    const { result, waitFor } = renderHook(() => useFetchAntiHeroes(), {
      wrapper: createQueryProviderWrapper(),
    });
    await waitFor(() => result.current.isSuccess);

    const response = result.current.data;
    expect(response?.data).toHaveLength(2);
  });
});
