import { renderHook } from '@testing-library/react-hooks';
import useFetchAntiHeroes from '../hooks/useFetchAntiHeroes';
import { wrapper } from '../../../test-utils/testing-library-utils';
import { describe, it, test, expect } from 'vitest';

describe.skip('Anti Heroes hooks', () => {
  it('should fire useFetchAntiHeroes', async () => {
    const { result, waitFor } = renderHook<any, any>(
      () => useFetchAntiHeroes(),
      {
        wrapper,
      },
    );

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data.data).toHaveLength(2);
  });
});
