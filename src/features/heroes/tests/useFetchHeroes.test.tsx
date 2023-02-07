import { renderHook } from '@testing-library/react-hooks';

import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import useFetchHeroes from '../hooks/useFetchHeroes';

describe('Heroes hooks', () => {
  it('should fire useFetchHeroes', async () => {
    const { result, waitFor } = renderHook(
      () => {
        return useFetchHeroes();
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
