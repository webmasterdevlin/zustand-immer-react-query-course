import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Index = () => {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-muted-foreground">Zustand, Immer, and React Query Course 🧑‍🏫 💻</p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center space-y-4 p-6">
            <p className="text-center text-sm text-muted-foreground">Ready to explore the course content?</p>
            <Button asChild className="w-full">
              <Link to={'/sign-in'}>Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div data-testid="welcome-message" className="sr-only">
        Welcome to Zustand, Immer, and React Query Course 🧑‍🏫 💻
      </div>
    </div>
  );
};

export default Index;
