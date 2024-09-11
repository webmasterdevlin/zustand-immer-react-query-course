import { renderHook } from '@testing-library/react-hooks';

import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import antiHeroesQueryOptions from '../hooks/antiHeroesQueryOptions';

describe('Anti Heroes hooks', () => {
  it('should fire antiHeroesQueryOptions', async () => {
    const { result, waitFor } = renderHook(
      () => {
        return antiHeroesQueryOptions();
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
