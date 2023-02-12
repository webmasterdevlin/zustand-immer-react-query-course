import { useState } from 'react';
import { queryClient } from '../App';
import FormSubmission from '../components/FormSubmission';
import TitleBar from '../components/TitleBar';
import UpdateUiLabel from '../components/UpdateUiLabel';
import useAddHero from '../features/heroes/hooks/useAddHero';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useRemoveHero from '../features/heroes/hooks/useRemoveHero';
import type { HeroModel } from '../features/heroes/hero';

const HeroesPage = () => {
  const { data: response, status } = useFetchHeroes();
  const { mutate: removeHero } = useRemoveHero();
  const { mutate: addHero } = useAddHero();
  /* local state*/
  const [counter, setCounter] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: HeroModel[] }>('heroes', prevData => {
      return {
        data: prevData?.data?.filter(h => {
          return h.id !== id;
        }) as HeroModel[],
      };
    });
  };

  if (status === 'error') return <p>Error :(</p>;

  return (
    <div>
      <TitleBar title={'Heroes Page'} />
      <FormSubmission handleMutate={addHero} />
      <UpdateUiLabel />
      {status === 'loading' ? (
        <h2>Loading.. Please wait..</h2>
      ) : (
        response?.data?.map(h => {
          return (
            <div data-testid="hero-card" key={h.id} className={'flex items-center justify-between'}>
              <h1>
                <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                {counter === h.id && <span> - marked</span>}
              </h1>
              <div>
                <button
                  className={'btn btn--primary mx-0.5rem'}
                  onClick={() => {
                    setCounter(h.id);
                  }}
                >
                  Mark
                </button>
                <button
                  className={'btn mx-0.5rem'}
                  onClick={() => {
                    handleSoftDelete(h.id);
                  }}
                >
                  Remove
                </button>
                <button
                  className={'btn btn--secondary mx-0.5rem'}
                  onClick={() => {
                    removeHero(h.id);
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
            return queryClient.invalidateQueries('heroes');
          }}
        >
          Re-Fetch
        </button>
      )}
    </div>
  );
};

export default HeroesPage;
