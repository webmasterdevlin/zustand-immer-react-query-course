import React from 'react';

const Index = () => {
  return (
    <div className={'flex h-screen flex-col items-center justify-center'}>
      <h2 data-testid="welcome-message" className={'dark:text-white'}>
        Welcome to Zustand, Immer, and React Query Course 🧑‍🏫 💻
      </h2>
    </div>
  );
};

export default Index;
