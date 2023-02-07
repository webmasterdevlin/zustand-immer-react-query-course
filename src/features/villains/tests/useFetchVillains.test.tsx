import { act, renderHook } from '@testing-library/react-hooks';

import useFetchVillains from '../hooks/useFetchVillains';
import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';

describe('Villains hooks', () => {
  it('should fire useFetchVillains', async () => {
    const { result, waitFor } = renderHook(() => useFetchVillains(), {
      wrapper: createQueryProviderWrapper(),
    });
    await waitFor(() => result.current.isSuccess);

    const response = result.current.data;
    expect(response?.data).toHaveLength(2);
  });
});
