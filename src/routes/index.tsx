import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className={'flex h-screen flex-col items-center justify-center'}>
      <h2 data-testid="welcome-message" className={'dark:text-white'}>
        Welcome to Zustand, Immer, and React Query Course 🧑‍🏫 💻
      </h2>
    </div>
  );
}
