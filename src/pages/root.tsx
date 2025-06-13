import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';
import FallbackRenderer from '../components/FallbackRenderer';
import NavigationBar from '../components/NavigationBar';

export default function Root() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <NavigationBar />
        </div>
      </header>
      <main>
        <ErrorBoundary fallbackRender={FallbackRenderer}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
