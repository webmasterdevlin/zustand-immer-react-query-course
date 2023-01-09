import React from 'react';

const HomePage = () => {
  return (
    <div className={'flex flex-col justify-center items-center h-screen'}>
      <h2 data-testid={'welcome'}>
        Welcome to Zustand, Immer, and React Query Course 🧑‍🏫 💻
      </h2>
    </div>
  );
};

export default HomePage;
