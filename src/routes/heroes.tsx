import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Trash2, UserCheck, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';
import Dedupe from '../components/Dedupe';
import FormSubmission from '../components/FormSubmission';
import TitleBar from '../components/TitleBar';
import UpdateUiLabel from '../components/UpdateUiLabel';
import useAddHero from '../features/heroes/hooks/useAddHero';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useRemoveHero from '../features/heroes/hooks/useRemoveHero';
import { keys } from '../features/keyNames';
import type { HeroModel } from '../features/heroes/hero';

export const Route = createFileRoute('/heroes')({
  component: Heroes,
  loader: () => {
    return {};
  },
});

function Heroes() {
  const queryClient = useQueryClient();
  const { data: response, status } = useFetchHeroes();
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

  useEffect(() => {
    console.log('Heroes component rendered');
    // for deduping demo
    fetch('https://jsonplaceholder.typicode.com/todos/1');
  }, []);

  if (status === 'error') return <p>Error 😟</p>;

  return (
    <div className="container mx-auto py-6 space-y-8">
      <TitleBar title={'Heroes Page'} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Hero</CardTitle>
            <CardDescription>Create a new hero character</CardDescription>
          </CardHeader>
          <CardContent>
            <FormSubmission handleMutate={addHero} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Dedupe />
          <UpdateUiLabel />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Heroes List</h2>

        {status === 'pending' ? (
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-16" />
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {response?.data?.map(h => (
              <Card key={h.id} data-testid="hero-card" className="transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                          {`${h.firstName} ${h.lastName}`}
                        </h3>
                        {tracker === h.id && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <UserCheck className="h-3 w-3" />
                            Marked
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">Known as {h.knownAs}</p>
                      {h.house && <Badge variant="outline">{h.house}</Badge>}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTracker(h.id)}
                        className="flex items-center gap-2"
                      >
                        <UserCheck className="h-4 w-4" />
                        Mark
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSoftDelete(h.id)}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeHero(h.id)}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {response?.data?.length === 0 && status !== 'pending' && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">No heroes found</p>
              <Button
                variant="default"
                onClick={() => queryClient.invalidateQueries({ queryKey: [keys.heroes] })}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Re-Fetch
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Heroes;
