import { renderHook } from '@testing-library/react-hooks';
import useFetchVillains from '../hooks/useFetchVillains';
import { wrapper } from '../../../test-utils/testing-library-utils';
import { describe, it, test, expect } from 'vitest';

describe.skip('Villains hooks', () => {
  it('should fire useFetchVillains', async () => {
    const { result, waitFor } = renderHook<any, any>(() => useFetchVillains(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data.data).toHaveLength(2);
  });
});
