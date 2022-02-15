import { renderHook } from '@testing-library/react-hooks';
import useFetchVillains from '../hooks/useFetchVillains';
import { wrapper } from '/src/test-utils/testing-library-utils';

describe('Villains hooks', () => {
  it('should fire useFetchVillains', async () => {
    const { result, waitFor } = renderHook(() => useFetchVillains(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data.data).toHaveLength(2);
  });
});
