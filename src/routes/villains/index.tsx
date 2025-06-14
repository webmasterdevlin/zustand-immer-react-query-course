import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import FormSubmission from '../../components/FormSubmission';
import TitleBar from '../../components/TitleBar';
import UpdateUiLabel from '../../components/UpdateUiLabel';
import { keys } from '../../features/keyNames';
import useAddVillain from '../../features/villains/hooks/useAddVillain';
import useRemoveVillain from '../../features/villains/hooks/useRemoveVillain';
import villainsQueryOptions from '../../features/villains/hooks/villainsQueryOptions.ts';
import type { VillainModel } from '../../features/villains/villain';

export const Route = createFileRoute('/villains/')({
  component: Villains,

  errorComponent: () => {
    return <p>Error 😟</p>;
  },
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(villainsQueryOptions());
  },
});

function Villains() {
  const queryClient = useQueryClient();
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
                variant={'primary'}
                onClick={() => {
                  setCounter(v.id);
                }}
              >
                Mark
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  handleSoftDelete(v.id);
                }}
              >
                Remove
              </Button>
              <Button
                variant="secondary"
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
          variant="primary"
          onClick={() => {
            return queryClient.invalidateQueries({ queryKey: [keys.villains] });
          }}
        >
          Re-Fetch
        </Button>
      )}
    </div>
  );
}

export default Villains;
