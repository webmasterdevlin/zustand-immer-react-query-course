import { useQueryClient } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import Button from '../components/Button';
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
                  color={'primary'}
                  onClick={() => {
                    setCounter(ah.id);
                  }}
                >
                  Mark
                </Button>
                <Button
                  onClick={() => {
                    handleSoftDelete(ah.id);
                  }}
                >
                  Remove
                </Button>
                <Button
                  color="secondary"
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
          color="primary"
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
