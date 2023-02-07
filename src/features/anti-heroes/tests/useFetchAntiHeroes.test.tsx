import { renderHook } from '@testing-library/react-hooks';

import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import useFetchAntiHeroes from '../hooks/useFetchAntiHeroes';

describe('Anti Heroes hooks', () => {
  it('should fire useFetchAntiHeroes', async () => {
    const { result, waitFor } = renderHook(
      () => {
        return useFetchAntiHeroes();
      },
      {
        wrapper: createQueryProviderWrapper(),
      },
    );
    await waitFor(() => {
      return result.current.isSuccess;
    });

    const response = result.current.data;
    expect(response?.data).toHaveLength(2);
  });
});
