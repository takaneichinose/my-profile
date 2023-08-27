import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { Error } from '@/Layouts/Error';
import { Loading } from '@/Layouts/Loading';
import { AssetsProvider } from '@/Providers/AssetsProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * Provider of the application. All providers goes here.
 * @param {React.ReactNode} children Child nodes
 * @returns {React.ReactElement}
 */
export function AppProvider({ children }: AppProviderProps): React.ReactElement {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<Error />}>
        <HelmetProvider>
          <AssetsProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AssetsProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
