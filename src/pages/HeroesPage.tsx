import { Button, Flex, Title } from '@mantine/core';
import { useState } from 'react';

import { queryClient } from '../App';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useRemoveHero from '../features/heroes/hooks/useRemoveHero';
import useAddHero from '../features/heroes/hooks/useAddHero';
import { HeroModel } from '../features/heroes/hero';
import UpdateUiLabel from '../components/UpdateUiLabel';
import TitleBar from '../components/TitleBar';
import FormSubmission from '../components/FormSubmission';

const HeroesPage = () => {
  const { data: response, status } = useFetchHeroes();
  const { mutate: removeHero } = useRemoveHero();
  const { mutate: addHero } = useAddHero();
  /*local state*/
  const [counter, setCounter] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: HeroModel[] }>('heroes', input => ({
      data: input?.data?.filter(h => h.id !== id) as any,
    }));
  };

  if (status === 'error') return <p>Error :(</p>;

  return (
    <div>
      <TitleBar title={'Super Heroes Page'} />
      <FormSubmission handleMutate={addHero} />
      <UpdateUiLabel />
      {status === 'loading' ? (
        <Title order={2}>Loading.. Please wait..</Title>
      ) : (
        response?.data?.map((h, i) => (
          <Flex
            key={h.id}
            display={'flex'}
            justify={'space-between'}
            align="center"
          >
            <Title>
              <span
                role={'row'}
                data-testid={'card'}
              >{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
              {counter === h.id && <span> - marked</span>}
            </Title>
            <div>
              <Button
                mx={'0.5rem'}
                color="indigo"
                variant="subtle"
                onClick={() => setCounter(h.id)}
              >
                Mark
              </Button>
              <Button
                mx={'0.5rem'}
                color="pink"
                variant="filled"
                onClick={() => handleSoftDelete(h.id)}
              >
                Remove
              </Button>
              <Button
                mx={'0.5rem'}
                color="pink"
                variant="outline"
                onClick={() => removeHero(h.id)}
              >
                DELETE in DB
              </Button>
            </div>
          </Flex>
        ))
      )}

      {response?.data?.length === 0 && status !== 'loading' && (
        <Button
          color="violet"
          variant="filled"
          onClick={() => queryClient.invalidateQueries('heroes')}
        >
          Re-Fetch
        </Button>
      )}
    </div>
  );
};

export default HeroesPage;
