import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import FormSubmission from '../components/FormSubmission';
import { Card, CardContent } from '../components/ui/card';
import heroesQueryOptions from '../features/heroes/serverState/heroesQueryOptions';
import useAddHero from '../features/heroes/serverState/useAddHero';
import useRemoveHero from '../features/heroes/serverState/useRemoveHero';
import { keys } from '../features/keyNames';
import type { HeroModel } from '../features/heroes/hero';

const HeroesPage = () => {
  const queryClient = useQueryClient();

  // status does not have pending. means no more conditional 'if (pending)'
  const { data: response, status } = useSuspenseQuery(heroesQueryOptions());

  const { mutate: removeHero } = useRemoveHero();
  const { mutate: addHero } = useAddHero();
  /* local state*/
  const [tracker, setTracker] = useState('0');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: HeroModel[] }>([keys.heroes], prevData => {
      return {
        data: prevData?.data?.filter(h => {
          return h.id !== id;
        }) as HeroModel[],
      };
    });
  };

  if (status === 'error') return <p>Error 😟</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className={'mb-10'}>
          <h1 data-testid="title-page" className="text-3xl font-bold tracking-tight">
            Heroes Page
          </h1>
        </div>
      </div>

      <div className="mb-8">
        <FormSubmission handleMutate={addHero} />
      </div>

      <div className="mb-6">
        <div className={'mb-2 flex justify-end'}>
          <div className="text-sm text-muted-foreground">local-state updates, non-async actions, async actions</div>
        </div>
      </div>

      <div className="grid gap-4">
        {response?.data?.map(h => {
          return (
            <Card key={h.id} data-testid="hero-card">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold leading-none tracking-tight">
                    {`${h.firstName} ${h.lastName} is ${h.knownAs}`}
                    {tracker === h.id && <span className="text-primary"> - marked</span>}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    onClick={() => {
                      setTracker(h.id);
                    }}
                    size="sm"
                  >
                    Mark
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSoftDelete(h.id);
                    }}
                    size="sm"
                  >
                    Remove
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      removeHero(h.id);
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
            <h3 className="text-lg font-semibold">No heroes found</h3>
            <p className="text-muted-foreground">Get started by creating your first hero.</p>
          </div>
          <Button
            variant="default"
            onClick={() => {
              return queryClient.invalidateQueries({ queryKey: [keys.heroes] });
            }}
          >
            Re-Fetch
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeroesPage;
