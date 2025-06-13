import { type QueryClient, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import FormSubmission from '../components/FormSubmission';
import { Card, CardContent } from '../components/ui/card';
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
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className={'mb-10'}>
          <h1 data-testid="title-page" className="text-3xl font-bold tracking-tight">
            Anti-Heroes Page
          </h1>
        </div>
      </div>

      <div className="mb-8">
        <FormSubmission handleMutate={addAntiHero} />
      </div>

      <div className="mb-6">
        <div className={'mb-2 flex justify-end'}>
          <div className="text-sm text-muted-foreground">local-state updates, non-async actions, async actions</div>
        </div>
      </div>

      <div className="grid gap-4">
        {response?.data?.map(ah => {
          return (
            <Card key={ah.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold leading-none tracking-tight">
                    {`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}
                    {counter === ah.id && <span className="text-primary"> - marked</span>}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    onClick={() => {
                      setCounter(ah.id);
                    }}
                    size="sm"
                  >
                    Mark
                  </Button>
                  <Button
                    onClick={() => {
                      handleSoftDelete(ah.id);
                    }}
                    size="sm"
                  >
                    Remove
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      removeAntiHero(ah.id);
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
            <h3 className="text-lg font-semibold">No anti-heroes found</h3>
            <p className="text-muted-foreground">Get started by creating your first anti-hero.</p>
          </div>
          <Button
            variant="default"
            onClick={() => {
              return queryClient.invalidateQueries({ queryKey: [keys.antiHeroes] });
            }}
          >
            Re-Fetch
          </Button>
        </div>
      )}
    </div>
  );
};

export default AntiHeroesPage;
