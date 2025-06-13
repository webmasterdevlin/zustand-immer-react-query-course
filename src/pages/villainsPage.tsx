import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import FormSubmission from '../components/FormSubmission';
import { Card, CardContent } from '../components/ui/card';
import { keys } from '../features/keyNames';
import useAddVillain from '../features/villains/serverState/useAddVillain';
import useRemoveVillain from '../features/villains/serverState/useRemoveVillain';
import villainsQueryOptions from '../features/villains/serverState/villainsQueryOptions';
import type { VillainModel } from '../features/villains/villain';

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
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className={'mb-10'}>
          <h1 data-testid="title-page" className="text-3xl font-bold tracking-tight">
            Villains Page
          </h1>
        </div>
      </div>

      <div className="mb-8">
        <FormSubmission handleMutate={addVillain} />
      </div>

      <div className="mb-6">
        <div className={'mb-2 flex justify-end'}>
          <div className="text-sm text-muted-foreground">local-state updates, non-async actions, async actions</div>
        </div>
      </div>

      <div className="grid gap-4">
        {response?.data?.map(v => {
          return (
            <Card key={v.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold leading-none tracking-tight">
                    {`${v.firstName} ${v.lastName} is ${v.knownAs}`}
                    {counter === v.id && <span className="text-primary"> - marked</span>}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    onClick={() => {
                      setCounter(v.id);
                    }}
                    size="sm"
                  >
                    Mark
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSoftDelete(v.id);
                    }}
                    size="sm"
                  >
                    Remove
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      removeVillain(v.id);
                    }}
                    size="sm"
                  >
                    DELETE in DB
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {response?.data?.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-4 py-16">
          <div className="text-center">
            <h3 className="text-lg font-semibold">No villains found</h3>
            <p className="text-muted-foreground">Get started by creating your first villain.</p>
          </div>
          <Button
            variant="default"
            onClick={() => {
              return queryClient.invalidateQueries({ queryKey: [keys.villains] });
            }}
          >
            Re-Fetch
          </Button>
        </div>
      )}
    </div>
  );
};

export default VillainsPage;
