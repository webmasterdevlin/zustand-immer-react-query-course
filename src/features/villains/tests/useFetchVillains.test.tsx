import { renderHook } from '@testing-library/react-hooks';

import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import useFetchVillains from '../hooks/useFetchVillains';

describe('Villains hooks', () => {
  it('should fire useFetchVillains', async () => {
    const { result, waitFor } = renderHook(
      () => {
        return useFetchVillains();
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
