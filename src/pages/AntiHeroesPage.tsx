import { Button, Flex, Title } from '@mantine/core';
import { useState } from 'react';

import { queryClient } from '../App';
import useFetchAntiHeroes from '../features/anti-heroes/hooks/useFetchAntiHeroes';
import useRemoveAntiHero from '../features/anti-heroes/hooks/useRemoveAntiHero';
import useAddAntiHero from '../features/anti-heroes/hooks/useAddAntiHero';
import { AntiHeroModel } from '../features/anti-heroes/antiHero';
import UpdateUiLabel from '../components/UpdateUiLabel';
import TitleBar from '../components/TitleBar';
import FormSubmission from '../components/FormSubmission';

const AntiHeroesPage = () => {
  const { data: response, status } = useFetchAntiHeroes();
  const { mutate: removeAntiHero } = useRemoveAntiHero();
  const { mutate: addAntiHero } = useAddAntiHero();
  /*local state*/
  const [counter, setCounter] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: AntiHeroModel[] }>(
      'antiHeroes',
      input => ({
        data: input?.data?.filter(h => h.id !== id) as any,
      }),
    );
  };

  if (status === 'error') return <p>Error :(</p>;

  return (
    <div>
      <TitleBar title={'Anti-Heroes Page'} />
      <FormSubmission handleMutate={addAntiHero} />
      <UpdateUiLabel />
      {status === 'loading' ? (
        <Title order={2}>Loading.. Please wait..</Title>
      ) : (
        response?.data?.map((ah, i) => (
          <Flex
            key={ah.id}
            display={'flex'}
            justify={'space-between'}
            align="center"
          >
            <Title>
              <span>{`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}</span>
              {counter === ah.id && <span> - marked</span>}
            </Title>
            <div>
              <Button
                mx={'0.5rem'}
                color="indigo"
                variant="subtle"
                onClick={() => setCounter(ah.id)}
              >
                Mark
              </Button>
              <Button
                mx={'0.5rem'}
                color="pink"
                variant="filled"
                onClick={() => handleSoftDelete(ah.id)}
              >
                Remove
              </Button>
              <Button
                mx={'0.5rem'}
                color="pink"
                variant="outline"
                onClick={() => removeAntiHero(ah.id)}
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
          onClick={() => queryClient.invalidateQueries('antiHeroes')}
        >
          Re-Fetch
        </Button>
      )}
    </div>
  );
};

export default AntiHeroesPage;
