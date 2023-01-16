import { act, renderHook } from '@testing-library/react-hooks';

import useFetchAntiHeroes from '../hooks/useFetchAntiHeroes';
import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';

describe('Villains hooks', () => {
  it('should fire useFetchAntiHeroes', async () => {
    const { result, waitFor } = renderHook(() => useFetchAntiHeroes(), {
      wrapper: createQueryProviderWrapper(),
    });
    await waitFor(() => result.current.isSuccess);

    const { data } = result.current.data;
    expect(data).toHaveLength(2);
  });
});
