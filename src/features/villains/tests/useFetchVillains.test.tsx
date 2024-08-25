import { renderHook } from '@testing-library/react-hooks';

import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import villainsQueryOptions from '../hooks/villainsQueryOptions.ts';

describe('Villains hooks', () => {
  it('should fire villainsQueryOptions', async () => {
    const { result } = renderHook(
      () => {
        return villainsQueryOptions();
      },
      {
        wrapper: createQueryProviderWrapper(),
      },
    );

    const response = result.current;
    expect(response.meta).toHaveLength(2);
  });
});
