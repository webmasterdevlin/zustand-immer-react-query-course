import { renderHook } from '@testing-library/react-hooks';

import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import heroesQueryOptions from '../serverState/heroesQueryOptions';

describe('Heroes serverState', () => {
  it('should fire heroesQueryOptions', async () => {
    const { result, waitFor } = renderHook(
      () => {
        return heroesQueryOptions();
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
