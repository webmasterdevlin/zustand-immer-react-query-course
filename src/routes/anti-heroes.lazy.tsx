import { useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import FormSubmission from '../components/FormSubmission';
import TitleBar from '../components/TitleBar';
import UpdateUiLabel from '../components/UpdateUiLabel';
import useAddAntiHero from '../features/anti-heroes/hooks/useAddAntiHero';
import useFetchAntiHeroes from '../features/anti-heroes/hooks/useFetchAntiHeroes';
import useRemoveAntiHero from '../features/anti-heroes/hooks/useRemoveAntiHero';
import { keys } from '../features/keyNames';
import type { AntiHeroModel } from '../features/anti-heroes/antiHero';

export const Route = createLazyFileRoute('/anti-heroes')({
  component: AntiHeroes,
  errorComponent: () => {
    return <h1>Error loading Anti-Heroes 😟</h1>;
  },
  notFoundComponent: () => {
    return <h1>Anti-Heroes not found</h1>;
  },
  pendingComponent: () => {
    return <h1>Loading Anti-Heroes...</h1>;
  },
  // no loader here because this is a lazy route
});

function AntiHeroes() {
  const queryClient = useQueryClient();
  const { data: response, status } = useFetchAntiHeroes();
  const { mutate: removeAntiHero } = useRemoveAntiHero();
  const { mutate: addAntiHero } = useAddAntiHero();
  /* local state*/
  const [counter, setCounter] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: AntiHeroModel[] }>([keys.antiHeroes], input => {
      return {
        data: input?.data?.filter(h => {
          return h.id !== id;
        }) as AntiHeroModel[],
      };
    });
  };

  if (status === 'error') return <p>Error 😟</p>;

  return (
    <div>
      <TitleBar title={'Anti-Heroes Page'} />
      <FormSubmission handleMutate={addAntiHero} />
      <UpdateUiLabel />
      {status === 'pending' ? (
        <h2>Loading.. Please wait..</h2>
      ) : (
        response?.data?.map(ah => {
          return (
            <div key={ah.id} className={'flex items-center justify-between'}>
              <h1>
                <span>{`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}</span>
                {counter === ah.id && <span> - marked</span>}
              </h1>
              <div>
                <Button
                  variant={'primary'}
                  onClick={() => {
                    setCounter(ah.id);
                  }}
                >
                  Mark
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSoftDelete(ah.id);
                  }}
                >
                  Remove
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    removeAntiHero(ah.id);
                  }}
                >
                  DELETE in DB
                </Button>
              </div>
            </div>
          );
        })
      )}

      {response?.data?.length === 0 && status !== 'pending' && (
        <Button
          variant="primary"
          onClick={() => {
            return queryClient.invalidateQueries({ queryKey: [keys.antiHeroes] });
          }}
        >
          Re-Fetch
        </Button>
      )}
    </div>
  );
}

export default AntiHeroes;
