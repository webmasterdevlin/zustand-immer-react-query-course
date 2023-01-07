import { Button, Flex, Title } from '@mantine/core';
import { useState } from 'react';

import { queryClient } from '../App';
import useFetchVillains from '../features/villains/hooks/useFetchVillains';
import useRemoveVillain from '../features/villains/hooks/useRemoveVillain';
import useAddVillain from '../features/villains/hooks/useAddVillain';
import { VillainModel } from '../features/villains/villain';
import UpdateUiLabel from '../components/UpdateUiLabel';
import TitleBar from '../components/TitleBar';
import FormSubmission from '../components/FormSubmission';

const VillainsPage = () => {
  const { data: response, status } = useFetchVillains();
  const { mutate: removeVillain } = useRemoveVillain();
  const { mutate: addVillain } = useAddVillain();
  /*local state*/
  const [counter, setCounter] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: VillainModel[] }>('villains', input => ({
      data: input?.data?.filter(h => h.id !== id) as any,
    }));
  };

  if (status === 'error') return <p>Error :(</p>;

  return (
    <div>
      <TitleBar title={'Villains Page'} />
      <FormSubmission handleMutate={addVillain} />
      <UpdateUiLabel />
      {status === 'loading' ? (
        <Title order={2}>Loading.. Please wait..</Title>
      ) : (
        response?.data?.map((v, i) => (
          <Flex
            key={v.id}
            display={'flex'}
            justify={'space-between'}
            align="center"
          >
            <Title>
              <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
              {counter === v.id && <span> - marked</span>}
            </Title>
            <div>
              <Button
                mx={'0.5rem'}
                color="indigo"
                variant="subtle"
                onClick={() => setCounter(v.id)}
              >
                Mark
              </Button>
              <Button
                mx={'0.5rem'}
                color="pink"
                variant="filled"
                onClick={() => handleSoftDelete(v.id)}
              >
                Remove
              </Button>
              <Button
                mx={'0.5rem'}
                color="pink"
                variant="outline"
                onClick={() => removeVillain(v.id)}
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
          onClick={() => queryClient.invalidateQueries('villains')}
        >
          Re-Fetch
        </Button>
      )}
    </div>
  );
};

export default VillainsPage;
