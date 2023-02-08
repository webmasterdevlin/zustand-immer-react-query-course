import React from 'react';

const HomePage = () => {
  console.log('HomePage');

  return (
    <div className={'flex h-screen flex-col items-center justify-center'}>
      <h2 className={'dark:text-white'}>Welcome to Zustand, Immer, and React Query Course 🧑‍🏫 💻</h2>
    </div>
  );
};

export default HomePage;
