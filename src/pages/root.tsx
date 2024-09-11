import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Outlet } from 'react-router';
import FallbackRenderer from '../components/FallbackRenderer';
import NavigationBar from '../components/NavigationBar';

export default function Root() {
  return (
    <>
      {/* create navbar here */}
      <NavigationBar />
      <div className={'bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:text-white'}>
        <ErrorBoundary fallbackRender={FallbackRenderer}>
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
}
