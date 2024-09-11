import { act, renderHook } from '@testing-library/react-hooks';
import { createQueryProviderWrapper } from '../../../test-utils/create-query-provider-wrapper';
import useAddHero from '../serverState/useAddHero';
import type { HeroModel } from '../hero';

describe.skip('useAddHero', () => {
  it('should add a hero to the list', async () => {
    const hero: HeroModel = {
      firstName: 'Bruce',
      house: 'DC',
      id: '3242',
      knownAs: 'Batman',
      lastName: 'Wayne',
    };
    const { result, waitFor } = renderHook(
      () => {
        return useAddHero();
      },
      {
        wrapper: createQueryProviderWrapper(),
      },
    );

    await act(async () => {
      await result.current.mutateAsync(hero);
    });

    await waitFor(() => {
      return result.current.isSuccess;
    });
    const response = result.current.data;
    expect(response?.data).toEqual(hero);
  });
});
