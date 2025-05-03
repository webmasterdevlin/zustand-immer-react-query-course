import { type QueryClient, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Button from '../components/Button';
import FormSubmission from '../components/FormSubmission';
import TitleBar from '../components/TitleBar';
import UpdateUiLabel from '../components/UpdateUiLabel';
import antiHeroesQueryOptions from '../features/anti-heroes/serverState/antiHeroesQueryOptions';
import useAddAntiHero from '../features/anti-heroes/serverState/useAddAntiHero';
import useRemoveAntiHero from '../features/anti-heroes/serverState/useRemoveAntiHero';
import { keys } from '../features/keyNames';
import type { AntiHeroModel } from '../features/anti-heroes/antiHero';

export function loader(queryClient: QueryClient) {
  return async function () {
    await queryClient.ensureQueryData(antiHeroesQueryOptions());
    return null;
  };
}

const AntiHeroesPage = () => {
  const queryClient = useQueryClient();

  // status does not have pending. means no more conditional 'if (pending)'
  const { data: response, status } = useSuspenseQuery(antiHeroesQueryOptions());
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
      {response?.data?.map(ah => {
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
      })}

      {response?.data?.length === 0 && (
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
};

export default AntiHeroesPage;
