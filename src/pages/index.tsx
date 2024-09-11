import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className={'flex h-screen flex-col items-center justify-center gap-5'}>
      <h2 data-testid="welcome-message" className={'dark:text-white'}>
        Welcome to Zustand, Immer, and React Query Course 🧑‍🏫 💻
      </h2>
      <Link
        className="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        to={'/sign-in'}
      >
        login page
      </Link>
    </div>
  );
};

export default Index;
