import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Button from '../components/Button';
import FormSubmission from '../components/FormSubmission';
import TitleBar from '../components/TitleBar';
import UpdateUiLabel from '../components/UpdateUiLabel';
import { keys } from '../features/keyNames';
import useAddVillain from '../features/villains/serverState/useAddVillain';
import useRemoveVillain from '../features/villains/serverState/useRemoveVillain';
import villainsQueryOptions from '../features/villains/serverState/villainsQueryOptions';
import type { VillainModel } from '../features/villains/villain';
import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunction } from 'react-router-dom';

export async function loader(queryClient: QueryClient) {
  return queryClient?.ensureQueryData(villainsQueryOptions());
}

const VillainsPage = () => {
  const queryClient = useQueryClient();

  // status does not have pending. means no more conditional 'if (pending)'
  const { data: response, status } = useSuspenseQuery(villainsQueryOptions());
  const { mutate: removeVillain } = useRemoveVillain();
  const { mutate: addVillain } = useAddVillain();
  /* local state*/
  const [counter, setCounter] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: VillainModel[] }>([keys.villains], input => {
      return {
        data: input?.data?.filter(h => {
          return h.id !== id;
        }) as VillainModel[],
      };
    });
  };

  if (status === 'error') return <p>Error 😟</p>;

  return (
    <div>
      <TitleBar title={'Villains Page'} />
      <FormSubmission handleMutate={addVillain} />
      <UpdateUiLabel />
      {response?.data?.map(v => {
        return (
          <div key={v.id} className={'flex items-center justify-between'}>
            <h1>
              <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
              {counter === v.id && <span> - marked</span>}
            </h1>
            <div>
              <Button
                color={'primary'}
                onClick={() => {
                  setCounter(v.id);
                }}
              >
                Mark
              </Button>
              <Button
                onClick={() => {
                  handleSoftDelete(v.id);
                }}
              >
                Remove
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  removeVillain(v.id);
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
            return queryClient.invalidateQueries({ queryKey: [keys.villains] });
          }}
        >
          Re-Fetch
        </Button>
      )}
    </div>
  );
};

export default VillainsPage;
