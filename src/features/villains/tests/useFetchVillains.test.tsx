import { renderHook } from '@testing-library/react-hooks';

import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import villainsQueryOptions from '../serverState/villainsQueryOptions';

describe('Villains serverState', () => {
  it('should fire villainsQueryOptions', async () => {
    const { result, waitFor } = renderHook(
      () => {
        return villainsQueryOptions();
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
