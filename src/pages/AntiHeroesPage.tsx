import { useState } from 'react';

import { queryClient } from '../App';
import FormSubmission from '../components/FormSubmission';
import TitleBar from '../components/TitleBar';
import UpdateUiLabel from '../components/UpdateUiLabel';
import useAddAntiHero from '../features/anti-heroes/hooks/useAddAntiHero';
import useFetchAntiHeroes from '../features/anti-heroes/hooks/useFetchAntiHeroes';
import useRemoveAntiHero from '../features/anti-heroes/hooks/useRemoveAntiHero';
import type { AntiHeroModel } from '../features/anti-heroes/antiHero';

const AntiHeroesPage = () => {
  const { data: response, status } = useFetchAntiHeroes();
  const { mutate: removeAntiHero } = useRemoveAntiHero();
  const { mutate: addAntiHero } = useAddAntiHero();
  /*local state*/
  const [counter, setCounter] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: AntiHeroModel[] }>('antiHeroes', input => {
      return {
        data: input?.data?.filter(h => {
          return h.id !== id;
        }) as any,
      };
    });
  };

  if (status === 'error') return <p>Error :(</p>;

  return (
    <div>
      <TitleBar title={'Anti-Heroes Page'} />
      <FormSubmission handleMutate={addAntiHero} />
      <UpdateUiLabel />
      {status === 'loading' ? (
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
                <button
                  className={'btn btn--primary mx-0.5rem'}
                  onClick={() => {
                    return setCounter(ah.id);
                  }}
                >
                  Mark
                </button>
                <button
                  className={'btn mx-0.5rem'}
                  onClick={() => {
                    return handleSoftDelete(ah.id);
                  }}
                >
                  Remove
                </button>
                <button
                  className={'btn btn--secondary mx-0.5rem'}
                  onClick={() => {
                    return removeAntiHero(ah.id);
                  }}
                >
                  DELETE in DB
                </button>
              </div>
            </div>
          );
        })
      )}

      {response?.data?.length === 0 && status !== 'loading' && (
        <button
          className={'btn btn--primary mx-0.5rem'}
          onClick={() => {
            return queryClient.invalidateQueries('antiHeroes');
          }}
        >
          Re-Fetch
        </button>
      )}
    </div>
  );
};

export default AntiHeroesPage;
