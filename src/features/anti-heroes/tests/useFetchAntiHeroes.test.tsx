import { renderHook } from '@testing-library/react-hooks';
import useFetchAntiHeroes from '../hooks/useFetchAntiHeroes';
import { wrapper } from '/src/test-utils/testing-library-utils';

describe('Anti Heroes hooks', () => {
  it('should fire useFetchAntiHeroes', async () => {
    const { result, waitFor } = renderHook(() => useFetchAntiHeroes(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data.data).toHaveLength(2);
  });
});
