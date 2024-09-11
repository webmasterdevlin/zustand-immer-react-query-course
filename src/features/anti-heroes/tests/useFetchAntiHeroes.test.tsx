import { renderHook } from '@testing-library/react-hooks';

import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import antiHeroesQueryOptions from '../serverState/antiHeroesQueryOptions';

describe('Anti Heroes serverState', () => {
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
